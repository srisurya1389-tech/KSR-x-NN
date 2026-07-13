import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

function SweepingSpotlight({ index, color }: { index: number; color: string }) {
  const lightRef = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<THREE.Object3D>(null)

  useFrame(({ clock }) => {
    if (lightRef.current && targetRef.current) {
      const t = clock.getElapsedTime()
      targetRef.current.position.x = Math.sin(t * 0.4 + index * Math.PI / 3) * 12
      targetRef.current.position.y = 0
      targetRef.current.position.z = -80
      lightRef.current.target = targetRef.current
    }
  })

  return (
    <group>
      <spotLight
        ref={lightRef}
        color={color}
        intensity={2.5}
        position={[(-2 + index) * 5, 14, -60]}
        angle={0.15}
        penumbra={0.3}
        distance={35}
      />
      <object3D ref={targetRef} position={[0, 0, -80]} />
    </group>
  )
}

function ServicePillar({ position, label, pillarRise }: {
  position: [number, number, number]; label: string; pillarRise: number
}) {
  const yPos = position[1] - 5 + pillarRise * 5

  return (
    <group position={[position[0], yPos, position[2]]}>
      {/* Pillar */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.38, 3.8, 8]} />
        <meshStandardMaterial
          color="#C9A84C" metalness={0.92} roughness={0.08}
          emissive="#C9A84C" emissiveIntensity={0.25}
        />
      </mesh>
      {/* Platform top */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1.6, 0.12, 1.6]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.3} />
      </mesh>
      {/* Gold glow ring at base */}
      <mesh position={[0, -1.9, 0]}>
        <torusGeometry args={[0.5, 0.03, 8, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} metalness={1} roughness={0} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.32}
        color="#E8D5A3"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2"
      >
        {label}
      </Text>
      {/* Floating particles around pillar */}
      <pointLight color="#FFD700" intensity={pillarRise * 1.5} distance={4} />
    </group>
  )
}

export default function Act6({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.62 && scrollProgress < 0.82
  const pillarRise = Math.max(0, Math.min(1, (scrollProgress - 0.65) / 0.09))

  const services = useMemo(() => [
    { label: 'EVENTS', x: -8 },
    { label: 'CATERING', x: -4 },
    { label: 'ENTERTAIN', x: 0 },
    { label: 'CRAFTS', x: 4 },
    { label: 'RENTALS', x: 8 },
  ], [])

  const spotColors = ['#FFD700', '#FFD700', '#FFFFFF', '#FFD700', '#FF8C00', '#FFD700']

  return (
    <group visible={visible}>
      <ambientLight color="#0a0500" intensity={0.2} />

      {/* Stage platform */}
      <mesh position={[0, -0.25, -78]} receiveShadow castShadow>
        <boxGeometry args={[22, 0.5, 13]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Stage floor reflective surface */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, -78]}>
        <planeGeometry args={[21, 12]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.05} />
      </mesh>

      {/* Gold front edge LED strip */}
      <mesh position={[0, 0.2, -72]}>
        <boxGeometry args={[22, 0.08, 0.06]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} />
      </mesh>

      {/* Stage steps */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0, -0.5 + i * 0.18, -71.5 + i * 0.35]}>
          <boxGeometry args={[22, 0.18, 0.4]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}

      {/* Stage backdrop */}
      <mesh position={[0, 5, -86]}>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial color="#060606" roughness={0.95} />
      </mesh>

      {/* KSR backdrop text glow */}
      <Text position={[0, 6, -85.5]} fontSize={2.5} color="#C9A84C"
        anchorX="center" anchorY="middle"
        font="https://fonts.gstatic.com/s/cormorantgaramond/v22/BXRovF3Pi-DLmxcpJB8a0GRGRj5_PBFxW_R-rPSp3Cs.woff2"
      >
        KSR
      </Text>

      {/* Velvet curtains */}
      <mesh position={[-11, 5, -84]}>
        <planeGeometry args={[5, 12]} />
        <meshStandardMaterial color="#4a0000" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[11, 5, -84]}>
        <planeGeometry args={[5, 12]} />
        <meshStandardMaterial color="#4a0000" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* Lighting rigs */}
      {[-1, 0, 1].map(i => (
        <mesh key={i} position={[0, 12, -72 - i * 4]}>
          <boxGeometry args={[20, 0.1, 0.1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}

      {/* Moving spotlights */}
      {spotColors.map((color, i) => (
        <SweepingSpotlight key={i} index={i} color={color} />
      ))}

      {/* Service pillars that rise on scroll */}
      {services.map((s, i) => (
        <ServicePillar
          key={i}
          position={[s.x, 0, -78]}
          label={s.label}
          pillarRise={pillarRise}
        />
      ))}

      {/* Gold stage particles */}
      <Sparkles count={200} scale={[18, 6, 10]} position={[0, 2, -78]} size={1.5} speed={0.4} color="#FFD700" opacity={0.6} />

      {/* Stage wash lights */}
      <spotLight color="#FFF8E7" intensity={2} position={[-8, 12, -60]} angle={0.4} penumbra={0.5} target-position={[0, 0, -78]} />
      <spotLight color="#FFF8E7" intensity={2} position={[8, 12, -60]} angle={0.4} penumbra={0.5} target-position={[0, 0, -78]} />
      <pointLight color="#C9A84C" intensity={2} position={[0, 8, -82]} distance={25} />
    </group>
  )
}
