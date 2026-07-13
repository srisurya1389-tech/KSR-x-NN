import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

// Crystal chandelier — rebuilt per spec:
// 12 inner crystals r=0.035 at radius 0.5, 12 outer r=0.030 at radius 0.9
// PointLight intensity 2.5 at centre
function Chandelier({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00035
  })

  const rings = useMemo(() => {
    const pts: { pos: [number, number, number]; r: number; len: number }[] = []
    // Inner ring — 12 crystals
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      pts.push({ pos: [Math.cos(a) * 0.5, -0.38, Math.sin(a) * 0.5], r: 0.035, len: 0.40 })
    }
    // Outer ring — 12 crystals
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      pts.push({ pos: [Math.cos(a) * 0.9, -0.58, Math.sin(a) * 0.9], r: 0.030, len: 0.52 })
    }
    return pts
  }, [])

  return (
    <group position={position} ref={groupRef}>
      {/* Gold sphere body */}
      <mesh>
        <sphereGeometry args={[0.30, 16, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.9} />
      </mesh>

      {/* Suspension chain */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.026, 0.026, 2.0, 6]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.12} />
      </mesh>

      {/* Outer decorative disc rim */}
      <mesh position={[0, -0.22, 0]}>
        <torusGeometry args={[0.96, 0.045, 8, 40]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.6} />
      </mesh>

      {/* Crystal drops */}
      {rings.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <cylinderGeometry args={[c.r, c.r * 0.35, c.len, 6]} />
          <meshStandardMaterial
            color="#F0F8FF"
            transparent
            opacity={0.85}
            metalness={1}
            roughness={0}
            emissive="#F0F8FF"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Central warm light that illuminates the room */}
      <pointLight color="#FFF8E7" intensity={2.5} distance={24} />
      <spotLight
        color="#FFF0DC"
        intensity={1.6}
        distance={20}
        angle={0.45}
        penumbra={0.6}
      />
    </group>
  )
}

function DiningTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Table cloth */}
      <mesh>
        <cylinderGeometry args={[2.85, 2.85, 0.35, 32]} />
        <meshStandardMaterial color="#F5F0E8" roughness={0.95} />
      </mesh>
      {/* Table top */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.1, 32]} />
        <meshStandardMaterial color="#FAFAF8" roughness={0.42} metalness={0.14} />
      </mesh>
      {/* Gold rim */}
      <mesh position={[0, 0.21, 0]}>
        <torusGeometry args={[2.55, 0.045, 8, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} emissive="#D4AF37" emissiveIntensity={0.55} />
      </mesh>
      {/* Base column */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.13, 0.32, 1.3, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.12} emissive="#D4AF37" emissiveIntensity={0.35} />
      </mesh>

      {/* Plates */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 1.8, 0.23, Math.sin(a) * 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.32, 32]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.12} />
          </mesh>
        )
      })}

      {/* Centrepiece vase */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.72, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.55} />
      </mesh>
      {/* Rose buds */}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2
        const r = i === 0 ? 0 : 0.16
        return (
          <mesh key={i} position={[Math.cos(a) * r, 1.12, Math.sin(a) * r]} scale={0.1}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#CC0000' : '#FF69B4'}
              roughness={0.8}
              emissive={i % 2 === 0 ? '#440000' : '#441122'}
              emissiveIntensity={0.35}
            />
          </mesh>
        )
      })}

      {/* Table candles */}
      {([[-0.5, 0, 0.5], [0.5, 0, 0.5], [0, 0, -0.6]] as [number, number, number][]).map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.037, 0.037, 0.46, 8]} />
            <meshStandardMaterial color="#FFFDD0" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <sphereGeometry args={[0.056, 6, 6]} />
            <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.8} roughness={1} />
          </mesh>
          <pointLight color="#FF8C00" intensity={0.75} position={[0, 0.66, 0]} distance={5} />
        </group>
      ))}
    </group>
  )
}

export default function Act3({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.22 && scrollProgress < 0.42

  const tablePositions: [number, number, number][] = [
    [-7, -0.4, -46], [7, -0.4, -46],
    [-7, -0.4, -53], [7, -0.4, -53],
    [-7, -0.4, -60], [7, -0.4, -60],
    [-7, -0.4, -67], [7, -0.4, -67],
  ]

  const chandelierPositions: [number, number, number][] = [
    [0, 10.5, -44],
    [0, 10.5, -51],
    [0, 10.5, -58],
    [0, 10.5, -65],
    [0, 10.5, -72],
  ]

  return (
    <group visible={visible}>
      {/* Warm dark amber ambience */}
      <ambientLight color="#201005" intensity={0.40} />
      {/* Key spotlight sweeping over the banquet hall */}
      <spotLight color="#FFF8DC" intensity={2.8} position={[0, 18, -55]} angle={0.75} penumbra={0.5} />
      {/* Warm fill from mid-hall */}
      <pointLight color="#FFB766" intensity={1.2} position={[0, 4, -50]} distance={28} />
      {/* Back fill so far tables aren't black */}
      <pointLight color="#C4943A" intensity={0.7} position={[0, 6, -68]} distance={20} />

      {/* Reflective marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -57]}>
        <planeGeometry args={[40, 80]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.78} roughness={0.04} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, -57]}>
        <planeGeometry args={[40, 80]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      {/* Side walls */}
      <mesh position={[-18, 6, -57]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[80, 14]} />
        <meshStandardMaterial color="#0e0b08" roughness={0.92} />
      </mesh>
      <mesh position={[18, 6, -57]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[80, 14]} />
        <meshStandardMaterial color="#0e0b08" roughness={0.92} />
      </mesh>

      {/* Wall sconces — brighter with visible bulb meshes */}
      {([-14, -7, 0, 7, 14] as number[]).map((z, i) => (
        <group key={i}>
          {([-17.4, 17.4] as number[]).map((x, j) => (
            <group key={j}>
              <pointLight color="#FFB766" intensity={1.3} position={[x, 5.2, z - 55]} distance={14} />
              <mesh position={[x, 5.2, z - 55]}>
                <sphereGeometry args={[0.13, 8, 8]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.8} />
              </mesh>
              {/* Sconce bracket */}
              <mesh position={[x > 0 ? x - 0.22 : x + 0.22, 5.0, z - 55]}>
                <boxGeometry args={[0.18, 0.08, 0.25]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Red aisle runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, -57]}>
        <planeGeometry args={[3.5, 80]} />
        <meshStandardMaterial color="#6b0000" roughness={0.88} />
      </mesh>

      {/* Chandeliers */}
      {chandelierPositions.map((pos, i) => (
        <Chandelier key={i} position={pos} />
      ))}

      {/* Dining tables */}
      {tablePositions.map((pos, i) => (
        <DiningTable key={i} position={pos} />
      ))}

      {/* Tall flower columns flanking aisle */}
      {([-49, -56, -63] as number[]).map((z, i) => (
        <group key={i}>
          {([-11, 11] as number[]).map((x, j) => (
            <group key={j} position={[x, 0, z]}>
              <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.07, 0.1, 2.9, 8]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.45} />
              </mesh>
              {Array.from({ length: 8 }).map((_, k) => (
                <mesh key={k} position={[Math.cos(k / 8 * Math.PI * 2) * 0.28, 3.15, Math.sin(k / 8 * Math.PI * 2) * 0.28]}>
                  <sphereGeometry args={[0.13, 6, 6]} />
                  <meshStandardMaterial
                    color={k % 2 === 0 ? '#FFFFFF' : '#D4AF37'}
                    emissive={k % 2 === 0 ? '#FFFFFF' : '#D4AF37'}
                    emissiveIntensity={0.28}
                    roughness={0.7}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}
