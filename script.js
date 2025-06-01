// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    const navHeight = document.querySelector('.nav-container').offsetHeight;
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + navHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initialize on load
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.nav-container');
    
    function updateNavbarOpacity() {
        const scrollPosition = window.scrollY;
        const opacity = Math.min(scrollPosition / 100, 1);
        navbar.style.background = `rgba(13, 17, 23, ${0.8 + opacity * 0.2})`;
    }
    
    window.addEventListener('scroll', updateNavbarOpacity);
    updateNavbarOpacity(); // Initialize on load
});

// Expandable work sections
function toggleExpand(sectionId) {
    const workItem = document.querySelector(`#${sectionId}-content`).closest('.work-item');
    workItem.classList.toggle('expanded');
    
    // Update expand icon rotation
    const expandIcon = workItem.querySelector('.expand-icon');
    if (workItem.classList.contains('expanded')) {
        expandIcon.style.transform = 'rotate(180deg)';
    } else {
        expandIcon.style.transform = 'rotate(0deg)';
    }
}

// Make toggleExpand globally accessible for inline onclick handlers
window.toggleExpand = toggleExpand;

// Typing animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-animation');
    const text = 'whoami --verbose';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeText, 100);
        } else {
            // Reset and restart after a pause
            setTimeout(() => {
                index = 0;
                typingElement.textContent = '';
                typeText();
            }, 3000);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 1000);
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.section, .project-card, .book-category');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Tech tag hover effects
document.addEventListener('DOMContentLoaded', function() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Constellation Network Visualization
document.addEventListener('DOMContentLoaded', function() {
    initializeConstellationNetwork();
});

function initializeConstellationNetwork() {
    const canvas = document.getElementById('network-canvas-element');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size to match CSS size for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 180 * dpr;
    canvas.height = 180 * dpr;
    ctx.scale(dpr, dpr);
    
    // Canvas styling
    canvas.style.width = '180px';
    canvas.style.height = '180px';
    
    // Network configuration - 20 nodes with sparse but connected topology
    const nodes = [
        // Constellation clusters centered across full canvas height (20-160 range)
        { id: 0, x: 20, y: 45 }, { id: 1, x: 55, y: 30 }, { id: 2, x: 30, y: 70 },
        { id: 3, x: 65, y: 35 }, { id: 4, x: 105, y: 60 }, { id: 5, x: 50, y: 85 },
        { id: 6, x: 110, y: 25 }, { id: 7, x: 140, y: 65 }, { id: 8, x: 140, y: 40 },
        { id: 9, x: 150, y: 55 }, { id: 10, x: 125, y: 80 }, { id: 11, x: 170, y: 70 },
        { id: 12, x: 15, y: 120 }, { id: 13, x: 60, y: 145 }, { id: 14, x: 80, y: 115 },
        { id: 15, x: 115, y: 135 }, { id: 16, x: 145, y: 155 }, { id: 17, x: 155, y: 130 },
        { id: 18, x: 168, y: 160 }, { id: 19, x: 170, y: 140 }
    ];
    
    // Sparse connections ensuring full connectivity (minimum spanning tree + strategic additions)
    const connections = [
        // Core backbone ensuring connectivity
        [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
        [2, 12], [12, 13], [13, 14], [5, 14], [14, 15], [15, 16], [7, 16], [16, 17], [17, 18], [18, 19], [11, 19],
        // Strategic cross-connections for realistic network topology
        [0, 12], [4, 15], [8, 17], [6, 9], [13, 15]
    ];
    
    let autoTrafficInterval;
    let mousePosition = { x: 0, y: 0 };
    let isMouseInCanvas = false;
    let originalPositions = [];
    let currentPositions = [];
    let trafficPackets = [];
    let animationId = null;
    let nodeActivations = []; // Track which nodes are flashing
    
    // Initialize positions and activations
    originalPositions = nodes.map(node => ({ x: node.x, y: node.y }));
    currentPositions = nodes.map(node => ({ x: node.x, y: node.y }));
    nodeActivations = nodes.map(() => ({ active: false, startTime: 0, duration: 600 }));
    
    // Canvas drawing functions
    function drawConnections() {
        ctx.strokeStyle = '#30366d';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.6;
        
        connections.forEach(([from, to]) => {
            const fromPos = currentPositions[from];
            const toPos = currentPositions[to];
            
            ctx.beginPath();
            ctx.moveTo(fromPos.x, fromPos.y);
            ctx.lineTo(toPos.x, toPos.y);
            ctx.stroke();
        });
        
        ctx.globalAlpha = 1;
    }
    
    function drawNodes() {
        const currentTime = Date.now();
        
        nodes.forEach((node, index) => {
            const pos = currentPositions[index];
            const activation = nodeActivations[index];
            
            // Check if node should be flashing
            let isFlashing = false;
            let flashIntensity = 0;
            
            if (activation.active) {
                const elapsed = currentTime - activation.startTime;
                if (elapsed < activation.duration) {
                    isFlashing = true;
                    // Create pulsing effect that fades out
                    const progress = elapsed / activation.duration;
                    flashIntensity = Math.sin(elapsed * 0.02) * (1 - progress) * 0.8;
                } else {
                    activation.active = false;
                }
            }
            
            // Base colors (blue theme)
            let glowColor1 = '#58a6ff'; // Blue
            let glowColor2 = '#79c0ff'; // Light Blue
            let coreColor = '#58a6ff';  // Blue
            
            // Enhanced colors when flashing
            if (isFlashing) {
                glowColor1 = '#ffffff';
                glowColor2 = '#aaccff';
                coreColor = '#ffffff';
            }
            
            // Node glow with variable intensity
            const glowRadius = 4 + (isFlashing ? flashIntensity * 4 : 0);
            const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius);
            gradient.addColorStop(0, glowColor2);
            gradient.addColorStop(0.4, `rgba(88, 166, 255, ${isFlashing ? flashIntensity * 0.6 : 0.4})`);
            gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Node core
            ctx.fillStyle = coreColor;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, isFlashing ? 4 : 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function drawTrafficPackets() {
        trafficPackets.forEach(packet => {
            const gradient = ctx.createRadialGradient(packet.x, packet.y, 0, packet.x, packet.y, 3);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, '#58a6ff');
            gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(packet.x, packet.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function render() {
        // Clear canvas
        ctx.clearRect(0, 0, 180, 180);
        
        // Draw in order: connections, nodes, traffic
        drawConnections();
        drawNodes();
        drawTrafficPackets();
    }
    
    // Activate node flash when packet arrives
    function activateNode(nodeId) {
        nodeActivations[nodeId].active = true;
        nodeActivations[nodeId].startTime = Date.now();
    }
    
    // Mouse repulsion system
    function updateNodePositions() {
        if (!isMouseInCanvas) {
            // Return nodes to original positions
            originalPositions.forEach((original, index) => {
                currentPositions[index] = { x: original.x, y: original.y };
            });
        } else {
            // Apply repulsion effect
            originalPositions.forEach((original, index) => {
                const dx = original.x - mousePosition.x;
                const dy = original.y - mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Repulsion settings
                const repulsionRadius = 50;
                const maxRepulsion = 15;
                
                if (distance < repulsionRadius && distance > 0) {
                    // Calculate repulsion force
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    const repulsionDistance = force * maxRepulsion;
                    
                    // Normalize direction vector
                    const dirX = dx / distance;
                    const dirY = dy / distance;
                    
                    // Apply repulsion
                    const newX = original.x + dirX * repulsionDistance;
                    const newY = original.y + dirY * repulsionDistance;
                    
                    // Constrain to canvas bounds
                    const constrainedX = Math.max(10, Math.min(170, newX));
                    const constrainedY = Math.max(10, Math.min(170, newY));
                    
                    currentPositions[index] = { x: constrainedX, y: constrainedY };
                } else {
                    currentPositions[index] = { x: original.x, y: original.y };
                }
            });
        }
    }
    
    // Create traffic animation between two nodes
    function createTrafficPacket(fromNodeId, toNodeId, delay = 0) {
        setTimeout(() => {
            const packet = {
                fromId: fromNodeId,
                toId: toNodeId,
                startTime: Date.now(),
                duration: 1800,
                x: currentPositions[fromNodeId].x,
                y: currentPositions[fromNodeId].y
            };
            
            trafficPackets.push(packet);
        }, delay);
    }
    
    // Update traffic packets animation
    function updateTrafficPackets() {
        const currentTime = Date.now();
        
        trafficPackets = trafficPackets.filter(packet => {
            const elapsed = currentTime - packet.startTime;
            const progress = Math.min(elapsed / packet.duration, 1);
            
            if (progress >= 1) {
                // Packet has reached destination, activate the node and remove packet
                activateNode(packet.toId);
                return false;
            }
            
            // Smooth easing function
            const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            // Get current positions (they might be moving due to mouse)
            const fromPos = currentPositions[packet.fromId];
            const toPos = currentPositions[packet.toId];
            
            // Update packet position
            packet.x = fromPos.x + (toPos.x - fromPos.x) * easeProgress;
            packet.y = fromPos.y + (toPos.y - fromPos.y) * easeProgress;
            
            return true;
        });
    }
    
    
    // Automatic random traffic generation
    function generateRandomTraffic() {
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        const [from, to] = randomConnection;
        
        // Random direction
        if (Math.random() > 0.5) {
            createTrafficPacket(from, to);
        } else {
            createTrafficPacket(to, from);
        }
    }
    
    function startAutoTraffic() {
        // Ensure we don't have multiple intervals running
        if (autoTrafficInterval) {
            clearInterval(autoTrafficInterval);
        }
        
        autoTrafficInterval = setInterval(() => {
            // Generate 150% more traffic (2.5x the original amount)
            const packetCount = Math.floor(Math.random() * 7) + 2; // 2-8 packets instead of 1-3
            for (let i = 0; i < packetCount; i++) {
                setTimeout(() => generateRandomTraffic(), i * 200); // Reduced delay between packets
            }
        }, 1600); // Reduced interval from 2000ms to 1600ms
    }
    
    // Main animation loop
    function animate() {
        updateNodePositions();
        updateTrafficPackets();
        render();
        animationId = requestAnimationFrame(animate);
    }
    
    // Start automatic traffic after initial delay
    setTimeout(startAutoTraffic, 1500);
    
    // Start the animation loop
    animate();
    
    // Mouse tracking for repulsion effect
    const networkCanvas = document.getElementById('network-canvas');
    if (networkCanvas) {
        networkCanvas.addEventListener('mouseenter', () => {
            isMouseInCanvas = true;
        });
        
        networkCanvas.addEventListener('mouseleave', () => {
            isMouseInCanvas = false;
        });
        
        networkCanvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = 180 / rect.width;
            const scaleY = 180 / rect.height;
            
            mousePosition.x = (e.clientX - rect.left) * scaleX;
            mousePosition.y = (e.clientY - rect.top) * scaleY;
        });
    }
}

// ES6 imports for Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 3D Model Loading for Amperia
document.addEventListener('DOMContentLoaded', function() {
    initializeAmperiaModel();
});

function initializeAmperiaModel() {
    const canvas = document.getElementById('amperia-canvas');
    const container = document.getElementById('model-container');
    
    if (!canvas || !container) {
        console.log('Canvas or container not found');
        return;
    }
    
    console.log('Initializing 3D model viewer...');
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded properly');
        showStaticFallback();
        return;
    }
    
    try {
        // Set up Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true 
        });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add lighting - increased intensity for better contrast
    const ambientLight = new THREE.AmbientLight(0x58a6ff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const backLight = new THREE.DirectionalLight(0x7c3aed, 0.9);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);
    
    // Add additional rim lighting for better definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);
    
    // Load the GLB model
    const loader = new GLTFLoader();
    let model = null;
    
    console.log('Attempting to load Amperia.glb...');
    
    loader.load(
        './Amperia.glb',
        function (gltf) {
            console.log('Model loaded successfully!', gltf);
            model = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            console.log('Model dimensions:', size);
            
            // Scale to fit in view - increased size to fill container better
            const maxDimension = Math.max(size.x, size.y, size.z);
            const baseModelScale = 2.8 / maxDimension;
            model.scale.setScalar(baseModelScale);
            
            // Store base scale for hover effects
            window.amperiaBaseScale = baseModelScale;
            
            // Center the model
            model.position.sub(center.multiplyScalar(baseModelScale));
            
            // Enable shadows
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(model);
            console.log('Model added to scene');
        },
        function (progress) {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        function (error) {
            console.error('Error loading model:', error);
            console.log('Using fallback model instead');
            // Fallback: create a simple placeholder
            createFallbackModel();
        }
    );
    
    function createFallbackModel() {
        console.log('Creating fallback model - GLB failed to load');
        const geometry = new THREE.BoxGeometry(1.5, 0.5, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.8
        });
        model = new THREE.Mesh(geometry, material);
        
        // Add text to indicate this is a fallback
        const textGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 0.8, 0);
        
        const group = new THREE.Group();
        group.add(model);
        group.add(textMesh);
        
        scene.add(group);
        model = group; // Update model reference
    }
    
    // Position camera
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
    
    // Hover effect variables
    let isHovering = false;
    let targetScale = 1.0;
    let currentScale = 1.0;
    let baseRotationSpeed = 0.003;
    let currentRotationSpeed = 0.003;
    let animationRunning = false;
    
    // Animation loop
    function animate() {
        if (!animationRunning) return;
        requestAnimationFrame(animate);
        
        // Update hover effects
        if (isHovering) {
            targetScale = 1.1;
            currentRotationSpeed = baseRotationSpeed * 1.4;
        } else {
            targetScale = 1.0;
            currentRotationSpeed = baseRotationSpeed;
        }
        
        // Smooth scale transition
        currentScale += (targetScale - currentScale) * 0.1;
        
        // Rotate and scale the model
        if (model && window.amperiaBaseScale) {
            model.rotation.y += currentRotationSpeed;
            model.scale.setScalar(currentScale * window.amperiaBaseScale);
        }
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animationRunning = true;
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    // Handle container visibility changes
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationRunning) {
                animationRunning = true;
                animate();
            } else if (!entry.isIntersecting) {
                animationRunning = false;
            }
        });
    });
    
    observer.observe(container);
    
    // Add hover event listeners to container
    container.addEventListener('mouseenter', function() {
        isHovering = true;
    });
    
    container.addEventListener('mouseleave', function() {
        isHovering = false;
    });
    
    } catch (error) {
        console.error('Error initializing 3D viewer:', error);
        showStaticFallback();
    }
    
    function showStaticFallback() {
        console.log('Showing static fallback');
        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(45deg, #21262d, #161b22);
                border-radius: 12px;
                color: #58a6ff;
                font-family: 'JetBrains Mono', monospace;
                font-size: 12px;
                text-align: center;
                flex-direction: column;
                gap: 8px;
            ">
                <div style="font-size: 24px;">🔬</div>
                <div>Amperia Model</div>
                <div style="font-size: 10px; opacity: 0.6;">3D Viewer</div>
            </div>
        `;
    }
}

// Enhanced visual effects for placeholders
document.addEventListener('DOMContentLoaded', function() {
    // Legacy node animation for any remaining static nodes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add subtle animation to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const placeholder = this.querySelector('.model-placeholder, .blockchain-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1.05)';
                placeholder.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const placeholder = this.querySelector('.model-placeholder, .blockchain-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1)';
            }
        });
    });
});

// Scroll-triggered animations for enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    let scrollTimeout;
    
    function handleScroll() {
        // Add scroll indicator
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Create or update scroll progress bar
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 60px;
                left: 0;
                width: ${scrolled}%;
                height: 2px;
                background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
                z-index: 1001;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = `${scrolled}%`;
        }
        
        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Hide progress bar after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (progressBar) {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    if (progressBar && progressBar.parentNode) {
                        progressBar.parentNode.removeChild(progressBar);
                    }
                }, 300);
            }
        }, 1000);
    }
    
    window.addEventListener('scroll', handleScroll);
});

// Energy Usage Charts
document.addEventListener('DOMContentLoaded', function() {
    initializeEnergyCharts();
});

function initializeEnergyCharts() {
    createEnergyChart('energy-chart-canvas-1', 'energy-chart-1', 
        [
            { name: 'Bitcoin\n(PoW)', value: 91, color: '#ff7b72', unit: 'TWh/year' },
            { name: 'Ethereum\n(PoS)', value: 6.6, color: '#ffa657', unit: 'TWh/year' }
        ],
        'Traditional Blockchains'
    );
    
    createEnergyChart('energy-chart-canvas-2', 'energy-chart-2',
        [
            { name: 'Ethereum\n(PoS)', value: 6.6, color: '#ffa657', unit: 'TWh/year' },
            { name: 'Our\nProtocol', value: 0.0001, color: '#56d364', unit: 'TWh/year' }
        ],
        'Our Innovation'
    );
}

function createEnergyChart(canvasId, containerId, data, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = document.getElementById(containerId);
    
    // Set up canvas for high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 350 * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = '350px';
    canvas.style.height = '200px';
    
    // Chart dimensions
    const margin = { top: 35, right: 30, bottom: 50, left: 60 };
    const chartWidth = 350 - margin.left - margin.right;
    const chartHeight = 200 - margin.top - margin.bottom;
    
    // Animation state
    let animationProgress = 0;
    let isVisible = false;
    
    // Scale functions
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = chartWidth / data.length * 0.5;
    const barSpacing = chartWidth / data.length;
    
    function drawChart() {
        // Clear canvas
        ctx.clearRect(0, 0, 350, 200);
        
        // Set font
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        
        // Draw title
        ctx.fillStyle = '#f0f6fc';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(title, 175, 20);
        
        // Draw bars with animation
        data.forEach((item, index) => {
            const x = margin.left + index * barSpacing + (barSpacing - barWidth) / 2;
            const animatedValue = item.value * animationProgress;
            const barHeight = (animatedValue / maxValue) * chartHeight;
            const y = margin.top + chartHeight - barHeight;
            
            // Draw bar with gradient
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, item.color);
            gradient.addColorStop(1, item.color + '80');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw bar outline
            ctx.strokeStyle = item.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, barWidth, barHeight);
            
            // Draw value labels (only show when animation is complete)
            if (animationProgress > 0.95) {
                ctx.fillStyle = '#f0f6fc';
                ctx.font = '9px Inter, sans-serif';
                const displayValue = item.value < 0.001 ? '< 0.001' : item.value.toString();
                ctx.fillText(displayValue + ' ' + item.unit, x + barWidth/2, y - 5);
            }
            
            // Draw x-axis labels
            ctx.fillStyle = '#8b949e';
            ctx.font = '9px Inter, sans-serif';
            const lines = item.name.split('\n');
            lines.forEach((line, lineIndex) => {
                ctx.fillText(line, x + barWidth/2, margin.top + chartHeight + 15 + lineIndex * 10);
            });
        });
        
        // Draw y-axis
        ctx.strokeStyle = '#30363d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, margin.top + chartHeight);
        ctx.stroke();
        
        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top + chartHeight);
        ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
        ctx.stroke();
        
        // Y-axis label
        ctx.save();
        ctx.translate(15, margin.top + chartHeight/2);
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle = '#8b949e';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TWh/year', 0, 0);
        ctx.restore();
    }
    
    function animate() {
        if (isVisible && animationProgress < 1) {
            animationProgress += 0.001;
            drawChart();
            requestAnimationFrame(animate);
        } else if (isVisible) {
            drawChart(); // Final draw
        }
    }
    
    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isVisible) {
                isVisible = true;
                animationProgress = 0;
                setTimeout(() => animate(), canvasId === 'energy-chart-canvas-2' ? 500 : 0); // Delay second chart
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(container);
    
    // Initial draw
    drawChart();
}