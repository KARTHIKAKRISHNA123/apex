import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Preview from './pages/Preview'

// Ambient Components
const GeometricShape = React.lazy(() => import('./components/ambient/GeometricShape'))
import ParticleField from './components/ambient/ParticleField'
import AmbientGlow from './components/ambient/AmbientGlow'

const App = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-zinc-700 selection:text-white">
      
      {/* --- LAYER 0: ATMOSPHERE --- */}
      <AmbientGlow />
      <ParticleField />
      <Suspense fallback={null}>
         <GeometricShape />
      </Suspense>

      {/* --- LAYER 1: APP CONTENT --- */}
      <div className="relative z-10">
        <Toaster 
          position='bottom-right' 
          toastOptions={{
            style: {
              background: '#18181b', // Zinc 900
              color: '#fff',
              border: '1px solid #27272a', // Zinc 800
            },
          }}
        />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/app' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path='/app/builder/:resumeId' element={<ResumeBuilder />} />
          <Route path='/view/:resumeId' element={<Preview />} />
        </Routes>
      </div>

    </div>
  )
}

export default App