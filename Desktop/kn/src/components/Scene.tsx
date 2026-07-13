import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import Act1 from './acts/Act1'
import Act2 from './acts/Act2'
import Act3 from './acts/Act3'
import Act4 from './acts/Act4'
import Act5 from './acts/Act5'
import Act6 from './acts/Act6'
import Act7 from './acts/Act7'
import Act8 from './acts/Act8'

interface SceneProps {
  scrollProgress: number
}

// Camera controller with smooth cinematic movement
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const posTarget = useRef(new THREE.Vector3(0, 2, 60))
  const lookTarget = useRef(new THREE.Vector3(0, 2, 30))

  const acts = useMemo(() => [
    { start: 0.00, end: 0.12, fromP: [0,3,62], toP: [0,2,42], fromL: [0,2,50], toL: [0,2,30] },
    { start: 0.12, end: 0.25, fromP: [0,2,42], toP: [0,3,18], fromL: [0,2,30], toL: [0,2,2] },
    { start: 0.25, end: 0.38, fromP: [0,3,18], toP: [0,4,-2], fromL: [0,2,2], toL: [0,2,-18] },
    { start: 0.38, end: 0.52, fromP: [0,4,-2], toP: [-4,3,-22], fromL: [0,2,-18], toL: [0,2,-32] },
    { start: 0.52, end: 0.65, fromP: [-4,3,-22], toP: [4,3,-42], fromL: [0,2,-32], toL: [0,2,-52] },
    { start: 0.65, end: 0.78, fromP: [4,3,-42], toP: [0,5,-62], fromL: [0,2,-52], toL: [0,3,-78] },
    { start: 0.78, end: 0.90, fromP: [0,5,-62], toP: [0,38,-58], fromL: [0,3,-78], toL: [0,0,-58] },
    { start: 0.90, end: 1.00, fromP: [0,38,-58], toP: [0,22,-52], fromL: [0,0,-58], toL: [0,5,-58] },
  ], [])

  useFrame(() => {
    let targetPos = new THREE.Vector3(0, 3, 62)
    let targetLook = new THREE.Vector3(0, 2, 50)

    for (const act of acts) {
      if (scrollProgress >= act.start && scrollProgress <= act.end) {
        const t = (scrollProgress - act.start) / (act.end - act.start)
        const smooth = t < 0.5 ? 2*t*t : -1+(4-2*t)*t // ease in-out
        targetPos = new THREE.Vector3(
          act.fromP[0] + (act.toP[0] - act.fromP[0]) * smooth,
          act.fromP[1] + (act.toP[1] - act.fromP[1]) * smooth,
          act.fromP[2] + (act.toP[2] - act.fromP[2]) * smooth,
        )
        targetLook = new THREE.Vector3(
          act.fromL[0] + (act.toL[0] - act.fromL[0]) * smooth,
          act.fromL[1] + (act.toL[1] - act.fromL[1]) * smooth,
          act.fromL[2] + (act.toL[2] - act.fromL[2]) * smooth,
        )
        break
      }
    }

    posTarget.current.lerp(targetPos, 0.03)
    lookTarget.current.lerp(targetLook, 0.04)
    camera.position.copy(posTarget.current)
    camera.lookAt(lookTarget.current)
  })

  return null
}

// Global ambient gold particles — drift upward
function GlobalParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 1400

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 44
      positions[i * 3 + 1] = Math.random() * 22 - 5
      positions[i * 3 + 2] = Math.random() * 110 - 90
    }
    return { positions }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.004
      if (pos[i * 3 + 1] > 16) pos[i * 3 + 1] = -5
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.024} transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// Colorful celebration confetti — multi-color particles drifting down
function CelebrationConfetti() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 700

  const { positions, velocities, colors } = useMemo(() => {
    const positions  = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors     = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#FF6B6B'),
      new THREE.Color('#FFD93D'),
      new THREE.Color('#6BCB77'),
      new THREE.Color('#4D96FF'),
      new THREE.Color('#FF69B4'),
      new THREE.Color('#C9A84C'),
      new THREE.Color('#FF8C00'),
      new THREE.Color('#DA70D6'),
      new THREE.Color('#00CED1'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i*3]     = (Math.random() - 0.5) * 54
      positions[i*3 + 1] = Math.random() * 32 - 2
      positions[i*3 + 2] = Math.random() * 120 - 100

      velocities[i*3]     = (Math.random() - 0.5) * 0.007
      velocities[i*3 + 1] = -(0.009 + Math.random() * 0.013)
      velocities[i*3 + 2] = 0

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i*3]     = c.r
      colors[i*3 + 1] = c.g
      colors[i*3 + 2] = c.b
    }

    return { positions, velocities, colors }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i*3]     += velocities[i*3]
      pos[i*3 + 1] += velocities[i*3 + 1]
      if (pos[i*3 + 1] < -5) {
        pos[i*3 + 1] = 30 + Math.random() * 4
        pos[i*3]     = (Math.random() - 0.5) * 54
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 3, 62], fov: 60, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25
        }}
        shadows
        dpr={[1, 1.5]}
        style={{ background: '#0A0A0A' }}
      >
        <AdaptiveDpr pixelated />
        <CameraController scrollProgress={scrollProgress} />

        {/* Starfield */}
        <Stars
          radius={200} depth={80} count={2500}
          factor={4} saturation={0} fade speed={0.5}
        />

        {/* Global gold particles */}
        <GlobalParticles />

        {/* Colorful celebration confetti */}
        <CelebrationConfetti />

        {/* Scene acts */}
        <Act1 scrollProgress={scrollProgress} />
        <Act2 scrollProgress={scrollProgress} />
        <Act3 scrollProgress={scrollProgress} />
        <Act4 scrollProgress={scrollProgress} />
        <Act5 scrollProgress={scrollProgress} />
        <Act6 scrollProgress={scrollProgress} />
        <Act7 scrollProgress={scrollProgress} />
        <Act8 scrollProgress={scrollProgress} />

        {/* Post processing */}
        <EffectComposer>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.85}
            mipmapBlur
            radius={0.7}
          />
          <Vignette
            offset={0.12}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
