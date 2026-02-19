import { useCallback } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useEffect, useState } from "react"

const ParticleField = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          color: { value: "#ffffff" },
          move: { enable: true, speed: 0.3, random: true, direction: "none" },
          number: { value: 60, density: { enable: true, area: 800 } },
          opacity: { value: 0.2 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            color: "#ffffff",
            opacity: 0.05,
            distance: 150,
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticleField