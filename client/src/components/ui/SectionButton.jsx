import React from 'react'

const SectionButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring
      ${active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            }
    `}
    >
        <Icon className={`w-4 h-4 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        <span>{label}</span>
    </button>
)

export default SectionButton
