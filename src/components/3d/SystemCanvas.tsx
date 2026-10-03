"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ActiveNodeInfo {
  name: string;
  category: string;
  status: string;
  description: string;
}

export function SystemCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<ActiveNodeInfo | null>({
    name: "Elifsi Core Engine",
    category: "Foundation Architecture",
    status: "Active System Core",
    description:
      "Proprietary distributed orchestration framework powering high-concurrency transactions, identity federation, and intelligent service meshes.",
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf51f3d, 1.8);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Core Node (Elifsi Technologies Platform Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Inner wireframe lattice
    const coreWireGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const coreWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xf51f3d,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeometry, coreWireMaterial);
    rootGroup.add(coreWireMesh);

    // 2. Orbital System Nodes
    const nodeDefinitions = [
      {
        name: "Evrry",
        category: "Consumer Super App",
        status: "Flagship Product",
        description:
          "The unified consumer platform integrating food, groceries, mobility, stays, and instant payments under single intelligent orchestration.",
        color: 0xf51f3d,
        radius: 3.2,
        speed: 0.45,
        angle: 0.2,
        size: 0.55,
        isFlagship: true,
      },
      {
        name: "Eli AI Concierge",
        category: "Cognitive Agent Mesh",
        status: "Embedded Intelligence",
        description:
          "Cross-domain natural language agent that translates user intent into multi-step executed actions across the Evrry ecosystem.",
        color: 0xd91432,
        radius: 2.8,
        speed: -0.35,
        angle: 2.1,
        size: 0.38,
        isFlagship: false,
      },
      {
        name: "Unified Services Mesh",
        category: "Platform Infrastructure",
        status: "Distributed Ledger",
        description:
          "High-throughput transactional backbone managing merchant settlements, geofencing, and real-time transit dispatch.",
        color: 0x4b5563,
        radius: 4.1,
        speed: 0.22,
        angle: 4.0,
        size: 0.32,
        isFlagship: false,
      },
      {
        name: "Future Products Horizon",
        category: "Next-Gen Software",
        status: "Active Expansion",
        description:
          "Elifsi Technologies' planned future software architectures, enterprise tooling, and autonomous business systems.",
        color: 0x9ca3af,
        radius: 4.8,
        speed: -0.18,
        angle: 5.3,
        size: 0.28,
        isFlagship: false,
      },
    ];

    interface NodeMeshItem {
      mesh: THREE.Mesh;
      def: typeof nodeDefinitions[0];
      line: THREE.Line;
    }

    const nodeMeshes: NodeMeshItem[] = [];

    // Orbit rings
    const orbitRadii = [2.8, 3.2, 4.1, 4.8];
    orbitRadii.forEach((r) => {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xe5e7eb,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      rootGroup.add(ring);
    });

    nodeDefinitions.forEach((def) => {
      // Mesh
      const geo = new THREE.SphereGeometry(def.size, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.3,
        metalness: 0.6,
        emissive: def.isFlagship ? 0xf51f3d : 0x000000,
        emissiveIntensity: def.isFlagship ? 0.3 : 0,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Connecting line from core to node
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: def.isFlagship ? 0xf51f3d : 0xd1d5db,
        transparent: true,
        opacity: def.isFlagship ? 0.7 : 0.4,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);

      rootGroup.add(mesh);
      nodeMeshes.push({ mesh, def, line });
    });

    // Ambient floating particles
    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf51f3d,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // Mouse / Pointer interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.25;
    let targetRotationY = 0.4;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.6;
      targetRotationX = 0.25 - y * 0.4;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // Raycasting for interactive node selection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseVector, camera);
      const meshesToTest = [coreMesh, ...nodeMeshes.map((n) => n.mesh)];
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit === coreMesh) {
          setActiveNode({
            name: "Elifsi Core Engine",
            category: "Foundation Architecture",
            status: "Active System Core",
            description:
              "Proprietary distributed orchestration framework powering high-concurrency transactions, identity federation, and intelligent service meshes.",
          });
        } else {
          const item = nodeMeshes.find((n) => n.mesh === hit);
          if (item) {
            setActiveNode({
              name: item.def.name,
              category: item.def.category,
              status: item.def.status,
              description: item.def.description,
            });
          }
        }
      }
    };

    container.addEventListener("click", handlePointerClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/root damping
      if (!prefersReducedMotion) {
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;

        // Core gentle rotation
        coreMesh.rotation.y += 0.008;
        coreMesh.rotation.x += 0.004;
        coreWireMesh.rotation.y -= 0.005;
        coreWireMesh.rotation.z += 0.003;

        // Update orbiting nodes
        nodeMeshes.forEach((item) => {
          const angle = item.def.angle + elapsedTime * item.def.speed * 0.5;
          const x = Math.cos(angle) * item.def.radius;
          const z = Math.sin(angle) * item.def.radius;
          const y = Math.sin(elapsedTime * 1.2 + item.def.angle) * 0.25;

          item.mesh.position.set(x, y, z);

          // Update line geometry
          const positions = (item.line.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
          positions.setXYZ(1, x, y, z);
          positions.needsUpdate = true;
        });

        // Gentle particle drift
        particles.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handlePointerClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      coreWireGeometry.dispose();
      coreWireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] flex items-center justify-center">
      {/* Three.js viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        aria-label="Interactive 3D representation of Elifsi Technologies multi-product software ecosystem"
      />

      {/* Floating System Telemetry Card */}
      {activeNode && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm bg-white/95 backdrop-blur-md border border-[#E5E7EB] p-4 rounded-lg shadow-lg pointer-events-auto transition-all duration-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F51F3D]">
              {activeNode.category}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF1F3] text-[#D91432] font-semibold border border-[#F51F3D]/20">
              {activeNode.status}
            </span>
          </div>
          <h4 className="font-bold text-sm text-[#111827]">{activeNode.name}</h4>
          <p className="mt-1 text-xs text-[#667085] leading-relaxed">
            {activeNode.description}
          </p>
          <div className="mt-2.5 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#667085]">
            <span>Click any node in 3D space to inspect</span>
            <span className="font-mono text-[10px] text-[#F51F3D]">ELIFSI-SYS</span>
          </div>
        </div>
      )}

      {/* Decorative Spatial Grid Indicators */}
      <div className="absolute top-4 left-4 pointer-events-none select-none">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#667085]">
          <span className="w-2 h-2 rounded-full bg-[#F51F3D] animate-pulse" />
          <span>Ecosystem Graph · Spatial UI</span>
        </div>
      </div>
    </div>
  );
}
