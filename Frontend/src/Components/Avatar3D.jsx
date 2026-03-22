import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';

function NeuralCore({ state }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const pointsRef = useRef();
  const { mouse } = useThree();

  // Memoize positions to avoid heavy recalculations on re-render
  const pointsData = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((stateObj, delta) => {
    const t = stateObj.clock.getElapsedTime();
    
    // Core animation
    if (coreRef.current) {
      coreRef.current.distort = state === 'thinking' ? 0.6 : state === 'talking' ? 0.4 : 0.2;
      coreRef.current.speed = state === 'thinking' ? 4 : state === 'talking' ? 1.5 : 1;
      
      const targetColor = new THREE.Color(
        state === 'thinking' ? '#3BFCFF' : 
        state === 'talking' ? '#00FF87' : 
        '#00FF87'
      );
      coreRef.current.color.lerp(targetColor, 0.1);
    }

    // Mouse follow
    if (coreRef.current?.parent) {
      coreRef.current.parent.rotation.y = THREE.MathUtils.lerp(coreRef.current.parent.rotation.y, (mouse.x * Math.PI) / 8, 0.05);
      coreRef.current.parent.rotation.x = THREE.MathUtils.lerp(coreRef.current.parent.rotation.x, -(mouse.y * Math.PI) / 8, 0.05);
    }

    // Rings animation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.5;
    }

    // Points animation
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  const coreColor = state === 'thinking' ? '#3BFCFF' : '#00FF87';

  return (
    <group>
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            ref={coreRef}
            color={coreColor}
            envMapIntensity={0.5}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>

      <group ref={ring1Ref}>
        <Torus args={[1.5, 0.006, 16, 100]}>
          <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={2} transparent opacity={0.3} />
        </Torus>
      </group>
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <Torus args={[1.8, 0.004, 16, 100]}>
          <meshStandardMaterial color="#3BFCFF" emissive="#3BFCFF" emissiveIntensity={1} transparent opacity={0.2} />
        </Torus>
      </group>
      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <Torus args={[2.1, 0.002, 16, 100]}>
          <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={0.5} transparent opacity={0.1} />
        </Torus>
      </group>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointsData.length / 3}
            array={pointsData}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={coreColor}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight intensity={5} distance={5} color={coreColor} />
    </group>
  );
}

const Avatar3D = ({ state = 'idle', isMobile = false }) => {
  const glowColor = state === 'talking' ? '#00FF87' : state === 'thinking' ? '#3BFCFF' : '#00FF87';

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={glowColor} />
        
        <Suspense fallback={null}>
          <NeuralCore state={state} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100%', height: '100%', borderRadius: '50%',
        background: `radial-gradient(circle, ${glowColor}15 0%, transparent 70%)`,
        filter: 'blur(20px)', pointerEvents: 'none', zIndex: -1
      }} />
    </div>
  );
};

export default Avatar3D;
