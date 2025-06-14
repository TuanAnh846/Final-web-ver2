import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Mesh } from 'three';

interface Model3DViewerProps {
  modelUrl?: string;
  className?: string;
}

function GundamModel({ url }: { url: string }) {
  const meshRef = useRef<Mesh>(null);
  
  // For demo purposes, we'll create a simple geometric representation
  // In a real implementation, you would load the actual GLTF model
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Main body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#4A90E2" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#E74C3C" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.8, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#34495E" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.8, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#34495E" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.3, -1.5, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.3, -1.5, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Weapon */}
      <mesh position={[1.2, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#F39C12" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#BDC3C7" />
    </mesh>
  );
}

export function Model3DViewer({ modelUrl, className = "w-full h-64" }: Model3DViewerProps) {
  if (!modelUrl) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <p className="text-gray-500">3D model not available</p>
      </div>
    );
  }

  return (
    <div className={`${className} bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden`}>
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        
        <Suspense fallback={<LoadingFallback />}>
          <GundamModel url={modelUrl} />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={8}
            blur={2}
            far={2.5}
          />
          <Environment preset="studio" />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
      
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        Click and drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}