import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

// Palette: gold, deep-red, emerald, cream — cycle by index
const BOX_COLORS = ['#D4AF37', '#8B1538', '#1a3a2e', '#F5F0E8']

function HumanFigure({ position, scale = 1, color = '#1a1a2e', swayOffset = 0 }: {
  position: [number, number, number]; scale?: number; color?: string; swayOffset?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5 + swayOffset) * 0.05
  })
  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 1.6, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#D4A574" roughness={0.9} />
      </mesh>
      <mesh position={[-0.3, 1.1, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.06, 0.06, 0.75, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 1.1, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.06, 0.06, 0.75, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  )
}

function GiftBox({ position, size = [0.5, 0.5, 0.5] as [number,number,number], colorIdx = 0 }: {
  position: [number, number, number]
  size?: [number, number, number]
  colorIdx?: number
}) {
  const color = BOX_COLORS[colorIdx % BOX_COLORS.length]
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.28} metalness={0.12} />
      </mesh>
      {/* Gold ribbon — horizontal */}
      <mesh position={[0, size[1] * 0.5 + 0.01, 0]}>
        <boxGeometry args={[size[0] + 0.02, 0.05, 0.07]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.08} emissive="#D4AF37" emissiveIntensity={0.65} />
      </mesh>
      {/* Gold ribbon — vertical */}
      <mesh position={[0, size[1] * 0.5 + 0.01, 0]}>
        <boxGeometry args={[0.07, 0.05, size[2] + 0.02]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.08} emissive="#D4AF37" emissiveIntensity={0.65} />
      </mesh>
      {/* Bow knot */}
      <mesh position={[0, size[1] * 0.5 + 0.06, 0]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} emissive="#D4AF37" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

export default function Act4({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.35 && scrollProgress < 0.55

  return (
    <group visible={visible}>
      {/* Warm ambience */}
      <ambientLight color="#201005" intensity={0.45} />
      {/* Scene-wide key spotlight */}
      <spotLight color="#FFF8DC" intensity={3.0} position={[0, 20, -28]} angle={0.62} penumbra={0.5} />
      {/* Warm fill */}
      <pointLight color="#FFB766" intensity={1.2} position={[0, 5, -28]} distance={26} />

      {/* === FACE PAINTING BOOTH — left === */}
      <group position={[-9, 0, -28]}>
        {/* Booth structure */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[3.5, 2.8, 2]} />
          <meshStandardMaterial color="#2a0808" roughness={0.8} />
        </mesh>
        {/* Red canopy */}
        <mesh position={[0, 2.82, 0.2]}>
          <boxGeometry args={[4, 0.15, 2.5]} />
          <meshStandardMaterial color="#CC0000" roughness={0.7} emissive="#440000" emissiveIntensity={0.3} />
        </mesh>
        {/* Gold canopy stripes */}
        {([-0.8, 0, 0.8] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 2.88, 0.2]}>
            <boxGeometry args={[0.22, 0.18, 2.5]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
          </mesh>
        ))}
        {/* Sign */}
        <mesh position={[0, 3.22, 1.07]}>
          <boxGeometry args={[2.5, 0.52, 0.05]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.55} />
        </mesh>

        <HumanFigure position={[-0.5, 0, 0]} color="#FFFFFF" swayOffset={0} />
        <HumanFigure position={[0.7, 0, 0.3]} scale={0.65} color="#FF69B4" swayOffset={1} />

        {/* Paint palette */}
        <mesh position={[-0.8, 1.7, 0.6]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 12]} />
          <meshStandardMaterial color="#8B6914" roughness={0.6} />
        </mesh>
        {(['#FF0000', '#00FF00', '#0000FF', '#FFD700', '#FF69B4'] as string[]).map((c, i) => (
          <mesh key={i} position={[-0.8 + Math.cos(i / 5 * Math.PI * 2) * 0.2, 1.74, 0.6 + Math.sin(i / 5 * Math.PI * 2) * 0.2]}>
            <sphereGeometry args={[0.045, 6, 6]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.6} />
          </mesh>
        ))}

        <pointLight color="#FFF8DC" intensity={2.0} position={[0, 3.2, 1.1]} distance={7} />
      </group>

      {/* === RETURN GIFTS DISPLAY — right === */}
      <group position={[9, 0, -28]}>
        {/* Display table */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[5, 0.9, 1.8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.62} roughness={0.28} />
        </mesh>
        {/* Gold display cloth */}
        <mesh position={[0, 0.92, 0]}>
          <boxGeometry args={[5.12, 0.06, 1.92]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.15} emissive="#D4AF37" emissiveIntensity={0.55} />
        </mesh>

        {/* Gift boxes — 4-color palette via colorIdx */}
        <GiftBox position={[-1.8, 1.22, 0]}   size={[0.60, 0.55, 0.60]} colorIdx={0} />
        <GiftBox position={[-0.9, 1.38, 0.1]}  size={[0.55, 0.70, 0.55]} colorIdx={1} />
        <GiftBox position={[0,    1.22, -0.1]} size={[0.65, 0.55, 0.65]} colorIdx={2} />
        <GiftBox position={[0.9,  1.48, 0]}   size={[0.50, 0.80, 0.50]} colorIdx={3} />
        <GiftBox position={[1.8,  1.22, 0.1]}  size={[0.60, 0.55, 0.60]} colorIdx={0} />
        <GiftBox position={[-1.4, 1.82, 0]}   size={[0.40, 0.40, 0.40]} colorIdx={1} />
        <GiftBox position={[0.5,  1.68, 0]}   size={[0.45, 0.36, 0.45]} colorIdx={2} />

        {/* Spotlights per box cluster — intensity 1.5 */}
        {([-1.8, -0.9, 0, 0.9, 1.8] as number[]).map((x, i) => (
          <spotLight
            key={i}
            color="#FFE9C4"
            intensity={1.5}
            position={[x, 4.2, 0]}
            angle={0.30}
            penumbra={0.5}
          />
        ))}

        <pointLight color="#FFF8DC" intensity={2.2} position={[0, 3.2, 0.6]} distance={7} />
      </group>

      {/* === GUEST FIGURES === */}
      {([
        { p: [-4, 0, -30] as [number,number,number], c: '#1a1a2e', o: 0 },
        { p: [-2, 0, -33] as [number,number,number], c: '#2e1a1a', o: 1 },
        { p: [ 2, 0, -32] as [number,number,number], c: '#1a2e1a', o: 2 },
        { p: [ 5, 0, -30] as [number,number,number], c: '#2e2e1a', o: 3 },
        { p: [-6, 0, -35] as [number,number,number], c: '#1a1a2e', o: 4 },
        { p: [ 4, 0, -36] as [number,number,number], c: '#1a2e2e', o: 5 },
      ]).map((f, i) => (
        <HumanFigure key={i} position={f.p} color={f.c} swayOffset={f.o} />
      ))}

      {/* === CHILDREN === */}
      {([
        [-8.5, 0, -26] as [number,number,number],
        [-7,   0, -27] as [number,number,number],
        [-9,   0, -29] as [number,number,number],
      ]).map((p, i) => (
        <HumanFigure key={i} position={p} scale={0.62} color={(['#FF69B4', '#FFD700', '#00CED1'] as string[])[i]} swayOffset={i * 2} />
      ))}

      {/* Ceiling shimmer */}
      {Array.from({ length: 8 }).map((_, i) => (
        <pointLight key={i} color="#C9A84C" intensity={0.5}
          position={[(i % 4 - 1.5) * 8, 8, -25 - Math.floor(i / 4) * 8]} distance={12} />
      ))}
    </group>
  )
}
