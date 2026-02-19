import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { 
  User, Briefcase, GraduationCap, Code, 
  Award, Download, Save, ChevronLeft, 
  Plus, Trash2, Eye, Layout, Medal, X
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useReactToPrint } from 'react-to-print'
import { dummyResumeData } from '../assets/assets'

// --- VISUAL COMPONENTS (Internal) ---

const SectionButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
      ${active 
        ? 'bg-zinc-800 text-white shadow-lg border-l-2 border-white' 
        : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
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
      className="w-full bg-zinc-900/50 border border-white/5 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all placeholder-zinc-700 hover:border-white/10"
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
      className="w-full bg-zinc-900/50 border border-white/5 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all placeholder-zinc-700 resize-none hover:border-white/10"
    />
  </div>
)

// --- PREVIEW COMPONENT (The PDF Content) ---
const ResumePreview = React.forwardRef(({ data }, ref) => {
  const accent = data.accent_color || "#000000";

  return (
    // ID added here for CSS targeting during print
    <div
      id="resume-preview-content"
      ref={ref}
      className="w-full h-full bg-white text-black font-sans p-8 md:p-12 shadow-2xl overflow-y-auto"
      style={{ minHeight: '297mm' }}
    >
      {/* Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: accent }}>
        <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-2" style={{ color: '#18181b' }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-lg font-medium tracking-wide uppercase" style={{ color: accent }}>
          {data.personal_info?.profession || "Target Role"}
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>• {data.personal_info.location}</span>}
          {data.personal_info?.website && <span>• {data.personal_info.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-zinc-100 pb-1 text-zinc-400">Profile</h3>
          <p className="text-sm text-zinc-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-zinc-100 pb-1 text-zinc-400">Experience</h3>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-zinc-900">{exp.position}</h4>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                    {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                  </span>
                </div>
                <div className="text-sm font-semibold text-zinc-600 mb-2" style={{ color: accent }}>{exp.company}</div>
                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-zinc-100 pb-1 text-zinc-400">Education</h3>
          <div className="grid grid-cols-1 gap-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <h4 className="font-bold text-zinc-900">{edu.institution}</h4>
                  <p className="text-sm text-zinc-600">{edu.degree} in {edu.field}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-zinc-500 block">{edu.graduation_date}</span>
                  {edu.gpa && <span className="text-xs text-zinc-400">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications (NEW SECTION) */}
      {data.certifications?.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-zinc-100 pb-1 text-zinc-400">Certifications</h3>
          <div className="space-y-3">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">{cert.name}</h4>
                  <p className="text-xs text-zinc-600 font-medium">{cert.issuer}</p>
                </div>
                <span className="text-xs text-zinc-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-zinc-100 pb-1 text-zinc-400">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-md text-xs font-bold border border-zinc-200">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
})

// --- MAIN BUILDER COMPONENT ---

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const componentRef = useRef()

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('personal')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  
  // Initial State includes title & Certifications
  const initialTitle = location.state?.title || ''
  const [resumeData, setResumeData] = useState({
    title: initialTitle,
    personal_info: { full_name: '', email: '', phone: '', profession: '', location: '', website: '' },
    professional_summary: '',
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    accent_color: '#000000'
  })

  // --- LOAD DATA (Simulated Local Storage / API) ---
  useEffect(() => {
    // 1. Check Local Storage first
    const saved = localStorage.getItem(`resume_${resumeId}`)
    if (saved) {
      setResumeData(JSON.parse(saved))
    } else {
      // 2. Or load from dummy data for "Edit" simulation
      const found = dummyResumeData.find(r => r._id === resumeId)
      if (found) setResumeData(found)
    }
  }, [resumeId])

  // --- AUTO-SAVE (Background Backup) ---
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

  // --- MANUAL SAVE HANDLER ---
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

  // --- PRINT HANDLER ---
  // react-to-print v3 expects a `contentRef` (not `content: () => ...`)
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personal_info.full_name || 'Resume'}_CV`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 8mm;
      }
      @media print {
        html, body {
          background: #fff !important;
        }
        body {
          margin: 0 !important;
        }
        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        #resume-preview-content {
          height: auto !important;
          overflow: visible !important;
          box-shadow: none !important;
          padding: 12mm 10mm !important;
        }
      }
    `,
  })

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target
    
    if (section === 'personal_info') {
      setResumeData(prev => ({ ...prev, personal_info: { ...prev.personal_info, [name]: value } }))
    } else if (index !== null) {
      // Handle Array Updates (Experience/Education/Certifications)
      setResumeData(prev => {
        const list = [...prev[section]]
        list[index] = { ...list[index], [name]: value }
        return { ...prev, [section]: list }
      })
    } else {
      // Direct fields (Summary)
      setResumeData(prev => ({ ...prev, [name]: value }))
    }
  }

  const addArrayItem = (section, template) => {
    setResumeData(prev => {
        const currentList = prev[section] || []
        return { ...prev, [section]: [...currentList, template] }
    })
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

  // --- RENDER HELPERS ---
  const renderFormContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-white mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputGroup label="Full Name" name="full_name" value={resumeData.personal_info.full_name} onChange={(e) => handleInputChange(e, 'personal_info')} placeholder="John Doe" />
              <InputGroup label="Job Title" name="profession" value={resumeData.personal_info.profession} onChange={(e) => handleInputChange(e, 'personal_info')} placeholder="Full Stack Developer" />
              <InputGroup label="Email" name="email" value={resumeData.personal_info.email} onChange={(e) => handleInputChange(e, 'personal_info')} placeholder="john@example.com" />
              <InputGroup label="Phone" name="phone" value={resumeData.personal_info.phone} onChange={(e) => handleInputChange(e, 'personal_info')} placeholder="+1 234 567 890" />
              <InputGroup label="Location" name="location" value={resumeData.personal_info.location} onChange={(e) => handleInputChange(e, 'personal_info')} placeholder="New York, USA" />
              <InputGroup label="Website / LinkedIn" name="website" value={resumeData.personal_info.website} onChange={(e) => handleInputChange(e, 'personal_info')} placeholder="linkedin.com/in/john" />
            </div>
            <TextAreaGroup label="Professional Summary" name="professional_summary" value={resumeData.professional_summary} onChange={(e) => handleInputChange(e, null)} placeholder="Briefly describe your professional background..." />
          </div>
        )
      
      case 'experience':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Work Experience</h2>
              <button onClick={() => addArrayItem('experience', { company: '', position: '', start_date: '', end_date: '', description: '', is_current: false })} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Position
              </button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-zinc-900/30 p-4 rounded-lg border border-white/5 space-y-4 relative group">
                <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Company" name="company" value={exp.company} onChange={(e) => handleInputChange(e, 'experience', index)} />
                  <InputGroup label="Position" name="position" value={exp.position} onChange={(e) => handleInputChange(e, 'experience', index)} />
                  <InputGroup label="Start Date" name="start_date" type="month" value={exp.start_date} onChange={(e) => handleInputChange(e, 'experience', index)} />
                  <InputGroup label="End Date" name="end_date" type="month" value={exp.end_date} onChange={(e) => handleInputChange(e, 'experience', index)} />
                </div>
                <TextAreaGroup label="Description" name="description" value={exp.description} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="Achievements and responsibilities..." />
              </div>
            ))}
            {resumeData.experience.length === 0 && <p className="text-zinc-500 text-sm italic text-center py-8">No experience added yet.</p>}
          </div>
        )

      case 'education':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Education</h2>
              <button onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', graduation_date: '', gpa: '' })} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Education
              </button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-zinc-900/30 p-4 rounded-lg border border-white/5 space-y-4 relative group">
                <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
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
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Certifications</h2>
              <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Certification
              </button>
            </div>
            {resumeData.certifications?.map((cert, index) => (
              <div key={index} className="bg-zinc-900/30 p-4 rounded-lg border border-white/5 space-y-4 relative group">
                <button onClick={() => removeArrayItem('certifications', index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Certification Name" name="name" value={cert.name} onChange={(e) => handleInputChange(e, 'certifications', index)} placeholder="AWS Certified Solutions Architect" />
                  <InputGroup label="Issuing Organization" name="issuer" value={cert.issuer} onChange={(e) => handleInputChange(e, 'certifications', index)} placeholder="Amazon Web Services" />
                  <InputGroup label="Date" name="date" type="month" value={cert.date} onChange={(e) => handleInputChange(e, 'certifications', index)} />
                </div>
              </div>
            ))}
            {(!resumeData.certifications || resumeData.certifications.length === 0) && <p className="text-zinc-500 text-sm italic text-center py-8">No certifications added yet.</p>}
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-white mb-6">Skills & Expertise</h2>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Skills (Comma Separated)</label>
              <textarea
                value={resumeData.skills.join(', ')}
                onChange={handleSkillChange}
                placeholder="React, Node.js, Python, Leadership, Project Management..."
                rows={6}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all placeholder-zinc-700 leading-relaxed"
              />
              <p className="text-xs text-zinc-500">Type skills separated by commas.</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-black overflow-hidden relative">
      
      {/* --- MOBILE TOP BAR --- */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-zinc-950 z-50">
         <button onClick={() => navigate('/app')} className="text-zinc-400"><ChevronLeft /></button>
         <span className="font-bold text-white text-sm">Resume Builder</span>
         <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="text-white bg-zinc-800 p-2 rounded">
           {isPreviewOpen ? <Layout className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
         </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-20 lg:w-64 bg-zinc-950 border-r border-white/5 flex md:flex-col justify-between md:justify-start z-40 overflow-x-auto md:overflow-visible">
        {/* Actions */}
        <div className="p-4 border-b border-white/5 hidden md:block">
          <button onClick={() => navigate('/app')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Back</span>
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex md:flex-col gap-1 p-2 md:p-4 overflow-x-auto">
          <SectionButton icon={User} label="Personal" active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
          <SectionButton icon={Briefcase} label="Experience" active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
          <SectionButton icon={GraduationCap} label="Education" active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          <SectionButton icon={Medal} label="Certifications" active={activeTab === 'certifications'} onClick={() => setActiveTab('certifications')} />
          <SectionButton icon={Code} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
        </div>

        {/* Footer Actions */}
        <div className="mt-auto p-4 border-t border-white/5 space-y-2 hidden md:block">
          <button 
             onClick={handleLocalSave}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
             <Save className="w-4 h-4" /> <span>Save</span>
          </button>
          <button 
             onClick={handlePrint}
             className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all"
          >
             <Download className="w-4 h-4" /> <span>Export PDF</span>
          </button>
        </div>
      </aside>

      {/* --- EDITOR --- */}
      <main className={`flex-1 bg-black p-6 md:p-12 overflow-y-auto scrollbar-hide ${isPreviewOpen ? 'hidden md:block' : 'block'}`}>
         <div className="max-w-2xl mx-auto pb-20">
           {renderFormContent()}
         </div>
      </main>

      {/* --- PREVIEW --- */}
      <aside className={`fixed inset-0 md:static md:w-1/2 lg:w-[45%] bg-zinc-900/50 backdrop-blur-xl border-l border-white/5 flex flex-col z-50 md:z-auto transition-transform duration-300 ${isPreviewOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
         
         <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-zinc-950 md:bg-transparent">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Live Preview</h3>
            <div className="flex gap-2">
               <button onClick={() => setIsPreviewOpen(false)} className="md:hidden p-2 text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-zinc-900/50">
            {/* The scaled visual container */}
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top transform scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.85] transition-transform">
               {/* The ResumePreview content itself.
                  We pass ref here so react-to-print grabs THIS component,
                  and we add the ID so CSS can find it.
               */}
               <ResumePreview ref={componentRef} data={resumeData} />
            </div>
         </div>
         
         <div className="md:hidden absolute bottom-6 right-6">
            <button onClick={handlePrint} className="w-14 h-14 bg-white text-black rounded-full shadow-xl flex items-center justify-center">
              <Download className="w-6 h-6" />
            </button>
         </div>
      </aside>

    </div>
  )
}

export default ResumeBuilder