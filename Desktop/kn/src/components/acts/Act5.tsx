import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

function ChefFigure({ position, stationType }: {
  position: [number, number, number]; stationType: number
}) {
  const armRef  = useRef<THREE.Mesh>(null)
  const arm2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (armRef.current) {
      if (stationType === 0) armRef.current.rotation.z = Math.sin(t * 2.5) * 0.4
      if (stationType === 1) armRef.current.rotation.x = Math.sin(t * 4) * 0.5
      if (stationType === 2) armRef.current.rotation.z = Math.sin(t * 1.5) * 0.2
      if (stationType === 3) armRef.current.rotation.x = -0.4 + Math.sin(t) * 0.1
    }
    if (arm2Ref.current) arm2Ref.current.rotation.z = -Math.sin(t * 2 + 0.5) * 0.3
  })

  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.19, 0.21, 1.55, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.85, 0.2]}>
        <planeGeometry args={[0.35, 1.2]} />
        <meshStandardMaterial color="#E8D5A3" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.82, 0]}>
        <sphereGeometry args={[0.19, 12, 12]} />
        <meshStandardMaterial color="#D4A574" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.14, 0.17, 0.38, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.98, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      <mesh ref={armRef} position={[-0.28, 1.15, 0.15]}>
        <cylinderGeometry args={[0.055, 0.055, 0.72, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      <mesh ref={arm2Ref} position={[0.28, 1.1, 0.1]}>
        <cylinderGeometry args={[0.055, 0.055, 0.72, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
    </group>
  )
}

function CookingStation({ position, type }: {
  position: [number, number, number]; type: number
}) {
  const flameRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (flameRef.current) {
      // Stronger flicker at 8 Hz, base intensity 3.5
      flameRef.current.intensity = 3.5 + Math.sin(clock.getElapsedTime() * 8) * 1.5
    }
  })

  return (
    <group position={position}>
      {/* Counter body — metalness 0.65, roughness 0.28 */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.2, 1, 1.6]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.65} roughness={0.28} />
      </mesh>
      {/* Counter top */}
      <mesh position={[0, 1.02, 0]}>
        <boxGeometry args={[3.22, 0.05, 1.62]} />
        <meshStandardMaterial color="#222222" metalness={0.72} roughness={0.18} />
      </mesh>
      {/* Gold trim sides */}
      {([-1.62, 1.62] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]}>
          <boxGeometry args={[0.05, 1.02, 1.62]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Station-specific equipment */}
      {type === 0 && (
        <group position={[0, 1.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.6, 0.9, 16]} />
            <meshStandardMaterial color="#8B4513" roughness={0.85} emissive="#3a1500" emissiveIntensity={0.4} />
          </mesh>
          <pointLight ref={flameRef} color="#FF4500" intensity={3.5} position={[0, 0.8, 0]} distance={9} />
          <Sparkles count={25} scale={[0.9, 1.2, 0.9]} position={[0, 0.9, 0]} size={2.2} speed={2.5} color="#FF4500" />
          {/* White steam */}
          <Sparkles count={15} scale={[0.6, 0.8, 0.6]} position={[0, 1.8, 0]} size={0.5} speed={0.3} color="#FFFFFF" opacity={0.4} />
        </group>
      )}

      {type === 1 && (
        <group position={[0, 1.15, 0]}>
          <mesh>
            <sphereGeometry args={[0.55, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.18} side={THREE.BackSide} />
          </mesh>
          <pointLight ref={flameRef} color="#FF6600" intensity={3.5} position={[0, -0.3, 0]} distance={8} />
          <Sparkles count={18} scale={[0.7, 0.9, 0.7]} position={[0, 0.25, 0]} size={1.8} speed={3.2} color="#FF6600" />
          {/* White steam */}
          <Sparkles count={15} scale={[0.7, 0.9, 0.7]} position={[0, 1.6, 0]} size={0.5} speed={0.3} color="#FFFFFF" opacity={0.4} />
        </group>
      )}

      {type === 2 && (
        <group position={[0, 1.15, 0]}>
          {([[-0.7, 0, 0], [-0.2, 0, 0], [0.3, 0, 0], [0.8, 0, 0]] as [number,number,number][]).map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.18, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={(['#8B4513', '#FF69B4', '#FFFDD0', '#D4AF37'] as string[])[i]} roughness={0.6} />
            </mesh>
          ))}
          {/* Gentle steam over desserts */}
          <Sparkles count={15} scale={[1.2, 0.6, 0.8]} position={[0.05, 0.9, 0]} size={0.5} speed={0.3} color="#FFFFFF" opacity={0.35} />
          <pointLight ref={flameRef} color="#FF8C00" intensity={3.5} position={[0, 0.6, 0]} distance={6} />
        </group>
      )}

      {type === 3 && (
        <group position={[0, 1.15, 0]}>
          {([-0.6, 0, 0.6] as number[]).map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.12, 0.12, 0.9, 12]} />
                <meshStandardMaterial color="#E8F4FF" transparent opacity={0.4} metalness={0.9} roughness={0} />
              </mesh>
              <mesh>
                <cylinderGeometry args={[0.1, 0.1, 0.7, 12]} />
                <meshStandardMaterial color={(['#FF6B35', '#FFD700', '#00CED1'] as string[])[i]} transparent opacity={0.82} />
              </mesh>
            </group>
          ))}
          {/* Cool mist */}
          <Sparkles count={15} scale={[1.4, 0.5, 0.8]} position={[0, 1.1, 0]} size={0.5} speed={0.3} color="#B0EEFF" opacity={0.35} />
          <pointLight ref={flameRef} color="#00BFFF" intensity={1.5} position={[0, 1, 0]} distance={5} />
        </group>
      )}

      {/* Overhead warm spotlight per station */}
      <pointLight color="#FF9B44" intensity={2.0} position={[0, 3.2, 0]} distance={7} />
      <spotLight color="#FFF3E0" intensity={1.8} position={[0, 5.5, 0.6]} angle={0.45} penumbra={0.4} />

      <ChefFigure position={[0, 0, -1.4]} stationType={type} />
    </group>
  )
}

export default function Act5({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.49 && scrollProgress < 0.68

  return (
    <group visible={visible}>
      <ambientLight color="#1a0800" intensity={0.40} />
      <spotLight color="#FFF0DC" intensity={2.5} position={[0, 18, -44]} angle={0.55} penumbra={0.5} />
      <pointLight color="#FFB766" intensity={1.2} position={[0, 4, -44]} distance={22} />

      {/* Dark floor with metalness */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -44]}>
        <planeGeometry args={[32, 26]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.52} roughness={0.28} />
      </mesh>

      <CookingStation position={[-6.5, 0, -44]} type={0} />
      <CookingStation position={[-1.5, 0, -44]} type={1} />
      <CookingStation position={[ 3.5, 0, -44]} type={2} />
      <CookingStation position={[ 8.5, 0, -44]} type={3} />

      {/* Overhead track rail */}
      <mesh position={[0, 6.2, -44]}>
        <boxGeometry args={[20, 0.08, 0.08]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {([-7, -2, 3, 8] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 5.7, -44]}>
          <cylinderGeometry args={[0.1, 0.08, 0.3, 6]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.45} />
        </mesh>
      ))}

      <pointLight color="#FF4500" intensity={2.0} position={[-6.5, 3, -44]} distance={14} />
      <pointLight color="#FF6600" intensity={1.6} position={[-1.5, 3, -44]} distance={12} />
    </group>
  )
}
