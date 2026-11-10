/**
 * PORTFOLIO JAVASCRIPT - LANKE YAMINI
 * Handles typing effect, mobile navigation, active section tracking,
 * scroll reveals, back-to-top button, and contact form handling.
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // 1. TYPING EFFECT
    // -------------------------------------------------------------------------
    const roles = [
        "Python Developer",
        "Web Developer",
        "Data Analyst"
    ];

    const textElement = document.querySelector(".hero-typing .text");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!textElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        textElement.textContent = currentRole.substring(0, charIndex);

        let typingSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (textElement) {
        typeEffect();
    }

    // -------------------------------------------------------------------------
    // 2. MOBILE NAVIGATION MENU TOGGLE
    // -------------------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("nav-open");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close mobile nav when clicking any link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (navbar.classList.contains("nav-open")) {
                    navbar.classList.remove("nav-open");
                    const icon = menuToggle.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener("click", (e) => {
            if (
                navbar.classList.contains("nav-open") &&
                !navbar.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                navbar.classList.remove("nav-open");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. HEADER SCROLL STATE & ACTIVE SECTION HIGHLIGHTING
    // -------------------------------------------------------------------------
    const header = document.getElementById("header");
    const sections = document.querySelectorAll("section[id]");

    function handleScrollUpdates() {
        const scrollPosition = window.scrollY;

        // Header background enhancement on scroll
        if (header) {
            if (scrollPosition > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Active navigation link tracking
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        // Back-to-top button visibility
        const backToTopBtn = document.getElementById("back-to-top");
        if (backToTopBtn) {
            if (scrollPosition > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    }

    window.addEventListener("scroll", handleScrollUpdates, { passive: true });
    handleScrollUpdates(); // Initial call

    // -------------------------------------------------------------------------
    // 4. BACK TO TOP BUTTON SMOOTH SCROLL
    // -------------------------------------------------------------------------
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // -------------------------------------------------------------------------
    // 5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll(
        ".section-header, .glass-panel, .timeline-card, .project-card, .education-card, .cert-card"
    );

    revealElements.forEach((el) => {
        el.classList.add("reveal-on-scroll");
    });

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach((el) => el.classList.add("revealed"));
    }

    // -------------------------------------------------------------------------
    // 6. CONTACT FORM HANDLING (Direct Email Action)
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please fill in all required fields before submitting.");
                return;
            }

            // Construct mailto link with encoded parameters
            const recipient = "yaminilanke08@gmail.com";
            const fullSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
            const bodyContent = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via portfolio contact form`
            );

            const mailtoUrl = `mailto:${recipient}?subject=${fullSubject}&body=${bodyContent}`;

            // Open user's default email client
            window.location.href = mailtoUrl;
        });
    }
});
