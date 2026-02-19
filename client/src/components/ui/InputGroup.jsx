import React from 'react'

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", className = "" }) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="text-[11px] font-medium text-muted-foreground tracking-wide">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-[13px] text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all duration-200"
        />
    </div>
)

export default InputGroup
