import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { token, user } = useSelector(state => state.auth) || {}
  const location = useLocation()
  const navigate = useNavigate()

  // Helper to check if we are in the Dashboard area
  const isDashboard = location.pathname.startsWith('/app')

  const scrollToSection = (e, id) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    /* IMPROVEMENT 1: Changed 'fixed' to 'sticky'. 
       This allows it to fill the space next to the sidebar in Layout.jsx 
    */
    <nav className="sticky top-0 w-full z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* --- IMPROVEMENT 3: Hide Logo in Dashboard to avoid "Double Logo" --- */}
        {!isDashboard ? (
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Apex Logo" 
              className="w-8 h-8 rounded-lg object-contain bg-zinc-900 border border-zinc-800 transform group-hover:rotate-6 transition-transform shadow-2xl" 
            />
            <span className="font-bold text-lg tracking-tighter text-white uppercase">APEX</span>
          </Link>
        ) : (
          /* Placeholder to keep the 'between' spacing if logo is hidden */
          <div className="flex-1 md:flex-none" />
        )}

        {/* --- IMPROVEMENT 2: Hide Center Nav in Dashboard (Redundancy Check) --- */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 hover:text-white uppercase transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* --- ACTIONS & GREETING --- */}
        <div className="flex items-center gap-6">
          {token ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase">
                HI, <span className="text-white">{user?.fullName?.split(' ')[0] || 'ENGINEER'}</span>
              </span>
              
              {/* Only show Workspace button if we aren't already there */}
              {!isDashboard && (
                <Link 
                  to="/app" 
                  className="px-5 py-2 text-[10px] font-bold tracking-widest text-black bg-white rounded-md hover:bg-zinc-200 transition-all uppercase shadow-lg shadow-white/5"
                >
                  Workspace
                </Link>
              )}
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hidden sm:block text-[10px] font-bold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/login" 
                className="px-5 py-2 text-[10px] font-bold tracking-widest text-black bg-white rounded-md hover:bg-zinc-200 transition-all uppercase shadow-[0_0_25px_rgba(255,255,255,0.1)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar