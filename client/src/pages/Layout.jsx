import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  LayoutGrid, 
  LogOut, 
  User, 
  ChevronRight,
} from 'lucide-react'
import { logout } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`
      group flex items-center gap-3 px-3 py-2.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-all duration-200
      ${active 
        ? 'bg-zinc-800 text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
      }
    `}
  >
    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
    <span>{label}</span>
    {active && <ChevronRight className="w-3 h-3 ml-auto text-zinc-500" />}
  </Link>
)

const Layout = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/app' },
  ]

  return (
    <div className="flex h-screen bg-transparent overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-card/50 backdrop-blur-xl border-r border-border flex flex-col z-50">
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3 group">
             <img 
               src="/logo.png" 
               alt="Apex Logo" 
               className="w-8 h-8 rounded-lg object-contain bg-zinc-900 border border-zinc-800 transform group-hover:rotate-6 transition-transform" 
             />
             <span className="font-bold text-lg tracking-tighter text-white uppercase">APEX</span>
          </Link>
        </div>

        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4 px-2">
            Workspace
          </div>
          {navItems.map((item) => (
            <SidebarItem 
              key={item.path} 
              {...item} 
              active={location.pathname === item.path} 
            />
          ))}
        </div>

        <div className="p-4 border-t border-border/50 bg-zinc-900/30">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
               <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white truncate uppercase tracking-wider">
                {user?.fullName || 'ENGINEER'}
              </p>
              <p className="text-[10px] text-zinc-500 truncate lowercase">
                {user?.email || 'user@apex.com'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-bold tracking-widest text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors border border-transparent uppercase"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative overflow-hidden">
        {/* The adaptive Navbar now sits perfectly inside this main container */}
        <Navbar />

        <div className="flex-1 overflow-y-auto scrollbar-hide">
           <div className="p-6 md:p-8">
              <Outlet />
           </div>
        </div>
      </main>

    </div>
  )
}

export default Layout