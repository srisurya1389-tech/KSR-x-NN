import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

function GoldRain() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 500

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i*3] = (Math.random() - 0.5) * 40
      positions[i*3+1] = Math.random() * 35 + 5
      positions[i*3+2] = -45 - Math.random() * 25
      speeds[i] = 0.06 + Math.random() * 0.1
    }
    return { positions, speeds }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i*3+1] -= speeds[i]
      pos[i*3] += Math.sin(Date.now() * 0.001 + i) * 0.003
      if (pos[i*3+1] < -5) {
        pos[i*3+1] = 35
        pos[i*3] = (Math.random() - 0.5) * 40
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FFD700" size={0.1} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function GrandBurst({ triggered }: { triggered: boolean }) {
  const meshRef = useRef<THREE.Points>(null)
  const count = 600
  const hasTriggered = useRef(false)
  const timeRef = useRef(0)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3).fill(0)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 0.08 + Math.random() * 0.18
      velocities[i*3] = Math.sin(phi)*Math.cos(theta)*speed
      velocities[i*3+1] = Math.abs(Math.sin(phi)*Math.sin(theta)*speed) + 0.04
      velocities[i*3+2] = Math.cos(phi)*speed
    }
    return { positions, velocities }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    if (triggered && !hasTriggered.current) {
      hasTriggered.current = true
      timeRef.current = 0
    }
    if (hasTriggered.current && timeRef.current < 4) {
      timeRef.current += delta
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        pos[i*3] += velocities[i*3] * 0.7
        pos[i*3+1] += velocities[i*3+1] * 0.7 - 0.003
        pos[i*3+2] += velocities[i*3+2] * 0.7
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
      const mat = meshRef.current.material as THREE.PointsMaterial
      mat.opacity = Math.max(0, 1 - timeRef.current / 4)
    }
  })

  return (
    <points ref={meshRef} position={[0, 8, -58]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FFD700" size={0.15} transparent opacity={0} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Act8({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.87
  const finalProgress = Math.max(0, Math.min(1, (scrollProgress - 0.90) / 0.06))
  const triggered = scrollProgress > 0.93
  const logoScale = 0.7 + finalProgress * 0.3

  const orbitGroupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = clock.getElapsedTime() * 0.35
    }
  })

  return (
    <group visible={visible}>
      <ambientLight color="#1a0800" intensity={0.2} />
      <spotLight color="#FFD700" intensity={finalProgress * 6} position={[0, 22, -45]} angle={0.2} penumbra={0.4} />
      <pointLight color="#FFD700" intensity={finalProgress * 4} position={[-8, 8, -55]} distance={20} />
      <pointLight color="#FF8C00" intensity={finalProgress * 3} position={[8, 8, -55]} distance={20} />
      <pointLight color="#FFF8DC" intensity={finalProgress * 2} position={[0, 12, -62]} distance={18} />

      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.5, -58]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#080808" metalness={0.6} roughness={0.1} />
      </mesh>

      <group scale={[logoScale, logoScale, logoScale]}>
        <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.5}>
          <Text position={[0, 7, -58]} fontSize={3.5} color="#C9A84C" anchorX="center" anchorY="middle">
            KSR
          </Text>
        </Float>
        <Text position={[0, 3.8, -58]} fontSize={0.55} color="#E8D5A3" anchorX="center" anchorY="middle" letterSpacing={0.15}>
          GRAND EVENTS & CATERING
        </Text>
        <mesh position={[0, 3.2, -58]}>
          <boxGeometry args={[6, 0.015, 0.02]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={1} metalness={1} roughness={0} />
        </mesh>
      </group>

      <pointLight color="#FFD700" intensity={finalProgress * 3} position={[-1, 7, -61]} distance={15} />
      <pointLight color="#FFD700" intensity={finalProgress * 3} position={[1, 7, -61]} distance={15} />

      {/* Event Solar System */}
      <group position={[0, 7, -58]}>
        {/* Central golden wireframe sphere framing KSR text */}
        <mesh>
          <sphereGeometry args={[2.5, 24, 24]} />
          <meshStandardMaterial color="#C9A84C" wireframe metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.3 * finalProgress} />
        </mesh>

        {/* Orbiting event spheres */}
        <group ref={orbitGroupRef}>
          {[
            { label: 'WEDDINGS 💍', color: '#FFD700', angleOffset: 0 },
            { label: 'CATERING 🍛', color: '#FF7733', angleOffset: (2 * Math.PI) / 5 },
            { label: 'BIRTHDAYS 🎉', color: '#FF69B4', angleOffset: (4 * Math.PI) / 5 },
            { label: 'CORPORATE 🏢', color: '#5BBFFF', angleOffset: (6 * Math.PI) / 5 },
            { label: 'DÉCOR 🌸', color: '#DA70D6', angleOffset: (8 * Math.PI) / 5 }
          ].map((evt, idx) => {
            const angle = evt.angleOffset
            const radius = 4.2
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            return (
              <group key={idx} position={[x, 0.3 * Math.sin(idx + angle), z]}>
                <mesh>
                  <sphereGeometry args={[0.32, 16, 16]} />
                  <meshStandardMaterial color={evt.color} metalness={0.9} roughness={0.1} emissive={evt.color} emissiveIntensity={0.6 * finalProgress} />
                </mesh>
                <Text position={[0, 0.55, 0]} fontSize={0.24} color="#E8D5A3" anchorX="center" font="https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2">
                  {evt.label}
                </Text>
              </group>
            )
          })}
        </group>
      </group>

      <GoldRain />
      <GrandBurst triggered={triggered} />

      <Sparkles count={400} scale={[20, 15, 12]} position={[0, 5, -58]} size={2} speed={0.3} color="#FFD700" opacity={0.8} />
      <Sparkles count={200} scale={[35, 20, 25]} position={[0, 4, -55]} size={1.2} speed={0.15} color="#C9A84C" opacity={0.5} />
    </group>
  )
}
