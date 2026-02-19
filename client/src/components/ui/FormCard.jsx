import React from 'react'
import { Trash2 } from 'lucide-react'

const FormCard = ({ children, onRemove }) => (
    <div className="bg-card/60 backdrop-blur-xl p-5 rounded-2xl border border-border space-y-4 relative group hover:border-white/20 transition-colors duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {onRemove && (
            <button
                onClick={onRemove}
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none bg-background p-1.5 rounded-md border border-border hover:border-destructive/30"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        )}
        {children}
    </div>
)

export default FormCard
