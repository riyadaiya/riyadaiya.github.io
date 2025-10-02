(function() {

console.log("main.js loaded");

// Get the SVG element
const svg = document.querySelector('#skills-chart');

// Set SVG dimensions
const width = 800;
const height = 500;
svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

// Create tooltip group
const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
tooltip.style.opacity = '0';
tooltip.style.transition = 'opacity 0.3s ease';
tooltip.style.pointerEvents = 'none';

const tooltipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
tooltipRect.setAttribute('fill', '#1a1a1a');
tooltipRect.setAttribute('rx', '6');
tooltipRect.setAttribute('height', '35');

const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
tooltipText.setAttribute('fill', '#fff');
tooltipText.setAttribute('font-size', '14');
tooltipText.setAttribute('font-weight', '500');

tooltip.appendChild(tooltipRect);
tooltip.appendChild(tooltipText);
svg.appendChild(tooltip);

// Sample data - Design Skills
const skills = [
    { name: 'Figma', value: 95, color: '#0066cc' },
    { name: 'User Testing', value: 88, color: '#0052a3' },
    { name: 'Accessibility', value: 90, color: '#0080ff' },
    { name: 'Problem Solving', value: 92, color: '#0066cc' },
    { name: 'Prototyping', value: 85, color: '#0052a3' },
    { name: 'User Research', value: 87, color: '#0080ff' }
];

// Create title
const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
title.setAttribute('x', width / 2);
title.setAttribute('y', 40);
title.setAttribute('text-anchor', 'middle');
title.setAttribute('font-size', '24');
title.setAttribute('font-weight', '600');
title.setAttribute('fill', '#1a1a1a');
title.textContent = 'Design Skills Overview';
svg.appendChild(title);

// Bar chart parameters
const barHeight = 40;
const barSpacing = 15;
const maxBarWidth = 500;
const startX = 150;
const startY = 80;

// Create bars with animation
skills.forEach((skill, index) => {
    const y = startY + (index * (barHeight + barSpacing));
    
    // Background bar
    const bgBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgBar.setAttribute('x', startX);
    bgBar.setAttribute('y', y);
    bgBar.setAttribute('width', maxBarWidth);
    bgBar.setAttribute('height', barHeight);
    bgBar.setAttribute('fill', '#f0f0f0');
    bgBar.setAttribute('rx', '8');
    svg.appendChild(bgBar);
    
    // Animated bar
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', startX);
    bar.setAttribute('y', y);
    bar.setAttribute('width', '0');
    bar.setAttribute('height', barHeight);
    bar.setAttribute('fill', skill.color);
    bar.setAttribute('rx', '8');
    bar.style.transition = 'width 1s ease-out, fill 0.3s ease';
    bar.style.cursor = 'pointer';
    svg.appendChild(bar);
    
    // Animate bar on load
    setTimeout(() => {
        bar.setAttribute('width', (skill.value / 100) * maxBarWidth);
    }, index * 100);
    
    // Hover effect
    bar.addEventListener('mouseenter', () => {
        bar.setAttribute('fill', '#0080ff');
        bar.setAttribute('height', barHeight + 5);
        bar.setAttribute('y', y - 2.5);
        
        // Show tooltip
        const tooltipMessage = `${skill.name}: ${skill.value}% proficiency`;
        tooltipText.textContent = tooltipMessage;
        
        const textWidth = tooltipText.getComputedTextLength();
        tooltipRect.setAttribute('width', textWidth + 20);
        
        const tooltipX = startX + (skill.value / 100) * maxBarWidth / 2 - (textWidth + 20) / 2;
        const tooltipY = y - 45;
        
        tooltipRect.setAttribute('x', tooltipX);
        tooltipRect.setAttribute('y', tooltipY);
        tooltipText.setAttribute('x', tooltipX + 10);
        tooltipText.setAttribute('y', tooltipY + 22);
        
        tooltip.style.opacity = '1';
    });
    
    bar.addEventListener('mouseleave', () => {
        bar.setAttribute('fill', skill.color);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('y', y);
        
        // Hide tooltip
        tooltip.style.opacity = '0';
    });
    
    // Skill label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', startX - 10);
    label.setAttribute('y', y + barHeight / 2 + 5);
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('font-size', '14');
    label.setAttribute('font-weight', '500');
    label.setAttribute('fill', '#333');
    label.textContent = skill.name;
    svg.appendChild(label);
    
    // Value label
    const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    valueLabel.setAttribute('x', startX + (skill.value / 100) * maxBarWidth + 15);
    valueLabel.setAttribute('y', y + barHeight / 2 + 5);
    valueLabel.setAttribute('font-size', '14');
    valueLabel.setAttribute('font-weight', '600');
    valueLabel.setAttribute('fill', skill.color);
    valueLabel.textContent = skill.value + '%';
    valueLabel.style.opacity = '0';
    valueLabel.style.transition = 'opacity 0.5s ease';
    svg.appendChild(valueLabel);
    
    // Show value label after animation
    setTimeout(() => {
        valueLabel.style.opacity = '1';
    }, (index * 100) + 1000);
});

// Add interactive legend
const legendY = startY + (skills.length * (barHeight + barSpacing)) + 30;
const legendText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
legendText.setAttribute('x', width / 2);
legendText.setAttribute('y', legendY);
legendText.setAttribute('text-anchor', 'middle');
legendText.setAttribute('font-size', '12');
legendText.setAttribute('fill', '#666');
legendText.textContent = 'Hover over bars to see details';
svg.appendChild(legendText);

console.log("Visualization created successfully!"); 

})();