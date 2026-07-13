import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface ActProps {
  scrollProgress: number
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

// ── Rose petal rain — Points-based, 2 color groups ──
function RosePetals() {
  const meshPinkRef  = useRef<THREE.Points>(null)
  const meshWhiteRef = useRef<THREE.Points>(null)
  const COUNT = 100

  const { pinkPos, whitePos, pinkVel, whiteVel, pinkRot, whiteRot } = useMemo(() => {
    const pinkPos  = new Float32Array(COUNT * 3)
    const whitePos = new Float32Array(COUNT * 3)
    const pinkVel  = new Float32Array(COUNT * 3)
    const whiteVel = new Float32Array(COUNT * 3)
    const pinkRot  = new Float32Array(COUNT)
    const whiteRot = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pinkPos[i*3]   = (Math.random()-0.5)*10
      pinkPos[i*3+1] = Math.random()*14
      pinkPos[i*3+2] = -2 - Math.random()*44
      pinkVel[i*3]   = (Math.random()-0.5)*0.008
      pinkVel[i*3+1] = -0.014 - Math.random()*0.008
      pinkRot[i]     = Math.random()*Math.PI*2

      whitePos[i*3]   = (Math.random()-0.5)*10
      whitePos[i*3+1] = Math.random()*14
      whitePos[i*3+2] = -2 - Math.random()*44
      whiteVel[i*3]   = (Math.random()-0.5)*0.008
      whiteVel[i*3+1] = -0.012 - Math.random()*0.006
      whiteRot[i]     = Math.random()*Math.PI*2
    }
    return { pinkPos, whitePos, pinkVel, whiteVel, pinkRot, whiteRot }
  }, [])

  useFrame(() => {
    const t = Date.now()*0.001
    for (const [ref, pos, vel, rot] of [
      [meshPinkRef,  pinkPos,  pinkVel,  pinkRot],
      [meshWhiteRef, whitePos, whiteVel, whiteRot],
    ] as [React.RefObject<THREE.Points>, Float32Array, Float32Array, Float32Array][]) {
      if (!ref.current) continue
      const arr = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        arr[i*3]   += vel[i*3] + Math.sin(t*0.9 + rot[i])*0.002
        arr[i*3+1] += vel[i*3+1]
        if (arr[i*3+1] < -1) {
          arr[i*3]   = (Math.random()-0.5)*10
          arr[i*3+1] = 14
          arr[i*3+2] = -2 - Math.random()*44
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <points ref={meshPinkRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={pinkPos} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#FF69B4" size={0.10} transparent opacity={0.80} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={meshWhiteRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={whitePos} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#FFFFFF" size={0.08} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </points>
    </>
  )
}

// ── Floral arches — single InstancedMesh for all 216 flowers ──
function FloralArches() {
  const archZPositions = [0, -6, -12, -18, -24, -30]
  const FLOWERS_PER_ARCH = 36
  const TOTAL = archZPositions.length * FLOWERS_PER_ARCH

  const instancedRef = useRef<THREE.InstancedMesh>(null)
  const flowerColors = useMemo(() => ['#FF69B4','#FFD700','#FFFFFF','#FF1493','#FFB6C1','#FF8C00','#FF4500','#DA70D6'], [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useMemo(() => {
    if (!instancedRef.current) return
    let idx = 0
    for (const z of archZPositions) {
      for (let fi = 0; fi < FLOWERS_PER_ARCH; fi++) {
        const t = (fi / FLOWERS_PER_ARCH) * Math.PI
        const radius = 3.2 + Math.sin(fi * 0.9) * 0.18
        const x = Math.cos(t) * radius
        const y = Math.sin(t) * radius + 2.6
        dummy.position.set(x, y, z)
        dummy.scale.setScalar(0.12 + Math.random() * 0.04)
        dummy.updateMatrix()
        instancedRef.current.setMatrixAt(idx, dummy.matrix)
        const col = new THREE.Color(flowerColors[fi % flowerColors.length])
        instancedRef.current.setColorAt(idx, col)
        idx++
      }
    }
    instancedRef.current.instanceMatrix.needsUpdate = true
    if (instancedRef.current.instanceColor) instancedRef.current.instanceColor.needsUpdate = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pillar structure per arch
  const pillars = useMemo(() => archZPositions.flatMap(z => [
    { x: -3.2, z, cap: true },
    { x:  3.2, z, cap: true },
  ]), [])

  return (
    <group>
      {/* Gold arch tori */}
      {archZPositions.map((z, i) => (
        <group key={i}>
          <mesh position={[0, 2.6, z]}>
            <torusGeometry args={[3.2, 0.15, 12, 52, Math.PI]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} emissive="#D4AF37" emissiveIntensity={0.65} />
          </mesh>
          {/* Per-arch warm glow */}
          <pointLight color="#FFD97A" intensity={1.0} position={[0, 5.8, z]} distance={9} />
          {/* Marigold-orange fill at pillar base */}
          <pointLight color="#FF8C00" intensity={0.4} position={[-3.2, 1.0, z]} distance={5} />
          <pointLight color="#FF8C00" intensity={0.4} position={[ 3.2, 1.0, z]} distance={5} />
        </group>
      ))}

      {/* Marble pillars */}
      {pillars.map((p, i) => (
        <group key={i}>
          <mesh position={[p.x, 2.4, p.z]}>
            <cylinderGeometry args={[0.18, 0.22, 5.2, 12]} />
            <meshStandardMaterial color="#E8E0D0" roughness={0.28} metalness={0.12} />
          </mesh>
          <mesh position={[p.x, 5.15, p.z]}>
            <cylinderGeometry args={[0.27, 0.18, 0.30, 12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} emissive="#D4AF37" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}

      {/* InstancedMesh for all flowers */}
      <instancedMesh ref={instancedRef} args={[undefined, undefined, TOTAL]}>
        <sphereGeometry args={[1, 7, 7]} />
        <meshStandardMaterial roughness={0.65} emissiveIntensity={0.38} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

// ── Side walls with dado rail and sconces ──
function SideWalls() {
  const sconces = useMemo(() => {
    const result: { x: number; z: number; side: 1 | -1 }[] = []
    for (let i = 0; i < 8; i++) {
      const z = -2 - i * 5
      result.push({ x: -12, z, side: -1 })
      result.push({ x:  12, z, side:  1 })
    }
    return result
  }, [])

  return (
    <group>
      {/* Left wall */}
      <mesh position={[-12, 7, -22]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[60, 14]} />
        <meshStandardMaterial color="#2a2218" roughness={0.88} />
      </mesh>
      {/* Right wall */}
      <mesh position={[12, 7, -22]} rotation={[0, -Math.PI/2, 0]}>
        <planeGeometry args={[60, 14]} />
        <meshStandardMaterial color="#2a2218" roughness={0.88} />
      </mesh>
      {/* Dado rails */}
      <mesh position={[-11.96, 2.8, -22]}>
        <boxGeometry args={[0.08, 0.22, 60]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[11.96, 2.8, -22]}>
        <boxGeometry args={[0.08, 0.22, 60]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>

      {/* Sconces */}
      {sconces.map((s, i) => (
        <group key={i} position={[s.x, 4.8, s.z]}>
          {/* Bracket */}
          <mesh position={[s.side * -0.18, 0, 0]}>
            <boxGeometry args={[0.25, 0.08, 0.20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.4} />
          </mesh>
          {/* Flame bulb */}
          <mesh>
            <sphereGeometry args={[0.11, 8, 8]} />
            <meshStandardMaterial color="#FF8C00" emissive="#FF8C00" emissiveIntensity={3.0} roughness={1} />
          </mesh>
          <pointLight color="#FFB766" intensity={0.9} distance={14} />
        </group>
      ))}
    </group>
  )
}

// ── Crystal chandeliers (3, appear after t > 0.5) ──
function Chandelier({ position, visible }: { position: [number,number,number]; visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  const rings = useMemo(() => {
    const pts: { pos: [number,number,number]; r: number; len: number }[] = []
    // Inner ring 10
    for (let i = 0; i < 10; i++) {
      const a = (i/10)*Math.PI*2
      pts.push({ pos: [Math.cos(a)*0.45, -0.35, Math.sin(a)*0.45], r: 0.030, len: 0.38 })
    }
    // Mid ring 18
    for (let i = 0; i < 18; i++) {
      const a = (i/18)*Math.PI*2
      pts.push({ pos: [Math.cos(a)*0.82, -0.55, Math.sin(a)*0.82], r: 0.020, len: 0.50 })
    }
    // Outer ring 26
    for (let i = 0; i < 26; i++) {
      const a = (i/26)*Math.PI*2
      pts.push({ pos: [Math.cos(a)*1.2, -0.75, Math.sin(a)*1.2], r: 0.015, len: 0.62 })
    }
    return pts
  }, [])

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00025
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 1.8, 6]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.12} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <torusGeometry args={[1.22, 0.042, 8, 40]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.6} />
      </mesh>
      {rings.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <cylinderGeometry args={[c.r, c.r*0.35, c.len, 6]} />
          <meshStandardMaterial color="#F0F8FF" transparent opacity={0.85} metalness={1} roughness={0} emissive="#F0F8FF" emissiveIntensity={0.15} />
        </mesh>
      ))}
      <pointLight color="#FFF8E7" intensity={3.5} distance={28} />
      <spotLight color="#FFF0DC" intensity={2.0} distance={22} angle={0.45} penumbra={0.6} />
    </group>
  )
}

// ── 16 candle posts with single useFrame flicker ──
function CandlePosts() {
  const lightRefs = useRef<(THREE.PointLight | null)[]>([])

  const candles = useMemo(() => {
    const result: { pos: [number,number,number] }[] = []
    for (let i = 0; i < 8; i++) {
      const z = -1 - i * 5
      result.push({ pos: [-5.2, 0, z] })
      result.push({ pos: [ 5.2, 0, z] })
    }
    return result
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < lightRefs.current.length; i++) {
      const lr = lightRefs.current[i]
      if (lr) {
        lr.intensity = 0.85 + Math.sin(t*8.5 + i*1.3)*0.15 + Math.sin(t*13 + i*2.1)*0.08
      }
    }
  })

  return (
    <group>
      {candles.map((c, i) => (
        <group key={i} position={c.pos}>
          {/* Post */}
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.055, 0.07, 2.2, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.12} emissive="#D4AF37" emissiveIntensity={0.3} />
          </mesh>
          {/* Holder cup */}
          <mesh position={[0, 2.3, 0]}>
            <cylinderGeometry args={[0.10, 0.07, 0.18, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.4} />
          </mesh>
          {/* Candle */}
          <mesh position={[0, 2.52, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.30, 8]} />
            <meshStandardMaterial color="#FFFDD0" roughness={0.9} />
          </mesh>
          {/* Flame */}
          <mesh position={[0, 2.72, 0]}>
            <sphereGeometry args={[0.052, 6, 6]} />
            <meshStandardMaterial color="#FF8C00" emissive="#FF8C00" emissiveIntensity={3.0} roughness={1} />
          </mesh>
          <pointLight
            ref={el => { lightRefs.current[i] = el }}
            color="#FF8C00"
            intensity={0.9}
            position={[0, 2.72, 0]}
            distance={6}
          />
        </group>
      ))}
    </group>
  )
}

// ── Golden doors with eased open animation ──
function GoldenDoors({ openAmount }: { openAmount: number }) {
  const leftRef  = useRef<THREE.Group>(null)
  const rightRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  const doorMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.95, roughness: 0.10, emissive: '#D4AF37', emissiveIntensity: 0.25 }), [])
  const panelMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8B6914', metalness: 0.82, roughness: 0.22, emissive: '#5a3e00', emissiveIntensity: 0.2 }), [])

  useFrame(() => {
    if (leftRef.current)  leftRef.current.rotation.y  =  openAmount * 0.72
    if (rightRef.current) rightRef.current.rotation.y = -openAmount * 0.72
    if (lightRef.current) lightRef.current.intensity  = openAmount * 8
  })

  return (
    <group position={[0, 0, -36]}>
      {/* Arch torus above frame */}
      <mesh position={[0, 7.5, 0]}>
        <torusGeometry args={[3.8, 0.2, 12, 48, Math.PI]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.55} />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 3.6, -0.04]}>
        <boxGeometry args={[8.6, 8.4, 0.28]} />
        <primitive object={panelMat} />
      </mesh>
      <mesh position={[0, 3.6, 0.06]}>
        <boxGeometry args={[7.6, 7.6, 0.08]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      {/* Left door — pivots at left edge */}
      <group ref={leftRef} position={[-3.8, 0, 0]}>
        <mesh position={[1.9, 3.6, 0]}>
          <boxGeometry args={[3.8, 7.2, 0.22]} />
          <primitive object={doorMat} />
        </mesh>
        {([1.0, 2.4, 3.8, 5.2] as number[]).map((y, i) => (
          <mesh key={i} position={[1.9, y, 0.13]}>
            <boxGeometry args={[2.8, 0.80, 0.04]} />
            <primitive object={panelMat} />
          </mesh>
        ))}
        <mesh position={[3.5, 3.6, 0.18]}>
          <sphereGeometry args={[0.13, 8, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} emissive="#FFD700" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Right door — pivots at right edge */}
      <group ref={rightRef} position={[3.8, 0, 0]}>
        <mesh position={[-1.9, 3.6, 0]}>
          <boxGeometry args={[3.8, 7.2, 0.22]} />
          <primitive object={doorMat} />
        </mesh>
        {([1.0, 2.4, 3.8, 5.2] as number[]).map((y, i) => (
          <mesh key={i} position={[-1.9, y, 0.13]}>
            <boxGeometry args={[2.8, 0.80, 0.04]} />
            <primitive object={panelMat} />
          </mesh>
        ))}
        <mesh position={[-3.5, 3.6, 0.18]}>
          <sphereGeometry args={[0.13, 8, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} emissive="#FFD700" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Light spilling through opening doors */}
      <pointLight ref={lightRef} color="#FFF8DC" intensity={0} position={[0, 4, -5]} distance={55} />
      <pointLight color="#FFD700" intensity={openAmount * 4} position={[0, 7, 2]} distance={28} />
    </group>
  )
}

export default function Act2({ scrollProgress }: ActProps) {
  const visible = scrollProgress >= 0.08 && scrollProgress < 0.30

  const t = Math.max(0, Math.min(1, (scrollProgress - 0.10) / 0.18))
  const doorOpenAmount = easeInOutCubic(Math.max(0, (t - 0.28) / 0.22))
  const chandeliersVisible = t > 0.5

  return (
    <group visible={visible}>
      {/* Lighting */}
      <ambientLight color="#201008" intensity={0.45} />
      <spotLight color="#FFF8DC" intensity={4.5} position={[0, 22, -10]} angle={0.30} penumbra={0.5} castShadow />
      <pointLight color="#FFB766" intensity={1.6} position={[0, 4, 4]} distance={26} />
      <pointLight color="#D4A84C" intensity={0.9} position={[0, 6, -28]} distance={36} />

      {/* Marble floor: white-cream with gold veins */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.5, -18]}>
        <planeGeometry args={[24, 80, 16, 16]} />
        <meshStandardMaterial color="#E8E0D0" metalness={0.55} roughness={0.18} />
      </mesh>
      {/* Gold vein overlay */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.49, -18]}>
        <planeGeometry args={[24, 80]} />
        <meshStandardMaterial color="#D4AF37" transparent opacity={0.08} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Gold border strips */}
      {([-11.9, 11.9] as number[]).map((x, i) => (
        <mesh key={i} position={[x, -0.44, -18]}>
          <boxGeometry args={[0.1, 0.07, 80]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.8} />
        </mesh>
      ))}

      <SideWalls />
      <FloralArches />
      <CandlePosts />
      <RosePetals />

      {/* Chandeliers appear at t>0.5 */}
      <Chandelier position={[0, 11, -44]} visible={chandeliersVisible} />
      <Chandelier position={[0, 11, -54]} visible={chandeliersVisible} />
      <Chandelier position={[0, 11, -64]} visible={chandeliersVisible} />

      <GoldenDoors openAmount={doorOpenAmount} />

      {/* Gold dust sparkles */}
      <Sparkles count={400} scale={[22, 8, 44]} position={[0, 3, -18]} size={1.8} speed={0.35} color="#FFD700" opacity={0.75} />
      {/* Near-door sparkles */}
      <Sparkles count={120} scale={[8, 6, 6]} position={[0, 4, -34]} size={2.2} speed={0.6} color="#FFD700" opacity={0.9} />
    </group>
  )
}
