import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { 
  User, Briefcase, GraduationCap, Code, 
  Download, Save, ChevronLeft, 
  Plus, Trash2, Eye, Layout, Medal, X, Palette, 
  FolderGit2, Terminal, Trophy, Users 
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useReactToPrint } from 'react-to-print'

// --- Assets & Data ---
import { dummyResumeData } from '../assets/assets'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import TemplateSelector from '../components/forms/TemplateSelector' // <-- Imported TemplateSelector
import ResumePreview from '../components/ResumePreview'

// --- Ambient Background Components ---
import AmbientBackground from '../components/ambient/AmbientGlow'
import Particles from '../components/ambient/ParticleField'
import GeometricShape from '../components/ambient/GeometricShape'

// --- VISUAL COMPONENTS (Internal) ---
const SectionButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all focus:outline-none
      ${active 
        ? 'bg-white/10 text-white shadow-lg border-l-2 border-white backdrop-blur-md' 
        : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
      }
    `}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-zinc-600'}`} />
    <span>{label}</span>
  </button>
)

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-400 transition-all placeholder-zinc-700 hover:border-white/20 backdrop-blur-sm"
    />
  </div>
)

const TextAreaGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-400 transition-all placeholder-zinc-700 resize-none hover:border-white/20 backdrop-blur-sm"
    />
  </div>
)

// --- MAIN BUILDER COMPONENT ---
const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const componentRef = useRef()

  const [activeTab, setActiveTab] = useState('design') 
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  
  const initialTitle = location.state?.title || ''
  
  const [resumeData, setResumeData] = useState(() => {
    // Check dummy data first to hydrate state immediately on first render
    const found = dummyResumeData.find(r => r._id === resumeId);
    if (found) return { ...found, title: found.title || initialTitle };
    
    return {
      title: initialTitle,
      template: 'modern',
      accent_color: '#000000', 
      personal_info: { 
        full_name: '', email: '', phone: '', profession: '', 
        location: '', website: '', linkedin: '', 
        github: '', coding_platform: '',
        image: '', remove_bg: false 
      },
      professional_summary: '',
      experience: [],
      education: [],
      projects: [], 
      internships: [],
      hackathons: [],
      leadership: [], 
      certifications: [],
      skills: []
    };
  })

  // Prioritize Local Storage updates if they exist
  useEffect(() => {
    const saved = localStorage.getItem(`resume_${resumeId}`)
    if (saved) {
      setResumeData(JSON.parse(saved))
    }
  }, [resumeId])

  // Auto-save logic
  useEffect(() => {
    if (resumeId) {
      const payload = {
        ...resumeData,
        _id: resumeId,
        title: resumeData.title || resumeData.personal_info.full_name || 'Untitled Resume',
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem(`resume_${resumeId}`, JSON.stringify(payload))
    }
  }, [resumeData, resumeId])

  const handleLocalSave = () => {
    if (!resumeId) return
    const payload = {
      ...resumeData,
      _id: resumeId,
      title: resumeData.title || resumeData.personal_info.full_name || 'Untitled Resume',
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(`resume_${resumeId}`, JSON.stringify(payload))
    toast.success("Progress saved locally!")
  }

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personal_info.full_name || 'Resume'}_CV`,
    pageStyle: `
      @page { size: A4 portrait; margin: 8mm; }
      @media print {
        html, body { background: #fff !important; margin: 0 !important; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        #resume-preview-content {
          height: 297mm !important;
          overflow: hidden !important; 
        }
      }
    `,
  })

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target
    if (section === 'personal_info') {
      setResumeData(prev => ({ ...prev, personal_info: { ...prev.personal_info, [name]: value } }))
    } else if (index !== null) {
      setResumeData(prev => {
        const list = [...prev[section]]
        list[index] = { ...list[index], [name]: value }
        return { ...prev, [section]: list }
      })
    } else {
      setResumeData(prev => ({ ...prev, [name]: value }))
    }
  }

  const addArrayItem = (section, template) => {
    setResumeData(prev => ({ ...prev, [section]: [...(prev[section] || []), template] }))
  }

  const removeArrayItem = (section, index) => {
    setResumeData(prev => {
      const list = [...prev[section]]
      list.splice(index, 1)
      return { ...prev, [section]: list }
    })
  }

  const handleSkillChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim())
    setResumeData(prev => ({ ...prev, skills: skillsArray }))
  }

  const renderFormContent = () => {
    switch (activeTab) {
      // --- REPLACED INLINE CODE WITH COMPONENT ---
      case 'design':
        return (
          <TemplateSelector 
            currentTemplate={resumeData.template} 
            currentColor={resumeData.accent_color} 
            onTemplateChange={(id) => setResumeData(prev => ({ ...prev, template: id }))}
            onColorChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
          />
        )

      case 'personal':
        return <PersonalInfoForm personalInfo={resumeData.personal_info} summary={resumeData.professional_summary} onChange={handleInputChange} />
      
      case 'experience':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Work Experience</h2>
              <button onClick={() => addArrayItem('experience', { company: '', position: '', start_date: '', end_date: '', description: '', is_current: false })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add Position</button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Company" name="company" value={exp.company} onChange={(e) => handleInputChange(e, 'experience', index)} />
                  <InputGroup label="Position" name="position" value={exp.position} onChange={(e) => handleInputChange(e, 'experience', index)} />
                  <InputGroup label="Start Date" name="start_date" type="month" value={exp.start_date} onChange={(e) => handleInputChange(e, 'experience', index)} />
                  <InputGroup label="End Date" name="end_date" type="month" value={exp.end_date} onChange={(e) => handleInputChange(e, 'experience', index)} />
                </div>
                <TextAreaGroup label="Description" name="description" value={exp.description} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="Achievements..." />
              </div>
            ))}
          </div>
        )
      
      case 'projects':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Projects</h2>
              <button onClick={() => addArrayItem('projects', { name: '', type: '', description: '', link: '' })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add Project</button>
            </div>
            {resumeData.projects?.map((proj, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('projects', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Project Name" name="name" value={proj.name} onChange={(e) => handleInputChange(e, 'projects', index)} />
                  <InputGroup label="Tech Stack / Type" name="type" placeholder="React, Node.js" value={proj.type} onChange={(e) => handleInputChange(e, 'projects', index)} />
                </div>
                <InputGroup label="Project Link" name="link" type="url" placeholder="https://github.com/..." value={proj.link} onChange={(e) => handleInputChange(e, 'projects', index)} />
                <TextAreaGroup label="Description" name="description" value={proj.description} onChange={(e) => handleInputChange(e, 'projects', index)} placeholder="What did you build?" />
              </div>
            ))}
          </div>
        )
      
      case 'internships':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Internships</h2>
              <button onClick={() => addArrayItem('internships', { company: '', role: '', duration: '', description: '' })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add Internship</button>
            </div>
            {resumeData.internships?.map((intern, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('internships', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Company Name" name="company" value={intern.company} onChange={(e) => handleInputChange(e, 'internships', index)} />
                  <InputGroup label="Role" name="role" value={intern.role} onChange={(e) => handleInputChange(e, 'internships', index)} />
                  <InputGroup label="Duration" name="duration" placeholder="e.g., Summer 2023" value={intern.duration} onChange={(e) => handleInputChange(e, 'internships', index)} className="col-span-2" />
                </div>
                <TextAreaGroup label="Description" name="description" value={intern.description} onChange={(e) => handleInputChange(e, 'internships', index)} placeholder="What did you do?" />
              </div>
            ))}
          </div>
        )
      
      case 'hackathons':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Hackathons</h2>
              <button onClick={() => addArrayItem('hackathons', { name: '', achievement: '', date: '', description: '' })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add Hackathon</button>
            </div>
            {resumeData.hackathons?.map((hack, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('hackathons', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Hackathon Name" name="name" value={hack.name} onChange={(e) => handleInputChange(e, 'hackathons', index)} />
                  <InputGroup label="Achievement / Rank" name="achievement" placeholder="e.g., 1st Place / Finalist" value={hack.achievement} onChange={(e) => handleInputChange(e, 'hackathons', index)} />
                  <InputGroup label="Date" name="date" type="text" placeholder="e.g., Jan 2024" value={hack.date} onChange={(e) => handleInputChange(e, 'hackathons', index)} className="col-span-2" />
                </div>
                <TextAreaGroup label="Description / Project Built" name="description" value={hack.description} onChange={(e) => handleInputChange(e, 'hackathons', index)} placeholder="Briefly describe what you built." />
              </div>
            ))}
          </div>
        )
      
      case 'leadership':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Leadership & Extracurriculars</h2>
              <button onClick={() => addArrayItem('leadership', { role: '', organization: '', date: '', description: '' })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add Role</button>
            </div>
            {resumeData.leadership?.map((item, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('leadership', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Role / Title" name="role" placeholder="e.g., Class Representative" value={item.role} onChange={(e) => handleInputChange(e, 'leadership', index)} />
                  <InputGroup label="Organization / Club" name="organization" placeholder="e.g., ABC College" value={item.organization} onChange={(e) => handleInputChange(e, 'leadership', index)} />
                  <InputGroup label="Date" name="date" type="text" placeholder="e.g., 2022 - 2023" value={item.date} onChange={(e) => handleInputChange(e, 'leadership', index)} className="col-span-2" />
                </div>
                <TextAreaGroup label="Description" name="description" value={item.description} onChange={(e) => handleInputChange(e, 'leadership', index)} placeholder="What were your responsibilities?" />
              </div>
            ))}
          </div>
        )
      
      case 'education':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Education</h2>
              <button onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', graduation_date: '', gpa: '' })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add Education</button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Institution" name="institution" value={edu.institution} onChange={(e) => handleInputChange(e, 'education', index)} />
                  <InputGroup label="Degree" name="degree" value={edu.degree} onChange={(e) => handleInputChange(e, 'education', index)} />
                  <InputGroup label="Field of Study" name="field" value={edu.field} onChange={(e) => handleInputChange(e, 'education', index)} />
                  <InputGroup label="Graduation Date" name="graduation_date" type="month" value={edu.graduation_date} onChange={(e) => handleInputChange(e, 'education', index)} />
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'certifications':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Certifications</h2>
              <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '', link: '' })} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-sm focus:outline-none"><Plus className="w-3 h-3" /> Add</button>
            </div>
            {resumeData.certifications?.map((cert, index) => (
              <div key={index} className="bg-zinc-900/20 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-4 relative group">
                <button onClick={() => removeArrayItem('certifications', index)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Certification Name" name="name" value={cert.name} onChange={(e) => handleInputChange(e, 'certifications', index)} />
                  <InputGroup label="Issuing Organization" name="issuer" value={cert.issuer} onChange={(e) => handleInputChange(e, 'certifications', index)} />
                  <InputGroup label="Date" name="date" type="month" value={cert.date} onChange={(e) => handleInputChange(e, 'certifications', index)} />
                  <InputGroup label="Certificate URL" name="link" type="url" placeholder="https://..." value={cert.link} onChange={(e) => handleInputChange(e, 'certifications', index)} />
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'skills':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <h2 className="text-xl font-bold text-white mb-6">Skills & Expertise</h2>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Skills (Comma Separated)</label>
              <textarea
                value={resumeData.skills.join(', ')}
                onChange={handleSkillChange}
                placeholder="React, Node.js, Python..."
                rows={6}
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-400 transition-all placeholder-zinc-700 leading-relaxed backdrop-blur-sm"
              />
            </div>
          </div>
        )
      default: return null
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden relative bg-[#09090b] text-white">

      {/* --- AMBIENT BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AmbientBackground />
        <Particles />
        <GeometricShape />
      </div>

      {/* --- UI LAYER --- */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full pointer-events-none">

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/40 backdrop-blur-md z-50 pointer-events-auto">
          <button onClick={() => navigate('/app')} className="text-zinc-400 focus:outline-none"><ChevronLeft /></button>
          <span className="font-bold text-white text-sm">Resume Builder</span>
          <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="text-white bg-white/10 p-2 rounded focus:outline-none">
            {isPreviewOpen ? <Layout className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className="pointer-events-auto w-full md:w-20 lg:w-[280px] bg-black/10 backdrop-blur-md border-r border-white/10 flex md:flex-col justify-between md:justify-start overflow-x-auto md:overflow-y-auto scrollbar-hide">
          <div className="p-4 border-b border-white/10 hidden md:block">
            <button onClick={() => navigate('/app')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 focus:outline-none">
              <ChevronLeft className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Back</span>
            </button>
          </div>

          <div className="flex md:flex-col gap-1 p-2 md:p-4 min-w-max md:min-w-0">
            <SectionButton icon={Palette} label="Design" active={activeTab === 'design'} onClick={() => setActiveTab('design')} />
            <div className="h-px w-full bg-white/10 my-2 hidden md:block" />
            <SectionButton icon={User} label="Personal" active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
            <SectionButton icon={Briefcase} label="Experience" active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
            <SectionButton icon={GraduationCap} label="Education" active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
            <SectionButton icon={FolderGit2} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
            <SectionButton icon={Terminal} label="Internships" active={activeTab === 'internships'} onClick={() => setActiveTab('internships')} />
            <SectionButton icon={Trophy} label="Hackathons" active={activeTab === 'hackathons'} onClick={() => setActiveTab('hackathons')} />
            <SectionButton icon={Users} label="Leadership" active={activeTab === 'leadership'} onClick={() => setActiveTab('leadership')} />
            <SectionButton icon={Medal} label="Certifications" active={activeTab === 'certifications'} onClick={() => setActiveTab('certifications')} />
            <SectionButton icon={Code} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
          </div>

          <div className="mt-auto p-4 border-t border-white/10 space-y-2 hidden md:block">
            <button onClick={handleLocalSave} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-white/10 transition-all focus:outline-none">
              <Save className="w-4 h-4" /> <span>Save</span>
            </button>
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] focus:outline-none">
              <Download className="w-4 h-4" /> <span>Export PDF</span>
            </button>
          </div>
        </aside>

        {/* Editor Main */}
        <main className={`pointer-events-auto flex-1 bg-transparent p-6 md:p-12 overflow-y-auto scrollbar-hide ${isPreviewOpen ? 'hidden md:block' : 'block'}`}>
          <div className="max-w-2xl mx-auto pb-20">{renderFormContent()}</div>
        </main>

        {/* Live Preview */}
        <aside className={`pointer-events-auto fixed inset-0 md:static md:w-1/2 lg:w-[45%] bg-black/10 backdrop-blur-lg border-l border-white/10 flex flex-col transition-transform duration-300 ${isPreviewOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-transparent">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Live Preview</h3>
            <div className="flex gap-2">
              <button onClick={() => setIsPreviewOpen(false)} className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-transparent">
            <div className="w-[210mm] h-[297mm] overflow-hidden bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] origin-top transform scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.85] transition-transform">
              <ResumePreview ref={componentRef} data={resumeData} />
            </div>
          </div>
          <div className="md:hidden absolute bottom-6 right-6 z-50">
            <button onClick={handlePrint} className="w-14 h-14 bg-white text-black rounded-full shadow-xl flex items-center justify-center focus:outline-none">
              <Download className="w-6 h-6" />
            </button>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default ResumeBuilder