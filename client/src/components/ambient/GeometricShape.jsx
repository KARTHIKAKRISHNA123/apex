import React from 'react'

const GeometricShape = () => {
  return (
    <div className="fixed bottom-0 right-0 w-[500px] h-[500px] z-0 pointer-events-none">
      {/* Outer slow ring */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: 'spin 25s linear infinite' }}
      >
        <div className="w-72 h-72 border border-zinc-500/20 rounded-full" />
      </div>

      {/* Middle diamond */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: 'spin 18s linear infinite reverse' }}
      >
        <div className="w-52 h-52 border border-zinc-400/15 rotate-45" />
      </div>

      {/* Inner triangle-like shape */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: 'spin 12s linear infinite' }}
      >
        <div className="w-32 h-32 border border-zinc-300/10 rotate-12" />
      </div>

      {/* Center glow dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-zinc-400/20 blur-sm" />
      </div>
    </div>
  )
}

export default GeometricShape