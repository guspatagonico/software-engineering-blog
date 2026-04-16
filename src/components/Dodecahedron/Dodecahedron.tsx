import { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';

interface DodecahedronProps {
  className?: string;
  autoHideOnScroll?: boolean;
}

export default function Dodecahedron({ className, autoHideOnScroll = false }: DodecahedronProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const groupRef = useRef<THREE.Group | null>(null);
  const innerGlowMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const isHoveredRef = useRef(false);
  const isTouchDeviceRef = useRef(false);
  const currentSpeedRef = useRef(1.0);
  const currentScaleRef = useRef(1.0);
  const timeRef = useRef(0);

  const setHovered = useCallback((hovered: boolean) => {
    // Only update hover state on non-touch devices
    if (!isTouchDeviceRef.current) {
      isHoveredRef.current = hovered;
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect touch device
    isTouchDeviceRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.setClearColor(0x000000, 0); // Transparent
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.sortObjects = true;
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
    let currentScale = 1.0;
    currentScaleRef.current = 1.0;

    // Animation loop
    const animate = () => {
      const isHovered = isHoveredRef.current;
      const targetSpeed = isHovered ? 0.0 : 1.0;

      // Smooth speed transition (ease-out when hover, ease-in when unhover)
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      currentSpeedRef.current = currentSpeed;

      // Scale animation - pop out on hover, pop in on unhover
      const targetScale = isHovered ? 1.15 : 1.0;
      currentScale += (targetScale - currentScale) * 0.15;
      currentScaleRef.current = currentScale;

      time += 0.008 * currentSpeed;
      timeRef.current = time;

      // Rotate - 1.5x faster
      group.rotation.x = time * 1.5;
      group.rotation.y = time * 2.1;

      // Apply scale with gentle pulse
      const pulseScale = Math.sin(time * 3) * 0.03 + 1;
      group.scale.setScalar(currentScale * pulseScale);

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

    // Store ref value for cleanup
    const containerElement = containerRef.current;

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
      if (containerElement && renderer.domElement) {
        containerElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  useEffect(() => {
    if (!autoHideOnScroll || !containerRef.current) return;

    let hideTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      setIsHidden(true);
    };

    const show = () => {
      setIsHidden(false);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hide, 2000);
    };

    show();

    const content = document.querySelector('.content') as HTMLElement | null;
    const pageContainer = document.querySelector('.page-container') as HTMLElement | null;
    const scrollTarget = content || pageContainer;

    if (scrollTarget) {
      scrollTarget.addEventListener('scroll', show, { passive: true });
    }

    window.addEventListener('scroll', show, { passive: true });

    return () => {
      clearTimeout(hideTimer);
      if (scrollTarget) {
        scrollTarget.removeEventListener('scroll', show);
      }
      window.removeEventListener('scroll', show);
    };
  }, [autoHideOnScroll]);

  const handleClick = useCallback(() => {
    // Dispatch event to toggle matrix background
    window.dispatchEvent(new CustomEvent('toggle-matrix-background'));
  }, []);

  return (
    <button
      ref={containerRef}
      type="button"
      className={`${className || ''} ${isHidden ? 'dodecahedron-hidden' : ''}`.trim()}
      aria-label="Toggle Matrix background"
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '0px',
        width: '128px',
        height: '128px',
        zIndex: 40,
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
}
