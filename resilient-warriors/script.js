document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-btn, .logo[data-target]');
    const sections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Navigation
    window.navigateTo = (targetId) => {
        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));
        
        // Remove active class from navs
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        // Show target
        const targetSec = document.getElementById(targetId);
        if (targetSec) targetSec.classList.add('active');

        // Highlight nav
        const activeNav = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Close mobile menu if open
        navLinksContainer.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Nav click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-target');
            if (target) navigateTo(target);
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinksContainer.classList.toggle('open');
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // AI Chat
    const chatInput = document.getElementById('ai-input');
    const sendBtn = document.getElementById('send-ai-btn');
    const chatHistory = document.getElementById('chat-history');

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-bubble user';
        userDiv.textContent = text;
        chatHistory.appendChild(userDiv);
        
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Mock AI response
        setTimeout(() => {
            let response = `Here is general advice for "<em>${text}</em>":<br><br>Ensure you follow NDMA protocol. Avoid affected areas, tune into local emergency broadcasts, and deploy your emergency kit if evacuation is mandated.`;
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes("earthquake")) {
                response = "<strong>Earthquake Advisory:</strong><br>1. DROP, COVER, and HOLD ON immediately.<br>2. Stay away from glass, windows, outside doors and walls.<br>3. Do NOT use elevators.<br>4. If outdoors, move away from buildings, streetlights, and utility wires.";
            } else if (lowerText.includes("fire")) {
                response = "<strong>Fire Emergency:</strong><br>1. Evacuate the area immediately using stairs, not elevators.<br>2. If there is smoke, stay low to the ground.<br>3. Check doors for heat with the back of your hand before opening.<br>4. Call emergency services (112) once safe.";
            } else if (lowerText.includes("flood") || lowerText.includes("water")) {
                response = "<strong>Flood Warning:</strong><br>1. Move to higher ground immediately.<br>2. Do NOT walk, swim or drive through flood waters. Turn Around, Don't Drown!<br>3. Stay off bridges over fast-moving water.";
            } else if (lowerText.includes("war") || lowerText.includes("bomb") || lowerText.includes("attack") || lowerText.includes("missile")) {
                response = "<strong>Conflict/Attack Alert:</strong><br>1. Seek shelter immediately, preferably underground or in an interior room without windows.<br>2. Stay away from exterior walls.<br>3. Monitor official emergency broadcasts for all-clear signals.";
            } else if (lowerText.includes("medical") || lowerText.includes("bleed") || lowerText.includes("hurt") || lowerText.includes("injury")) {
                response = "<strong>Medical Emergency:</strong><br>1. If severe bleeding occurs, apply firm, direct pressure with a clean cloth.<br>2. Do not move a person with suspected spine injuries unless absolutely necessary.<br>3. Call 112 for professional medical help.";
            } else if (lowerText.includes("kit") || lowerText.includes("bag") || lowerText.includes("supplies") || lowerText.includes("prepare")) {
                response = "<strong>Emergency Kit Recommendations:</strong><br>1. Water (1 gallon per person per day for at least 3 days).<br>2. Non-perishable food (at least a 3-day supply).<br>3. Battery-powered or hand-crank radio.<br>4. Flashlight and extra batteries.<br>5. First aid kit.";
            }

            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-bubble ai';
            aiDiv.innerHTML = `<strong>ResQ-AI:</strong> ${response}`;
            chatHistory.appendChild(aiDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 1200);
    };

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // Emergency Modal Logic
    window.toggleSOS = () => {
        const modal = document.getElementById('sos-modal');
        if (modal) {
            modal.classList.toggle('show');
            // Reset location status on open/close
            const locStatus = document.getElementById('location-status');
            if (locStatus) {
                locStatus.classList.add('hidden');
                locStatus.innerHTML = 'Acquiring GPS coordinates...';
            }
        }
    };

    window.shareLocation = () => {
        const locStatus = document.getElementById('location-status');
        if (locStatus) {
            locStatus.classList.remove('hidden');
            locStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Acquiring highly accurate GPS coordinates...';
            
            // Mock delay for fetching location
            setTimeout(() => {
                const lat = (Math.random() * 180 - 90).toFixed(4);
                const lng = (Math.random() * 360 - 180).toFixed(4);
                locStatus.innerHTML = `<i class="fa-solid fa-check-circle"></i> Location broadcasted successfully.<br>LAT: ${lat}, LNG: ${lng}<br><span style="color:#F8FAFC;font-size:0.75rem;">Responders have been notified within a 5km radius.</span>`;
            }, 2500);
        }
    };
});

// Register Service Worker for Offline Capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
