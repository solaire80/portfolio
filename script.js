/**
 * Moncef Messaoudi — Portfolio Script
 * Handles: Live Alert Console Feed, Scroll-based headers, and form verification
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. LIVE ALERT FEED GENERATOR
    // ==========================================================================
    const alerts = [
        {lvl:'MED', cls:'lvl-med', id:'92657', desc:'Successful Remote Logon Detected — NTLM'},
        {lvl:'MED', cls:'lvl-med', id:'67028', desc:'Special privileges assigned to new logon'},
        {lvl:'CRIT', cls:'lvl-crit', id:'92650', desc:'Suspicious service created from admin share'},
        {lvl:'MED', cls:'lvl-med', id:'92218', desc:'Possible abuse of Windows admin shares'},
        {lvl:'INFO', cls:'lvl-info', id:'60137', desc:'Windows User Logoff'},
        {lvl:'MED', cls:'lvl-med', id:'60122', desc:'Logon Failure — bad password'},
        {lvl:'HIGH', cls:'lvl-high', id:'60115', desc:'User account locked out'},
        {lvl:'HIGH', cls:'lvl-high', id:'60204', desc:'Multiple Windows Logon Failures'},
        {lvl:'INFO', cls:'lvl-info', id:'92307', desc:'New service creation in registry'},
        {lvl:'MED', cls:'lvl-med', id:'92052', desc:'Cmd started by an abnormal process'},
    ];

    const track = document.getElementById('feedTrack');
    if (track) {
        // Build the alert lines
        const buildAlertsHTML = () => alerts.map(a => `
            <div class="alert-row">
                <span class="lvl ${a.cls}">${a.lvl}</span>
                <span class="rid">#${a.id}</span>
                <span class="desc">${a.desc}</span>
            </div>
        `).join('');

        // Duplicate alert feed items to allow seamless infinite loop
        track.innerHTML = buildAlertsHTML() + buildAlertsHTML();
    }

    // ==========================================================================
    // 2. HEADER SCROLL BORDER EFFECT
    // ==========================================================================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 8px 30px -10px rgba(0, 0, 0, 0.5)';
            header.style.background = 'rgba(9, 13, 18, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(9, 13, 18, 0.85)';
        }
    }, { passive: true });

    // ==========================================================================
    // 3. SECURE ACTIVE NAV HIGHLIGHTING
    // ==========================================================================
    const navLinks = document.querySelectorAll('.navlinks a:not(.cta)');
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.style.color = 'var(--accent)';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(sec => sectionObserver.observe(sec));

});
