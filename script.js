/**
 * Portfolio Site JavaScript
 * Messaoudi Moncef - Cybersecurity Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. AMBIENT CURSOR GLOW
    // ==========================================================================
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            // Smoothly move the glow to follow the cursor position
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // ==========================================================================
    // 2. TERMINAL TYPEWRITER EFFECT
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Beginner SOC Analyst.",
        "Cybersecurity Student.",
        "Blue Team Enthusiast.",
        "CTF Player."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting is faster
        } else {
            // Add character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        // Handle word completions and deletions
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Loop back to start
            typeSpeed = 500; // Small pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    typeEffect();

    // ==========================================================================
    // 3. MOBILE MENU TOGGLE DRAWER
    // ==========================================================================
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileNavToggle && mobileDrawer) {
        // Toggle mobile nav on burger click
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('open');
            mobileDrawer.classList.toggle('open');
            // Prevent scrolling on body when drawer is open
            document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
        });

        // Close drawer when clicking any nav link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('open');
                mobileDrawer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // Offset for navbar height
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ==========================================================================
    // 5. PROJECT CARDS FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button style
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    // Smoothly show card
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    // Smoothly hide card
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition to finish
                }
            });
        });
    });

    // ==========================================================================
    // 6. SCROLL REVEAL & SKILLS PROGRESS ANIMATION (INTERSECTION OBSERVER)
    // ==========================================================================
    
    // Store original progress widths and reset them to 0% for animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressWidths = [];
    
    progressBars.forEach((bar, index) => {
        // Save the target inline style width (e.g. "80%")
        progressWidths[index] = bar.style.width;
        // Reset to 0% so it animates when it enters the viewport
        bar.style.width = '0%';
    });

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to reveal element
                entry.target.classList.add('active');
                
                // If the revealed element contains progress bars, animate them
                const barsInElement = entry.target.querySelectorAll('.progress-bar');
                barsInElement.forEach(bar => {
                    // Find index of this bar in the global list to get its target width
                    const globalIndex = Array.from(progressBars).indexOf(bar);
                    if (globalIndex !== -1) {
                        bar.style.width = progressWidths[globalIndex];
                    }
                });

                // Unobserve since animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12, // Trigger when 12% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset trigger point
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 7. SCROLL-TO-TOP BUTTON
    // ==========================================================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 8. INTERACTIVE CONTACT FORM VALIDATION & MOCK SUBMIT
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    if (contactForm && formAlert && formSubmitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const subject = document.getElementById('formSubject').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            // Simple client-side checks
            if (!name || !email || !subject || !message) {
                showAlert('All fields are required. Check and try again.', 'error');
                return;
            }

            // Lock submit button
            formSubmitBtn.disabled = true;
            const originalBtnHtml = formSubmitBtn.innerHTML;
            formSubmitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Encrypting &amp; Sending...';

            // Simulate server network delay
            setTimeout(() => {
                // Reset form values
                contactForm.reset();
                
                // Show success alert
                showAlert('Secure transmission success! Message sent successfully. Moncef will contact you shortly.', 'success');
                
                // Restore submit button
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnHtml;

                // Hide success message automatically after 6 seconds
                setTimeout(() => {
                    formAlert.style.display = 'none';
                    formAlert.className = 'form-alert';
                }, 6000);

            }, 1800);
        });

        function showAlert(msg, type) {
            formAlert.textContent = msg;
            formAlert.className = 'form-alert'; // Reset
            formAlert.classList.add(type);
        }
    }

    // ==========================================================================
    // 9. DOWNLOAD CV BUTTON INTERACTIVE FEEDBACK
    // ==========================================================================
    const downloadCVBtn = document.getElementById('downloadCVBtn');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Moncef is currently updating his CV / Resume with his latest academic projects and SOC lab reports. It will be available for download here very soon!\n\nIn the meantime, feel free to contact him directly via the contact form or LinkedIn.");
        });
    }
});
