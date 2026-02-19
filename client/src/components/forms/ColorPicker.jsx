import React, { useState, useEffect } from 'react';
import { Pipette } from 'lucide-react';

const availableColors = [
  '#000000', // Black
  '#0f172a', // Slate 900
  '#2563eb', // Blue 600
  '#16a34a', // Green 600
  '#dc2626', // Red 600
  '#9333ea', // Purple 600
  '#ea580c'  // Orange 600
];

const ColorPicker = ({ currentColor, onColorChange }) => {
  const [customHex, setCustomHex] = useState(currentColor);

  useEffect(() => {
    setCustomHex(currentColor);
  }, [currentColor]);

  const handleCustomHexChange = (e) => {
    const value = e.target.value;
    setCustomHex(value);
    if (/^#[0-9A-F]{6}$/i.test(value) || /^#[0-9A-F]{3}$/i.test(value)) {
      onColorChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Accent Color</h2>
      
      {/* PRESET COLORS */}
      <div className="flex flex-wrap gap-4">
        {availableColors.map((color) => (
          <button 
            key={color} 
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 rounded-full border border-white/10 transition-transform hover:scale-110 flex items-center justify-center shadow-lg focus:outline-none ${
              currentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b]' : ''
            }`}
            style={{ backgroundColor: color }} 
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>

      {/* CUSTOM COLOR PICKER */}
      <div className="flex items-center gap-3 mt-4 p-3 bg-black/30 border border-white/10 rounded-xl backdrop-blur-sm w-full md:w-3/4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-inner flex-shrink-0 group cursor-pointer">
          <input 
            type="color" 
            value={currentColor} 
            onChange={(e) => onColorChange(e.target.value)}
            className="absolute -inset-4 w-20 h-20 cursor-pointer opacity-0 z-10"
            title="Choose custom color"
          />
          <div 
            className="w-full h-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: currentColor }}
          >
            <Pipette className={`w-4 h-4 ${currentColor === '#000000' || currentColor.toLowerCase() === '#ffffff' ? 'text-gray-400' : 'text-white mix-blend-difference'}`} />
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Custom Hex</label>
          <div className="flex items-center bg-black/50 border border-white/10 rounded-md px-3 py-1.5 overflow-hidden focus-within:border-zinc-400 transition-colors">
            <span className="text-zinc-500 font-mono text-sm mr-1">#</span>
            <input 
              type="text" 
              value={customHex.replace('#', '')} 
              onChange={handleCustomHexChange}
              placeholder="000000"
              maxLength={6}
              className="w-full bg-transparent text-sm text-white font-mono focus:outline-none placeholder-zinc-700 uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;