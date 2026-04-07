import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface DodecahedronProps {
  className?: string;
}

export default function Dodecahedron({ className }: DodecahedronProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const groupRef = useRef<THREE.Group | null>(null);
  const innerGlowMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const isHoveredRef = useRef(false);
  const currentSpeedRef = useRef(1.0);
  const timeRef = useRef(0);

  const setHovered = useCallback((hovered: boolean) => {
    isHoveredRef.current = hovered;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for dark theme
    const isDarkTheme = !document.documentElement.hasAttribute('data-theme');

    // Colors based on theme - more contrast between shades
    const primaryColor = isDarkTheme ? 0x00d4aa : 0x00a080;
    const glowColor = isDarkTheme ? 0x00ffcc : 0x00cc99;
    const faceColor = isDarkTheme ? 0x0a1f18 : 0xd4f0e8;
    const ambientColor = isDarkTheme ? 0x051510 : 0xe8f5f0;

    // Scene setup - transparent background
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Dodecahedron geometry
    const geometry = new THREE.DodecahedronGeometry(1, 0);

    // Create face material - darker, matte
    const faceMaterial = new THREE.MeshStandardMaterial({
      color: faceColor,
      metalness: 0.3,
      roughness: 0.7,
      transparent: true,
      opacity: 0.85,
    });

    // Create edge material - bright glow
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.9,
    });

    // Create inner glow mesh
    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    innerGlowMaterialRef.current = innerGlowMaterial;
    const innerGlow = new THREE.Mesh(geometry.clone(), innerGlowMaterial);
    innerGlow.scale.setScalar(0.85);

    // Create dodecahedron group
    const group = new THREE.Group();
    groupRef.current = group;

    // Main dodecahedron
    const dodecahedron = new THREE.Mesh(geometry, faceMaterial);
    dodecahedron.castShadow = true;
    dodecahedron.receiveShadow = true;
    group.add(dodecahedron);

    // Inner glow
    group.add(innerGlow);

    // Wireframe overlay
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframe = new THREE.LineSegments(wireframeGeometry, edgeMaterial);
    group.add(wireframe);

    scene.add(group);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(ambientColor, 0.6);
    scene.add(ambientLight);

    // Main directional light (top-right)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(3, 4, 2);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 20;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    // Fill light (soft, from left) - different color for contrast
    const fillLight = new THREE.DirectionalLight(primaryColor, 0.6);
    fillLight.position.set(-2, 1, 1);
    scene.add(fillLight);

    // Rim light (from behind) - bright
    const rimLight = new THREE.DirectionalLight(glowColor, 0.8);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Point light for extra glow
    const pointLight = new THREE.PointLight(primaryColor, 1.0, 10);
    pointLight.position.set(1.5, 1, 2);
    scene.add(pointLight);

    // Handle theme changes
    const handleThemeChange = (e: CustomEvent<{ theme: string }>) => {
      const newTheme = e.detail.theme;
      const newIsDark = newTheme === 'dark';

      const newPrimary = newIsDark ? 0x00d4aa : 0x00a080;
      const newGlow = newIsDark ? 0x00ffcc : 0x00cc99;
      const newFace = newIsDark ? 0x0a1f18 : 0xd4f0e8;
      const newAmbient = newIsDark ? 0x051510 : 0xe8f5f0;

      // Update materials
      faceMaterial.color.setHex(newFace);
      edgeMaterial.color.setHex(newGlow);
      innerGlowMaterial.color.setHex(newPrimary);

      // Update lights
      fillLight.color.setHex(newPrimary);
      rimLight.color.setHex(newGlow);
      pointLight.color.setHex(newPrimary);
      ambientLight.color.setHex(newAmbient);

      // Force re-render
      renderer.render(scene, camera);
    };

    document.addEventListener('theme-changed', handleThemeChange as EventListener);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    // Animation state
    let time = 0;
    timeRef.current = 0;
    let currentSpeed = 1.0;
    currentSpeedRef.current = 1.0;

    // Animation loop
    const animate = () => {
      const isHovered = isHoveredRef.current;
      const targetSpeed = isHovered ? 0.0 : 1.0;

      // Smooth speed transition (ease-out when hover, ease-in when unhover)
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      currentSpeedRef.current = currentSpeed;

      time += 0.008 * currentSpeed;
      timeRef.current = time;

      // Rotate - 1.5x faster
      group.rotation.x = time * 1.5;
      group.rotation.y = time * 2.1;

      // Gentle floating motion
      group.position.y = Math.sin(time * 0.8) * 0.15;

      // Pulse the glow
      const pulse = Math.sin(time * 2) * 0.08 + 0.15;
      innerGlowMaterial.opacity = pulse;

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Initial render
    renderer.render(scene, camera);

    // Cleanup
    return () => {
      document.removeEventListener('theme-changed', handleThemeChange as EventListener);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      renderer.dispose();
      geometry.dispose();
      faceMaterial.dispose();
      edgeMaterial.dispose();
      innerGlowMaterial.dispose();
      wireframeGeometry.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        bottom: '74px',
        right: '24px',
        width: '160px',
        height: '160px',
        zIndex: 100,
      }}
    >
      <div
        ref={containerRef}
        role="presentation"
        style={{ width: '100%', height: '100%' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
