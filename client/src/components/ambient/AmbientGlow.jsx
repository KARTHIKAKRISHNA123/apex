import React from 'react'

const AmbientGlow = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-zinc-700/10 rounded-full blur-[100px]" />
    </div>
  )
}

export default AmbientGlow