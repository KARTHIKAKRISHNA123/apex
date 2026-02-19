import React from 'react';
import ColorPicker from './ColorPicker'; // Imports the color picker we made above!

// The array of templates was missing in your screenshot!
const availableTemplates = [
  { id: 'modern', name: 'Modern Clean' },
  { id: 'classic', name: 'Classic Serif' },
  { id: 'minimal', name: 'Minimalist' },
  { id: 'minimal-image', name: 'Minimal w/ Photo' },
  { id: 'deedy', name: 'Deedy Layout' }
];

const TemplateSelector = ({ currentTemplate, currentColor, onTemplateChange, onColorChange }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
      
      {/* --- TEMPLATE SELECTION (This puts the buttons back) --- */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Select Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableTemplates.map((tpl) => (
            <button 
              key={tpl.id} 
              onClick={() => onTemplateChange(tpl.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 backdrop-blur-md focus:outline-none ${
                currentTemplate === tpl.id 
                ? 'border-zinc-300 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                : 'border-zinc-800 bg-black/20 hover:border-zinc-600 hover:bg-white/5'
              }`}
            >
              <p className={`font-bold ${currentTemplate === tpl.id ? 'text-white' : 'text-zinc-400'}`}>
                {tpl.name}
              </p>
              <p className="text-xs text-zinc-500 mt-1 capitalize">{tpl.id} layout</p>
            </button>
          ))}
        </div>
      </div>

      {/* --- COLOR PICKER COMPONENT --- */}
      <ColorPicker 
        currentColor={currentColor} 
        onColorChange={onColorChange} 
      />

    </div>
  );
};

export default TemplateSelector;