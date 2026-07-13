import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

// Drifting gold orbs flying toward camera
function FlyingOrbs() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 200

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = Math.random() * 4
      positions[i * 3 + 2] = Math.random() * 60
      velocities[i] = 0.04 + Math.random() * 0.06
    }
    return { positions, velocities }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += velocities[i]
      if (pos[i * 3 + 2] > 65) {
        pos[i * 3 + 2] = 0
        pos[i * 3] = (Math.random() - 0.5) * 6
        pos[i * 3 + 1] = Math.random() * 4
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FFD700" size={0.06} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Act1({ scrollProgress }: ActProps) {
  const visible = scrollProgress < 0.18

  return (
    <group visible={visible}>
      <ambientLight color="#0d0805" intensity={0.25} />

      {/* Central golden beacon — intensifies as we scroll in */}
      <pointLight color="#FFD700" intensity={scrollProgress * 35 + 4} position={[0, 5, -8]} distance={90} />
      <pointLight color="#FF8C00" intensity={3}  position={[0, 2, -5]} distance={50} />

      {/* Side celebration accent lights — pink + violet */}
      <pointLight color="#FF69B4" intensity={1.4} position={[-12, 6, 15]} distance={40} />
      <pointLight color="#9B59FF" intensity={1.2} position={[ 12, 6, 15]} distance={40} />

      {/* Emerald pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -15]}>
        <planeGeometry args={[8, 80]} />
        <meshStandardMaterial color="#0D2818" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* Subtle floor glow strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 10]}>
        <planeGeometry args={[3, 40]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.18}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric fog plane */}
      <mesh position={[0, 2, 20]}>
        <planeGeometry args={[60, 10]} />
        <meshStandardMaterial color="#050505" transparent opacity={0.55} depthWrite={false} />
      </mesh>

      {/* Flying gold orbs */}
      <FlyingOrbs />
    </group>
  )
}
