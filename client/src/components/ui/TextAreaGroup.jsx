import React from 'react'

const TextAreaGroup = ({ label, name, value, onChange, placeholder }) => (
    <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-muted-foreground tracking-wide">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-[13px] text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all duration-200 resize-none"
        />
    </div>
)

export default TextAreaGroup
