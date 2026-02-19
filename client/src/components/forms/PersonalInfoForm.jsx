import React, { useRef } from 'react'
import { 
  User, UploadCloud, X, Wand2, 
  Mail, Phone, MapPin, BriefcaseBusiness, Linkedin, Globe,
  Github, Code // <-- New icons imported here
} from 'lucide-react'

// --- Internal UI Components ---
const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", icon: Icon, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-zinc-900/50 border border-white/5 rounded-md py-2.5 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all placeholder-zinc-700 hover:border-white/10 ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
      />
    </div>
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

// --- Main Component ---
const PersonalInfoForm = ({ personalInfo, summary, onChange }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image is too large for local preview. Please choose a file under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ target: { name: 'image', value: reader.result } }, 'personal_info');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ target: { name: 'image', value: '' } }, 'personal_info');
    onChange({ target: { name: 'remove_bg', value: false } }, 'personal_info');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- UPDATED FIELDS ARRAY ---
  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", placeholder: "e.g. John Doe" },
    { key: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "e.g. john@example.com" },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "e.g. +1 234 567 890" },
    { key: "location", label: "Location", icon: MapPin, type: "text", placeholder: "e.g. New York, USA" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", placeholder: "e.g. Full Stack Developer" },
    { key: "github", label: "GitHub Profile", icon: Github, type: "url", placeholder: "e.g. github.com/johndoe" }, // <-- New
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url", placeholder: "e.g. linkedin.com/in/johndoe" },
    { key: "coding_platform", label: "Coding Profile", icon: Code, type: "url", placeholder: "e.g. leetcode.com/johndoe" }, // <-- New
    { key: "website", label: "Personal Website", icon: Globe, type: "url", placeholder: "e.g. johndoe.dev" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
          <User className="w-4 h-4 text-zinc-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Personal Details</h2>
      </div>

      <div className="flex items-start gap-5 p-4 bg-zinc-900/30 border border-white/5 rounded-lg">
        <div className="relative w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0 mt-1">
          {personalInfo?.image ? (
            <img 
              src={personalInfo.image} 
              alt="Profile" 
              className={`w-full h-full object-cover transition-all ${personalInfo?.remove_bg ? 'mix-blend-screen brightness-110' : ''}`} 
            />
          ) : (
            <User className="w-6 h-6 text-zinc-600" />
          )}
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-xs font-bold bg-white text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
              <UploadCloud className="w-3.5 h-3.5" /> Upload Photo
            </button>
            {personalInfo?.image && (
              <button type="button" onClick={removeImage} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors">
                <X className="w-3 h-3" /> Remove
              </button>
            )}
          </div>

          {personalInfo?.image && (
            <div className="flex items-center justify-between p-3 bg-zinc-950/50 border border-white/5 rounded-md mt-1">
              <div className="flex items-center gap-2">
                <Wand2 className={`w-3.5 h-3.5 ${personalInfo?.remove_bg ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <div>
                  <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Remove Background</p>
                  <p className="text-[9px] text-zinc-500">Requires ImageKit integration</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={personalInfo?.remove_bg || false}
                  onChange={(e) => onChange({ target: { name: 'remove_bg', value: e.target.checked } }, 'personal_info')}
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <InputGroup 
            key={field.key}
            label={field.label} 
            name={field.key} 
            type={field.type}
            icon={field.icon}
            value={personalInfo?.[field.key] || ''} 
            onChange={(e) => onChange(e, 'personal_info')} 
            placeholder={field.placeholder} 
          />
        ))}
      </div>

      <div className="pt-2">
        <TextAreaGroup 
          label="Professional Summary" 
          name="professional_summary" 
          value={summary || ''} 
          onChange={(e) => onChange(e, null)} 
          placeholder="Briefly describe your professional background, key skills, and career goals..." 
        />
      </div>
    </div>
  )
}

export default PersonalInfoForm