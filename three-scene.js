/**
 * AXE FILMS — BESPOKE 3D THREE.JS APERTURE & FRAME ENGINE
 * Concept: "From Frame to Film"
 * 
 * Frame-rate independent, silky-smooth WebGL animation.
 * Features 8 architectural iris blades, intersecting 'X' cinema frame beams,
 * and cinematic projector dust volume.
 */

class AxeThreeScene {
  constructor() {
    this.container = document.getElementById('hero-webgl-canvas');
    this.isWebGLAvailable = this.checkWebGL();
    if (!this.isWebGLAvailable) {
      console.warn("WebGL not available or disabled; using CSS fallback.");
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.apertureGroup = null;
    this.blades = [];
    this.xBeams = [];
    this.particles = null;
    this.pointLight = null;
    
    // Smooth mouse coordinates with inertia
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };
    this.scrollProgress = 0;
    this.targetScroll = 0;
    this.isLoaded = false;
    this.clock = new THREE.Clock();
    this.animationFrameId = null;

    this.init();
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0c090a, 0.045);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 14);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    }

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x1f0c0e, 1.6);
    this.scene.add(ambientLight);

    // Dynamic Crimson Key Light
    this.pointLight = new THREE.PointLight(0xe62323, 4.8, 28);
    this.pointLight.position.set(2, 3, 5);
    this.scene.add(this.pointLight);

    // Cold Rim Light for specular edges
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(-6, 8, -4);
    this.scene.add(rimLight);

    // Deep Burgundy Fill
    const backLight = new THREE.PointLight(0x821412, 3.2, 20);
    backLight.position.set(0, -4, -2);
    this.scene.add(backLight);

    // 5. Build Architectural Aperture & "X" Motif
    this.buildApertureAndXMotif();

    // 6. Build Cinematic Dust / Projector Volume
    this.buildCinematicParticles();

    // 7. Event listeners
    this.bindEvents();

    // 8. Start Loop
    this.animate();
  }

  buildApertureAndXMotif() {
    this.apertureGroup = new THREE.Group();
    this.scene.add(this.apertureGroup);

    // Luxury metallic materials
    const obsidianMetalMat = new THREE.MeshStandardMaterial({
      color: 0x181214,
      metalness: 0.94,
      roughness: 0.2,
      envMapIntensity: 1.6
    });

    const crimsonEdgeMat = new THREE.MeshStandardMaterial({
      color: 0x821412,
      emissive: 0x4a0a09,
      emissiveIntensity: 0.65,
      metalness: 0.88,
      roughness: 0.16
    });

    const luminousCoreMat = new THREE.MeshBasicMaterial({
      color: 0xe62323,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // A. 8-Blade Radial Camera Iris
    const bladeCount = 8;
    const irisRadius = 3.6;

    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(0, 0);
      bladeShape.lineTo(2.2, 0.4);
      bladeShape.lineTo(2.8, -0.6);
      bladeShape.lineTo(0.6, -1.1);
      bladeShape.closePath();

      const extrudeSettings = {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04
      };

      const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
      const blade = new THREE.Mesh(bladeGeo, i % 2 === 0 ? obsidianMetalMat : crimsonEdgeMat);

      const bladePivot = new THREE.Group();
      bladePivot.position.set(Math.cos(angle) * irisRadius, Math.sin(angle) * irisRadius, 0);
      bladePivot.rotation.z = angle + 0.4;
      bladePivot.add(blade);

      this.apertureGroup.add(bladePivot);
      this.blades.push({
        pivot: bladePivot,
        baseAngle: angle,
        baseX: Math.cos(angle) * irisRadius,
        baseY: Math.sin(angle) * irisRadius
      });
    }

    // B. Intersecting 'X' Cinema Beams (Axe Films signature)
    const beamGeo = new THREE.BoxGeometry(0.7, 5.6, 0.25);

    const beam1 = new THREE.Mesh(beamGeo, obsidianMetalMat);
    beam1.rotation.z = Math.PI / 4;
    beam1.position.z = 0.2;
    this.apertureGroup.add(beam1);
    this.xBeams.push(beam1);

    const beam2 = new THREE.Mesh(beamGeo, crimsonEdgeMat);
    beam2.rotation.z = -Math.PI / 4;
    beam2.position.z = 0.35;
    this.apertureGroup.add(beam2);
    this.xBeams.push(beam2);

    // C. Optical Shutter Wireframe Rings
    const ringGeo = new THREE.TorusGeometry(4.2, 0.03, 16, 64);
    const ring = new THREE.Mesh(ringGeo, luminousCoreMat);
    this.apertureGroup.add(ring);

    const innerRingGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 48);
    const innerRing = new THREE.Mesh(innerRingGeo, luminousCoreMat);
    this.apertureGroup.add(innerRing);

    // Position in hero composition
    this.setResponsivePosition();
  }

  setResponsivePosition() {
    const width = window.innerWidth;
    if (width < 768) {
      this.apertureGroup.position.set(0, 1.2, -3);
      this.apertureGroup.scale.set(0.55, 0.55, 0.55);
    } else if (width < 1200) {
      this.apertureGroup.position.set(1.5, 0.8, -1.5);
      this.apertureGroup.scale.set(0.7, 0.7, 0.7);
    } else {
      this.apertureGroup.position.set(2.4, 0.8, -1);
      this.apertureGroup.scale.set(0.85, 0.85, 0.85);
    }
  }

  buildCinematicParticles() {
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xe62323);
    const color2 = new THREE.Color(0xf2f2f2);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const mixedColor = Math.random() > 0.4 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onWindowResize(), false);

    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      } else {
        this.clock.start();
        this.animate();
      }
    });
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.setResponsivePosition();
  }

  triggerOpeningSequence() {
    this.isLoaded = true;
    if (!this.apertureGroup) return;

    const startTime = performance.now();
    const duration = 1400;

    const expandIris = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic-bezier ease out
      const ease = 1 - Math.pow(1 - progress, 3);

      this.blades.forEach((b) => {
        b.pivot.position.x = b.baseX * (1 + ease * 0.45);
        b.pivot.position.y = b.baseY * (1 + ease * 0.45);
        b.pivot.rotation.z = b.baseAngle + 0.4 + (ease * 0.3);
      });

      if (progress < 1) {
        requestAnimationFrame(expandIris);
      }
    };

    requestAnimationFrame(expandIris);
  }

  setApertureFStop(value) {
    const normalized = (value - 1.4) / (22 - 1.4);
    const dilation = 1.5 - (normalized * 0.85);

    this.blades.forEach((b) => {
      b.pivot.position.x = b.baseX * dilation;
      b.pivot.position.y = b.baseY * dilation;
      b.pivot.rotation.z = b.baseAngle + 0.4 + (normalized * 0.5);
    });

    if (this.pointLight) {
      this.pointLight.intensity = 5.5 - (normalized * 3.5);
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Frame-rate independent exponential smoothing
    const lerpRate = 1 - Math.exp(-6 * delta);
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * lerpRate;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * lerpRate;
    this.scrollProgress += (this.targetScroll - this.scrollProgress) * lerpRate;

    if (this.apertureGroup) {
      // Gentle cinematic breathing + mouse tilt
      this.apertureGroup.rotation.y = this.mouse.x * 0.45 + (elapsedTime * 0.08);
      this.apertureGroup.rotation.x = -this.mouse.y * 0.35 + (Math.sin(elapsedTime * 0.5) * 0.05);
      this.apertureGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.04;

      // Smooth scroll parallax translation
      this.apertureGroup.position.y = (0.8 - (this.scrollProgress * 4.5));
      this.apertureGroup.position.z = -1 - (this.scrollProgress * 3);

      if (this.pointLight) {
        this.pointLight.position.x = 2 + this.mouse.x * 3;
        this.pointLight.position.y = 3 + this.mouse.y * 3;
      }
    }

    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.025;
      this.particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.axeThree = new AxeThreeScene();
});
