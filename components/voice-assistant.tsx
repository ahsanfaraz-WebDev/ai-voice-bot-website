'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface VoiceAssistantProps {
  className?: string;
  isListening?: boolean;
  volume?: number;
  size?: number;
}

export default function VoiceAssistant({ 
  className = "", 
  isListening = false, 
  volume = 0,
  size = 400 
}: VoiceAssistantProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number>();
  
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [microphone, setMicrophone] = useState<MediaStreamAudioSourceNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Audio reactive state
  const [smoothVolume, setSmoothVolume] = useState<number>(0);
  const [frequencyData, setFrequencyData] = useState<Float32Array>(new Float32Array(64));

  // Initialize audio context and microphone
  const initializeAudio = useCallback(async () => {
    if (isInitialized || !isListening) return;
    
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = context.createMediaStreamSource(stream);
      const analyserNode = context.createAnalyser();
      
      analyserNode.fftSize = 128;
      analyserNode.smoothingTimeConstant = 0.8;
      source.connect(analyserNode);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      setMicrophone(source);
      setIsInitialized(true);
    } catch (error) {
      console.log('Microphone access denied, using simulated data');
      setIsInitialized(true);
    }
  }, [isListening, isInitialized]);

  // Get audio data for visualization
  const getAudioData = useCallback(() => {
    if (!analyser) return { volume: 0, frequencies: new Float32Array(64) };
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const frequencyArray = new Float32Array(64);
    
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate volume
    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    const avgVolume = sum / bufferLength / 255;
    
    // Get frequency data for visualization
    for (let i = 0; i < 64; i++) {
      const index = Math.floor((i / 64) * bufferLength);
      frequencyArray[i] = dataArray[index] / 255;
    }
    
    return { volume: avgVolume, frequencies: frequencyArray };
  }, [analyser]);

  // Update audio data
  useEffect(() => {
    if (!isListening) {
      setSmoothVolume(0);
      setFrequencyData(new Float32Array(64));
      return;
    }

    const updateAudio = () => {
      const { volume: currentVolume, frequencies } = analyser ? 
        getAudioData() : 
        { 
          volume: volume || (Math.sin(Date.now() * 0.003) * 0.3 + 0.3), 
          frequencies: new Float32Array(64).map((_, i) => Math.sin(Date.now() * 0.01 + i) * 0.2 + 0.2)
        };
      
      setSmoothVolume(prev => prev * 0.8 + currentVolume * 0.2);
      setFrequencyData(frequencies);
    };

    const interval = setInterval(updateAudio, 50);
    return () => clearInterval(interval);
  }, [isListening, analyser, getAudioData, volume]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    
    // Renderer setup with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Add post-processing effects for bloom
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    container.appendChild(renderer.domElement);

    // Create fluid energy orb - inspired by the swirling plasma reference
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Custom shader material for swirling energy effect
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        volume: { value: 0 },
        frequencies: { value: new Float32Array(64) },
        resolution: { value: new THREE.Vector2(size, size) },
        color1: { value: new THREE.Color(0x9333ea) }, // Purple
        color2: { value: new THREE.Color(0x3b82f6) }, // Blue
        color3: { value: new THREE.Color(0x22d3ee) }, // Cyan
        color4: { value: new THREE.Color(0xe879f9) }, // Light purple/pink
      },
      vertexShader: `
        uniform float time;
        uniform float volume;
        uniform float frequencies[64];
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        
        // Noise function for audio-reactive deformation
        float hash(float n) { return fract(sin(n) * 43758.5453123); }
        
        float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          
          float n = p.x + p.y * 57.0 + 113.0 * p.z;
          return mix(
            mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
            mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
        }
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          vec3 newPosition = position;
          
          // Audio-reactive deformation when listening
          if (volume > 0.01) {
            // Get frequency data for this vertex
            float freqIndex = mod(abs(position.x + position.y + position.z) * 32.0, 64.0);
            float freq = frequencies[int(freqIndex)];
            
            // Create asymmetric deformation based on audio
            float audioDeform = freq * volume * 0.3;
            
            // Add directional bias - make it react more on certain axes
            float xBias = sin(position.y * 3.0 + time * 2.0) * audioDeform;
            float yBias = cos(position.x * 2.5 + time * 1.8) * audioDeform * 0.8;
            float zBias = sin(position.z * 4.0 + time * 2.2) * audioDeform * 0.6;
            
            // Apply asymmetric displacement
            newPosition.x += xBias + noise(position * 5.0 + time) * audioDeform * 0.5;
            newPosition.y += yBias + noise(position * 6.0 + time * 1.1) * audioDeform * 0.4;
            newPosition.z += zBias + noise(position * 4.5 + time * 0.9) * audioDeform * 0.3;
            
            // Add pulsing effect that varies across the surface
            float pulse = sin(time * 4.0 + length(position) * 8.0) * volume * 0.2;
            newPosition += normalize(position) * pulse;
            
            // Create "listening" directional bias
            float listeningBias = sin(time * 3.0) * volume * 0.15;
            newPosition.x += listeningBias;
            newPosition.y += cos(time * 2.5) * volume * 0.1;
          }
          
          vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
          vWorldPosition = worldPosition.xyz;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float volume;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        
        // Advanced noise functions for fluid movement
        float hash(float n) { return fract(sin(n) * 43758.5453123); }
        
        float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          
          float n = p.x + p.y * 57.0 + 113.0 * p.z;
          return mix(
            mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
            mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
        }
        
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          
          for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          return value;
        }
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          
          // Create swirling patterns
          float swirl1 = fbm(vPosition * 2.0 + time * 0.8);
          float swirl2 = fbm(vPosition * 3.0 - time * 0.6 + vec3(100.0));
          float swirl3 = fbm(vPosition * 1.5 + time * 1.2 + vec3(200.0));
          
          // Add volume-reactive turbulence
          float turbulence = fbm(vPosition * 4.0 + time * (1.0 + volume * 2.0));
          
          // Create flowing energy streams
          float flow1 = sin(swirl1 * 6.28 + time * 2.0) * 0.5 + 0.5;
          float flow2 = sin(swirl2 * 6.28 + time * 1.5) * 0.5 + 0.5;
          float flow3 = sin(swirl3 * 6.28 + time * 2.5) * 0.5 + 0.5;
          
          // Combine flows for complex patterns
          float energyFlow = (flow1 * 0.4 + flow2 * 0.3 + flow3 * 0.3);
          energyFlow = pow(energyFlow, 0.8);
          
          // Enhanced volume reactivity for listening mode
          if (volume > 0.02) {
            energyFlow *= (0.3 + volume * 2.0);
            turbulence *= (0.2 + volume * 1.2);
            
            // Add intensity spikes for audio reactive behavior
            float audioSpike = pow(volume, 0.5) * 1.5;
            energyFlow += audioSpike * 0.3;
            
            // Make patterns more chaotic when listening
            swirl1 *= (1.0 + volume * 0.8);
            swirl2 *= (1.0 + volume * 0.6);
            swirl3 *= (1.0 + volume * 1.0);
          } else {
            energyFlow *= 0.6;
            turbulence *= 0.4;
          }
          
          // Color mixing based on energy flows
          vec3 baseColor = mix(color1, color2, flow1);
          baseColor = mix(baseColor, color3, flow2 * 0.7);
          baseColor = mix(baseColor, color4, flow3 * 0.5);
          
          // Add energy hotspots
          float hotspot = pow(energyFlow, 2.0);
          baseColor += color4 * hotspot * 0.8;
          baseColor += color3 * turbulence * 0.6;
          
          // Fresnel effect for rim lighting
          float fresnel = 1.0 - dot(normal, viewDirection);
          fresnel = pow(fresnel, 1.5);
          
          // Add rim glow
          baseColor += mix(color2, color3, fresnel) * fresnel * (0.5 + volume);
          
          // Inner glow effect
          float innerGlow = 1.0 - fresnel;
          innerGlow = pow(innerGlow, 0.5);
          baseColor += color1 * innerGlow * energyFlow * 0.3;
          
          // Dynamic alpha based on energy and fresnel
          float alpha = 0.7 + energyFlow * 0.3 + fresnel * 0.2;
          alpha *= (0.6 + volume * 0.8);
          
          // Add subtle pulsing
          float pulse = sin(time * 3.0) * 0.1 + 0.9;
          alpha *= pulse;
          
          gl_FragColor = vec4(baseColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Enhanced lighting for energy orb
    const ambientLight = new THREE.AmbientLight(0x9333ea, 0.6);
    scene.add(ambientLight);
    
    // Add point lights to enhance the energy effect
    const centerLight = new THREE.PointLight(0xe879f9, 2, 5);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    // Remove particle system - keeping clean background

    // Create neon ring effects - inspired by reference image
    const ringsGroup = new THREE.Group();
    const ringCount = 3;
    
    for (let i = 0; i < ringCount; i++) {
      const innerRadius = 1.3 + i * 0.4;
      const outerRadius = innerRadius + 0.1;
      const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
      
      const ringMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          volume: { value: 0 },
          offset: { value: i * 0.5 },
          ringIndex: { value: i }
        },
        vertexShader: `
          uniform float time;
          uniform float volume;
          uniform float offset;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float volume;
          uniform float offset;
          uniform float ringIndex;
          varying vec2 vUv;
          
          void main() {
            float dist = length(vUv - 0.5) * 2.0;
            
            // Create pulsing wave effect
            float wave = sin(time * 4.0 + offset + dist * 20.0) * 0.5 + 0.5;
            float pulse = sin(time * 3.0 + ringIndex) * 0.3 + 0.7;
            
            // Gradient colors based on our theme
            vec3 color1 = vec3(0.58, 0.2, 0.92);  // Purple
            vec3 color2 = vec3(0.23, 0.51, 0.96); // Blue  
            vec3 color3 = vec3(0.13, 0.83, 0.93); // Cyan
            
            vec3 finalColor = mix(color1, color2, ringIndex / 2.0);
            finalColor = mix(finalColor, color3, wave * 0.5);
            
            // Edge glow effect
            float edgeGlow = 1.0 - smoothstep(0.3, 0.5, abs(dist - 0.4));
            
            float alpha = wave * pulse * volume * edgeGlow * 0.8;
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ringsGroup.add(ring);
    }
    
    ringsGroup.visible = false; // Start hidden
    scene.add(ringsGroup);

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    sphereRef.current = sphere;
    particlesRef.current = null; // No particles anymore
    ringsRef.current = ringsGroup;
    
    return () => {
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, [size]);

  // Animation loop
  useEffect(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const sphere = sphereRef.current;
    const rings = ringsRef.current;
    
    if (!renderer || !scene || !camera || !sphere) return;

    let time = 0;
    const animate = () => {
      time += 0.016;
      
      // Update sphere material uniforms
      const sphereMaterial = sphere.material as THREE.ShaderMaterial;
      sphereMaterial.uniforms.time.value = time;
      sphereMaterial.uniforms.volume.value = smoothVolume;
      sphereMaterial.uniforms.frequencies.value = frequencyData;
      
      // Audio-reactive orb behavior - asymmetric when listening
      if (isListening && smoothVolume > 0.02) {
        // Asymmetric scaling based on frequency data
        const scaleVariation = 1 + smoothVolume * 0.3;
        const asymmetricX = 1 + Math.sin(time * 3.0) * smoothVolume * 0.2;
        const asymmetricY = 1 + Math.cos(time * 2.5) * smoothVolume * 0.15;
        const asymmetricZ = 1 + Math.sin(time * 4.0) * smoothVolume * 0.1;
        
        sphere.scale.set(
          scaleVariation * asymmetricX,
          scaleVariation * asymmetricY, 
          scaleVariation * asymmetricZ
        );
        
        // Dynamic rotation that responds to audio
        sphere.rotation.y += 0.01 * (1 + smoothVolume * 2);
        sphere.rotation.x += 0.012 * (1 + smoothVolume) + Math.sin(time * 2) * smoothVolume * 0.01;
        sphere.rotation.z += Math.cos(time * 1.8) * smoothVolume * 0.008;
        
        // Subtle position wobble when actively listening
        sphere.position.x = Math.sin(time * 4.0) * smoothVolume * 0.05;
        sphere.position.y = Math.cos(time * 3.2) * smoothVolume * 0.03;
        sphere.position.z = Math.sin(time * 2.8) * smoothVolume * 0.02;
      } else {
        // Gentle idle behavior
        const breathingScale = 1 + Math.sin(time * 2) * 0.03;
        sphere.scale.setScalar(breathingScale);
        
        // Slow idle rotation
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.003;
        sphere.rotation.z += Math.sin(time * 0.7) * 0.002;
        
        // Return to center when not listening
        sphere.position.x *= 0.95;
        sphere.position.y *= 0.95;
        sphere.position.z *= 0.95;
      }

      // No particles anymore - clean background

      // Update neon rings - show when listening with lower threshold
      if (rings) {
        const shouldShowRings = isListening && smoothVolume > 0.05;
        rings.visible = shouldShowRings;
        
        if (shouldShowRings) {
          rings.children.forEach((ring, index) => {
            const ringMaterial = (ring as THREE.Mesh).material as THREE.ShaderMaterial;
            ringMaterial.uniforms.time.value = time;
            ringMaterial.uniforms.volume.value = smoothVolume;
            
            // Different scaling for layered effect
            const baseScale = 1 + smoothVolume * 0.5;
            const individualScale = 1 + Math.sin(time * 2 + index) * 0.1 * smoothVolume;
            ring.scale.setScalar(baseScale * individualScale);
            
            // Slight rotation for dynamic effect
            ring.rotation.z += 0.01 * smoothVolume * (index % 2 === 0 ? 1 : -1);
          });
        }
      }

      // Minimal camera movement when idle
      if (isListening) {
        camera.position.x = Math.sin(time * 0.3) * 0.05;
        camera.position.y = Math.cos(time * 0.2) * 0.025;
      }
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, smoothVolume, frequencyData]);

  // Initialize audio when listening starts
  useEffect(() => {
    if (isListening && !isInitialized) {
      initializeAudio();
    }
  }, [isListening, isInitialized, initializeAudio]);

  // Cleanup audio resources
  useEffect(() => {
    return () => {
      if (microphone) {
        microphone.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [microphone, audioContext]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        ref={containerRef}
        className="drop-shadow-2xl"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: 'transparent'
        }}
      />
    </div>
  );
}
