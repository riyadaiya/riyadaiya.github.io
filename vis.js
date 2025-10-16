(function() {

console.log("vis.js loaded");

// Get the SVG element
const svg = document.querySelector('#svg-art');

// Set SVG dimensions
const width = 800;
const height = 600;
svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

// Create gradient definitions
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

// Gradient 1 - Blue to Purple
const gradient1 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
gradient1.setAttribute('id', 'grad1');
gradient1.setAttribute('x1', '0%');
gradient1.setAttribute('y1', '0%');
gradient1.setAttribute('x2', '100%');
gradient1.setAttribute('y2', '100%');

const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop1.setAttribute('offset', '0%');
stop1.setAttribute('stop-color', '#0066cc');
const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop2.setAttribute('offset', '100%');
stop2.setAttribute('stop-color', '#9933ff');

gradient1.appendChild(stop1);
gradient1.appendChild(stop2);
defs.appendChild(gradient1);

// Gradient 2 - Cyan to Blue
const gradient2 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
gradient2.setAttribute('id', 'grad2');
gradient2.setAttribute('x1', '0%');
gradient2.setAttribute('y1', '0%');
gradient2.setAttribute('x2', '100%');
gradient2.setAttribute('y2', '100%');

const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop3.setAttribute('offset', '0%');
stop3.setAttribute('stop-color', '#00d4ff');
const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop4.setAttribute('offset', '100%');
stop4.setAttribute('stop-color', '#0080ff');

gradient2.appendChild(stop3);
gradient2.appendChild(stop4);
defs.appendChild(gradient2);

svg.appendChild(defs);

// Background
const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
bg.setAttribute('width', width);
bg.setAttribute('height', height);
bg.setAttribute('fill', '#fafafa');
svg.appendChild(bg);

// Title
const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
title.setAttribute('x', width / 2);
title.setAttribute('y', 40);
title.setAttribute('text-anchor', 'middle');
title.setAttribute('font-size', '28');
title.setAttribute('font-weight', '700');
title.setAttribute('fill', '#1a1a1a');
title.textContent = 'SVG Art: Flow';
svg.appendChild(title);

// Create animated circles
function createCircle(cx, cy, r, color, delay) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', '0');
    circle.setAttribute('fill', color);
    circle.setAttribute('opacity', '0.15');
    circle.style.transition = 'r 2s ease, opacity 0.3s ease';
    circle.style.cursor = 'pointer';
    
    svg.appendChild(circle);
    
    setTimeout(() => {
        circle.setAttribute('r', r);
    }, delay);
    
    // Hover effect
    circle.addEventListener('mouseenter', () => {
        circle.style.opacity = '0.4';
        circle.setAttribute('r', r + 10);
    });
    
    circle.addEventListener('mouseleave', () => {
        circle.style.opacity = '0.15';
        circle.setAttribute('r', r);
    });
}

// Add decorative circles
createCircle(150, 200, 60, '#0066cc', 500);
createCircle(650, 250, 80, '#9933ff', 800);
createCircle(400, 450, 70, '#00d4ff', 1100);
createCircle(200, 500, 50, '#0080ff', 1400);

// Create geometric pattern overlay
function createGeometricPattern(x, y, size, rotation, delay) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('transform', `translate(${x}, ${y}) rotate(${rotation})`);
    group.style.opacity = '0';
    group.style.transition = 'opacity 1s ease, transform 0.5s ease';
    group.style.cursor = 'pointer';
    
    // Create hexagon
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        points.push(`${px},${py}`);
    }
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', 'none');
    polygon.setAttribute('stroke', '#0066cc');
    polygon.setAttribute('stroke-width', '2');
    
    group.appendChild(polygon);
    svg.appendChild(group);
    
    setTimeout(() => {
        group.style.opacity = '0.4';
    }, delay);
    
    // Hover effect
    group.addEventListener('mouseenter', () => {
        group.style.opacity = '0.8';
        group.style.transform = `translate(${x}px, ${y}px) rotate(${rotation + 45}deg) scale(1.1)`;
    });
    
    group.addEventListener('mouseleave', () => {
        group.style.opacity = '0.4';
        group.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(1)`;
    });
}

// Add geometric patterns
createGeometricPattern(120, 180, 30, 0, 1600);
createGeometricPattern(680, 280, 40, 30, 1800);
createGeometricPattern(420, 150, 25, 60, 2000);
createGeometricPattern(600, 450, 35, 15, 2200);

// Footer text
const footer = document.createElementNS('http://www.w3.org/2000/svg', 'text');
footer.setAttribute('x', width / 2);
footer.setAttribute('y', height - 20);
footer.setAttribute('text-anchor', 'middle');
footer.setAttribute('font-size', '12');
footer.setAttribute('fill', '#666');
footer.textContent = 'Hover over elements to interact';
footer.style.opacity = '0';
footer.style.transition = 'opacity 1s ease';
svg.appendChild(footer);

setTimeout(() => {
    footer.style.opacity = '1';
}, 2500);

console.log("Creative SVG art created successfully!");

})();