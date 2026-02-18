import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

const Mesh = () => {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#52525b" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </Float>
  )
}

const GeometricShape = () => {
  return (
    <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Mesh />
      </Canvas>
    </div>
  )
}

export default GeometricShape;