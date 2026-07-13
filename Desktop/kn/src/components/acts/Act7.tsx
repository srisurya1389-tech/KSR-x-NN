import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

interface FireworkBurst {
  position: [number, number, number]
  color: string
  time: number
  active: boolean
}

function FireworkSystem() {
  const meshRef = useRef<THREE.Points>(null)
  const particlesPerBurst = 120
  const maxBursts = 6
  const totalParticles = particlesPerBurst * maxBursts

  const { positions, velocities, colors, lifetimes } = useMemo(() => {
    const positions = new Float32Array(totalParticles * 3)
    const velocities = new Float32Array(totalParticles * 3)
    const colors = new Float32Array(totalParticles * 3)
    const lifetimes = new Float32Array(totalParticles)

    const burstColors = [
      new THREE.Color('#FFD700'),
      new THREE.Color('#FF69B4'),
      new THREE.Color('#00CCFF'),
      new THREE.Color('#FF4500'),
      new THREE.Color('#C9A84C'),
      new THREE.Color('#FFFFFF'),
    ]

    for (let b = 0; b < maxBursts; b++) {
      const bx = (Math.random() - 0.5) * 28
      const by = 22 + Math.random() * 10
      const bz = -42 - Math.random() * 38
      const bc = burstColors[b % burstColors.length]

      for (let i = 0; i < particlesPerBurst; i++) {
        const idx = (b * particlesPerBurst + i)
        // random sphere direction
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const speed = 0.08 + Math.random() * 0.12
        positions[idx*3] = bx
        positions[idx*3+1] = by
        positions[idx*3+2] = bz
        velocities[idx*3] = Math.sin(phi)*Math.cos(theta)*speed
        velocities[idx*3+1] = Math.sin(phi)*Math.sin(theta)*speed
        velocities[idx*3+2] = Math.cos(phi)*speed
        colors[idx*3] = bc.r
        colors[idx*3+1] = bc.g
        colors[idx*3+2] = bc.b
        lifetimes[idx] = b * 1.8 + Math.random() * 0.5 // stagger bursts
      }
    }
    return { positions, velocities, colors, lifetimes }
  }, [totalParticles, maxBursts, particlesPerBurst])

  const timeRef = useRef(0)
  const opacities = useRef(new Float32Array(totalParticles).fill(1))

  useFrame((_, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < totalParticles; i++) {
      const burstTime = timeRef.current % (maxBursts * 1.8)
      const particleAge = burstTime - lifetimes[i]

      if (particleAge > 0 && particleAge < 2.5) {
        pos[i*3] += velocities[i*3] * 0.6
        pos[i*3+1] += velocities[i*3+1] * 0.6 - 0.002 // gravity
        pos[i*3+2] += velocities[i*3+2] * 0.6
        opacities.current[i] = Math.max(0, 1 - particleAge / 2.5)
      } else if (particleAge > 2.5 || particleAge < 0) {
        // Reset
        if (particleAge > 2.5) {
          const b = Math.floor(i / particlesPerBurst)
          pos[i*3] = (Math.random() - 0.5) * 28
          pos[i*3+1] = 22 + Math.random() * 10
          pos[i*3+2] = -42 - Math.random() * 38
        }
        opacities.current[i] = 0
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    const mat = meshRef.current.material as THREE.PointsMaterial
    mat.opacity = 1 // individual opacity via colors instead
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={totalParticles} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={totalParticles} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// City glow lights far below
function CityGlow() {
  const positions = useMemo(() => {
    const pos: [number, number, number][] = []
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2
      const r = 30 + Math.random() * 25
      pos.push([Math.cos(angle) * r, -2, -58 + Math.sin(angle) * 20])
    }
    return pos
  }, [])

  return (
    <group>
      {positions.map((p, i) => (
        <pointLight
          key={i}
          color={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#0044FF' : '#FF4400'}
          intensity={0.3}
          position={p}
          distance={8}
        />
      ))}
    </group>
  )
}

export default function Act7({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.76 && scrollProgress < 0.93

  return (
    <group visible={visible}>
      <ambientLight color="#050510" intensity={0.35} />
      {/* Warm fill so the cityscape below reads */}
      <pointLight color="#FFB766" intensity={0.9} position={[0, 20, -58]} distance={65} />

      {/* Vast dark ground plane below */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -2, -58]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#030308" roughness={0.9} />
      </mesh>

      {/* City glow lights */}
      <CityGlow />

      {/* Firework system */}
      <FireworkSystem />

      {/* Firework flash lights */}
      {[
        [-12, 28, -45] as [number,number,number],
        [8, 24, -55] as [number,number,number],
        [-5, 30, -70] as [number,number,number],
      ].map((p, i) => (
        <FlashLight key={i} position={p} offset={i * 1.8} />
      ))}

      {/* Stars more visible from height */}
      <pointLight color="#000022" intensity={0.1} position={[0, 50, -60]} />
    </group>
  )
}

function FlashLight({ position, offset }: { position: [number,number,number]; offset: number }) {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = (clock.getElapsedTime() + offset) % 1.8
      lightRef.current.intensity = t < 0.1 ? 25 : t < 0.2 ? 12 : 0
    }
  })

  return <pointLight ref={lightRef} color="#FFD700" intensity={0} position={position} distance={45} />
}
