import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Search, Loader2, FolderOpen, Upload, X, FileText, CloudUpload, Edit2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import LZString from 'lz-string'
import { dummyResumeData } from '../assets/assets'

// --- VISUAL COMPONENTS ---

const Card = ({ children, className, onClick }) => (
  <motion.div
    layout
    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className={`rounded-xl border border-white/5 transition-all cursor-pointer relative overflow-hidden group ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
)

const MiniResumePreview = ({ data }) => {
  const accent = data.accent_color || "#27272a";
  return (
    <div
      className="w-[300px] h-[400px] bg-white p-6 shadow-sm flex flex-col gap-3 origin-top-left"
      style={{ transform: 'scale(0.36)' }}
    >
      <div className="border-b-2 pb-3" style={{ borderColor: accent }}>
        <h1 className="text-2xl font-bold uppercase tracking-wider text-zinc-900 leading-none mb-1">
          {data.personal_info?.full_name || "YOUR NAME"}
        </h1>
        <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
          {data.personal_info?.profession || "PROFESSIONAL ROLE"}
        </p>
      </div>
      <div className="flex gap-2 text-[8px] text-zinc-400">
        <span>{data.personal_info?.location || "Location"}</span> • <span>{data.personal_info?.email || "email@example.com"}</span>
      </div>
      <div className="space-y-1 mt-1">
        <p className="text-[9px] text-zinc-600 leading-relaxed line-clamp-3">
          {data.professional_summary || "Professional summary goes here."}
        </p>
      </div>
      <div className="mt-2 space-y-2">
        {data.experience && data.experience.length > 0 ? (
          <>
            <div className="text-[10px] font-bold text-zinc-800 border-b border-zinc-100 uppercase">Experience</div>
            {data.experience.slice(0, 2).map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[9px] text-zinc-700">{exp.company}</span>
                </div>
                <div className="text-[8px] text-zinc-500">{exp.position}</div>
              </div>
            ))}
          </>
        ) : data.projects && data.projects.length > 0 ? (
          <>
            <div className="text-[10px] font-bold text-zinc-800 border-b border-zinc-100 uppercase">Projects</div>
            {data.projects.slice(0, 2).map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[9px] text-zinc-700">{proj.name}</span>
                </div>
                <div className="text-[8px] text-zinc-500">{proj.type}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-[10px] text-zinc-400 italic pt-2">No experience or projects added yet.</div>
        )}
      </div>
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1">
          {data.skills?.slice(0, 6).map((skill, i) => (
            <span key={i} className="bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded text-[8px] font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [editResumeId, setEditResumeId] = useState(null) // ID of resume being edited
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  // --- ANIMATION VARIANTS ---
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  // --- LOAD DATA (dummy + localStorage) ---
  const loadAllResumes = async () => {
    setTimeout(() => {
      // 1) Base set from bundled dummy data
      const base = [...dummyResumeData]

      // 2) Read any locally saved resumes: keys like "resume_<id>"
      let localResumes = []
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localResumes = Object.keys(localStorage)
            .filter((key) => key.startsWith('resume_'))
            .map((key) => {
              const raw = localStorage.getItem(key)
              if (!raw) return null
              try {
                let data;
                // Attempt 1: Decompress (Base64 - New Standard)
                let decompressed = LZString.decompress(raw);
                if (!decompressed) {
                  // Attempt 2: DecompressFromUTF16 (Previous attempt)
                  decompressed = LZString.decompressFromUTF16(raw);
                }

                if (decompressed) {
                  // console.log("[Dashboard] Decompressed success for", key);
                  data = JSON.parse(decompressed);
                } else {
                  // Attempt 3: Raw JSON (Legacy)
                  // console.log("[Dashboard] Decompression null, trying raw JSON for", key);
                  data = JSON.parse(raw);
                }

                const idFromKey = key.replace('resume_', '')
                return {
                  _id: data._id || idFromKey,
                  title: data.title || data.personal_info?.full_name || 'Untitled Resume',
                  updatedAt: data.updatedAt || new Date().toISOString(),
                  ...data,
                }
              } catch (err) {
                console.error("[Dashboard] Failed to parse/decompress resume:", key, err);
                return null
              }
            })
            .filter(Boolean)
        }
      } catch (err) {
        // Ignore localStorage access issues
        console.error("[Dashboard] LocalStorage Access Error", err);
        localResumes = []
      }

      // 3) Merge, preferring local versions when IDs collide
      const byId = new Map()
        ;[...base, ...localResumes].forEach((res) => {
          if (!res || !res._id) return
          byId.set(res._id, res)
        })

      const merged = Array.from(byId.values())

      const sorted = merged.sort(
        (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
      )

      setAllResumes(sorted)
      setIsLoading(false)
    }, 800)
  }

  useEffect(() => { loadAllResumes() }, [])

  // --- HANDLERS ---

  const handleCreateClick = () => {
    setTitle('')
    setEditResumeId(null) // Ensure we are in Create mode
    setShowCreateResume(true)
  }

  // --- NEW: Edit Handler ---
  const handleEditClick = (e, resume) => {
    e.stopPropagation() // Prevent opening the builder
    setTitle(resume.title)
    setEditResumeId(resume._id) // Set Edit mode
    setShowCreateResume(true) // Open the same modal
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setShowCreateResume(false)

    if (editResumeId) {
      // --- UPDATE EXISTING ---
      const toastId = toast.loading("Updating project...")
      setTimeout(() => {
        // Optimistic update
        setAllResumes(prev => prev.map(r => r._id === editResumeId ? { ...r, title } : r))
        toast.success("Project renamed", { id: toastId })
        setEditResumeId(null)
      }, 500)
    } else {
      // --- CREATE NEW ---
      const toastId = toast.loading("Initializing new profile...")
      const newId = `local-${Date.now()}`
      setTimeout(() => {
        toast.success("Workspace ready", { id: toastId })
        navigate(`/app/builder/${newId}`, { state: { title } })
      }, 1000)
    }
  }

  const handleImportClick = () => {
    setTitle('')
    setSelectedFile(null)
    setShowUploadResume(true)
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    setTitle(file.name.replace(/\.[^/.]+$/, ""))
  }

  const handleImportSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile || !title.trim()) return
    const toastId = toast.loading("Parsing document...")
    setShowUploadResume(false)
    const newId = `imported-${Date.now()}`
    setTimeout(() => {
      toast.success("Import successful", { id: toastId })
      navigate(`/app/builder/${newId}`, { state: { title } })
    }, 1500)
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!window.confirm("Permanent deletion? This cannot be undone.")) return
    setAllResumes(prev => prev.filter(r => r._id !== id))
    toast.success("Resume purged")
  }

  const filteredResumes = allResumes.filter(r =>
    r.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-12 relative">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/5">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">User Workspace</p>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Active Projects</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto font-sans">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="FILTER BY TITLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/5 rounded-md pl-10 pr-4 py-2 text-[10px] font-bold tracking-widest text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-all uppercase"
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleImportClick} className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white px-4 py-2 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all shadow-sm active:scale-95 whitespace-nowrap">
              <Upload className="w-3.5 h-3.5" /> Import
            </button>
            <button onClick={handleCreateClick} className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95 whitespace-nowrap">
              <Plus className="w-3.5 h-3.5" /> New Profile
            </button>
          </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
          <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">Syncing Cloud Workspace...</p>
        </div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          <motion.div variants={item}>
            <Card onClick={handleCreateClick} className="h-[280px] flex flex-col items-center justify-center border-dashed border-zinc-800 bg-transparent hover:bg-zinc-900/40 hover:border-zinc-700">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <Plus className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Initialize New</p>
            </Card>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filteredResumes.map((resumeItem) => (
              <motion.div variants={item} key={resumeItem._id}>
                <Card onClick={() => navigate(`/app/builder/${resumeItem._id}`)} className="h-[280px] flex flex-col bg-zinc-900/40 backdrop-blur-md">
                  <div className="flex-1 bg-zinc-950/50 p-6 relative overflow-hidden flex items-center justify-center">
                    <div className="w-[110px] h-[150px] shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1 bg-white">
                      <MiniResumePreview data={resumeItem} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-20 pointer-events-none" />
                  </div>
                  <div className="p-4 border-t border-white/5 bg-zinc-900/20 z-30">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 overflow-hidden">
                        <h3 className="text-[11px] font-bold text-white truncate pr-4 uppercase tracking-wider">
                          {resumeItem.title || "Untitled Resume"}
                        </h3>
                        <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.15em]">
                          v1.0 • {new Date(resumeItem.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>

                      {/* --- ACTIONS GROUP --- */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                        {/* EDIT BUTTON */}
                        <button
                          onClick={(e) => handleEditClick(e, resumeItem)}
                          className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-all"
                          title="Rename Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={(e) => handleDelete(e, resumeItem._id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!isLoading && allResumes.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 space-y-6">
          <div className="w-16 h-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto">
            <FolderOpen className="w-6 h-6 text-zinc-700" />
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-bold tracking-tight">Workspace is Empty</h3>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">No active resume projects detected</p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={handleImportClick} className="text-zinc-500 hover:text-white text-xs underline decoration-zinc-800 hover:decoration-white underline-offset-4 transition-all">Import existing</button>
            <span className="text-zinc-800">•</span>
            <button onClick={handleCreateClick} className="text-zinc-500 hover:text-white text-xs underline decoration-zinc-800 hover:decoration-white underline-offset-4 transition-all">Create new</button>
          </div>
        </motion.div>
      )}

      {/* --- CREATE / EDIT MODAL --- */}
      <AnimatePresence>
        {showCreateResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-xl shadow-2xl p-6 relative"
            >
              <button onClick={() => setShowCreateResume(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-lg font-bold text-white tracking-tight mb-1">
                {editResumeId ? "Rename Project" : "Create Project"}
              </h2>
              <p className="text-xs text-zinc-400 mb-6">
                {editResumeId ? "Update the title of your resume." : "Give your new resume a unique identifier."}
              </p>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Project Title</label>
                  <input
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Full Stack Resume 2026"
                    className="w-full bg-zinc-900 border border-white/5 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all placeholder-zinc-700"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowCreateResume(false)} className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-widest rounded-md transition-colors">Cancel</button>
                  <button type="submit" disabled={!title.trim()} className="flex-1 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {editResumeId ? "Update Title" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- UPLOAD RESUME MODAL --- */}
      <AnimatePresence>
        {showUploadResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-xl shadow-2xl p-6 relative"
            >
              <button onClick={() => setShowUploadResume(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-lg font-bold text-white tracking-tight mb-4">Upload Resume</h2>

              <form onSubmit={handleImportSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Resume Title"
                    className="w-full bg-zinc-900 border border-white/5 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all placeholder-zinc-700"
                  />
                </div>

                <div>
                  <p className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Select resume file</p>
                  <div
                    onClick={triggerFileSelect}
                    className={`
                       border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all
                       ${selectedFile ? 'border-green-500/50 bg-green-500/5' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/30'}
                     `}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.docx" className="hidden" />
                    {selectedFile ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                          <FileText className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-sm font-medium text-green-400">{selectedFile.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-2">
                          <CloudUpload className="w-5 h-5 text-zinc-400" />
                        </div>
                        <p className="text-xs text-zinc-400 font-medium">Click to upload resume</p>
                        <p className="text-[10px] text-zinc-600 mt-1">PDF or DOCX</p>
                      </>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={!title.trim() || !selectedFile} className="w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                  Upload Resume
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Dashboard