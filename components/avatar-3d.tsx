'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarModelProps {
  url: string;
}

function AvatarModel({ url }: AvatarModelProps) {
  const gltf = useLoader(GLTFLoader, url);

  useEffect(() => {
    if (gltf.scene) {
      // Scale the avatar much larger to fill the outer circle
      gltf.scene.scale.setScalar(6.0);
      
      // Calculate bounding box for proper positioning
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Position avatar to show face and torso only (hide legs completely)
      gltf.scene.position.x = -center.x; // Center horizontally
      gltf.scene.position.y = -box.max.y + 3.8; // Show face, shoulders, and torso only
      gltf.scene.position.z = 0;
      
      // Ensure avatar is upright (no rotation)
      gltf.scene.rotation.x = 0;
      gltf.scene.rotation.y = 0;
      gltf.scene.rotation.z = 0;
      
      console.log('Avatar positioned (full view):', { 
        center: center, 
        size: size, 
        position: gltf.scene.position,
        boundingBox: { min: box.min, max: box.max },
        scale: gltf.scene.scale,
        actualHeight: size.y * 4.0
      });
    }
  }, [gltf]);

  if (!gltf.scene) {
    console.log('No gltf scene available');
    return null;
  }

  return <primitive object={gltf.scene} />;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-300"></div>
    </div>
  );
}

interface Avatar3DProps {
  avatarUrl: string;
  className?: string;
}

export default function Avatar3D({ avatarUrl, className = "" }: Avatar3DProps) {
  const [isClient, setIsClient] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <LoadingFallback />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-white/60 text-center">
          <div className="text-lg mb-2">3D Avatar</div>
          <div className="text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className} relative overflow-hidden`} style={{ minHeight: '288px' }}>
      <Canvas
        camera={{ 
          position: isMobile ? [0, 3, 7] : [0, 3, 6], 
          fov: isMobile ? 60 : 50 
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor('#000000', 0);
          camera.lookAt(0, 3, 0);
        }}
      >
        {/* Lighting setup for larger avatar */}
        <ambientLight intensity={1.1} />
        <directionalLight 
          position={[8, 12, 15]} 
          intensity={2.2} 
        />
        <pointLight position={[-6, 8, 10]} intensity={0.8} color="#a855f7" />
        <pointLight position={[6, 7, 8]} intensity={0.7} color="#c084fc" />
        <spotLight 
          position={[0, 15, 12]} 
          intensity={1.4} 
          angle={0.6} 
          penumbra={0.2}
          target-position={[0, 4, 0]}
        />
        {/* Additional face lighting for larger scale */}
        <pointLight position={[0, 6, 10]} intensity={1.0} color="#ffffff" />
        
        {/* Avatar Model */}
        <Suspense 
          fallback={
            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1.2, 2.5, 0.8]} />
              <meshStandardMaterial color="#a855f7" opacity={0.5} transparent />
            </mesh>
          }
        >
          <AvatarModel url={avatarUrl} />
        </Suspense>
        
        {/* Controls for interaction - Horizontal rotation only */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1} // Restrict vertical movement (almost horizontal)
          minPolarAngle={Math.PI / 2.1} // Lock to horizontal view
          autoRotate={false}
          target={[0, isMobile ? 3 : 9, 0]} // Look at face/upper torso level for cropped view
          minDistance={isMobile ? 5 : 4}
          maxDistance={isMobile ? 5 : 4}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
