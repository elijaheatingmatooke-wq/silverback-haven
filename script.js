/* ========================================
   SILVERBACK HAVEN - LUXURY WILDLIFE LODGE
   Main JavaScript - Enhanced Version
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initScrollProgress();
    initTopBar();
    initNavigation();
    initHeroSlider();
    initLetterAnimations();
    initScrollAnimations();
    initParallaxWaves();
    initCounterAnimation();
    initDragSlider();
    initBookingForm();
    initBookingBar();
    initBackToTop();
    initSmoothScroll();
    initImageReveal();
    initLanguageSwitcher();
});

/* ========================================
   PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            // Trigger initial animations after preloader
            triggerHeroAnimations();
        }, 2000);
    });
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .room-card, .experience-card, .destination-card, .gallery-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const submenuItems = document.querySelectorAll('.menu-item.has-submenu');

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Open menu
    menuToggle.addEventListener('click', function() {
        this.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu
    function closeMenu() {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'visible';
        // Reset submenus
        submenuItems.forEach(item => item.classList.remove('active'));
    }

    menuClose.addEventListener('click', closeMenu);

    // Close menu on link click (except submenu toggles)
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parentItem = this.closest('.menu-item');

            // If it has submenu, toggle it
            if (parentItem.classList.contains('has-submenu')) {
                e.preventDefault();
                parentItem.classList.toggle('active');
            } else {
                // Close menu and navigate
                closeMenu();
            }
        });
    });

    // Close menu on submenu link click
    const submenuLinks = document.querySelectorAll('.submenu a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on clicking outside content
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            closeMenu();
        }
    });
}

/* ========================================
   HERO SLIDER
   ======================================== */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const sliderBtns = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        sliderBtns.forEach(btn => btn.classList.remove('active'));

        slides[index].classList.add('active');
        sliderBtns[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            stopSlider();
            currentSlide = index;
            showSlide(currentSlide);
            startSlider();
        });
    });

    startSlider();

    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopSlider);
    hero.addEventListener('mouseleave', startSlider);
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .animate-text');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
}

/* ========================================
   LETTER-BY-LETTER ANIMATIONS
   ======================================== */
function initLetterAnimations() {
    const animatedTitles = document.querySelectorAll('.letter-animate');

    animatedTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';

        // Split into words and letters
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';

            word.split('').forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
                letterSpan.textContent = letter;
                letterSpan.style.transitionDelay = `${(wordIndex * 5 + letterIndex) * 30}ms`;
                wordSpan.appendChild(letterSpan);
            });

            title.appendChild(wordSpan);
            if (wordIndex < words.length - 1) {
                title.appendChild(document.createTextNode(' '));
            }
        });
    });

    // Observe for scroll trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    animatedTitles.forEach(title => observer.observe(title));
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-text, .animate-title, .fade-in, .slide-up');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Staggered card animations
    const cardGroups = document.querySelectorAll('.room-grid, .experience-grid, .dining-grid, .packages-slider, .testimonials-grid, .destinations-grid, .gallery-grid');

    cardGroups.forEach(group => {
        const cards = group.children;

        const cardObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150);
                });
                cardObserver.unobserve(group);
            }
        }, { threshold: 0.1 });

        cardObserver.observe(group);
    });
}

/* ========================================
   PARALLAX WAVE EFFECTS
   ======================================== */
function initParallaxWaves() {
    const waves = document.querySelectorAll('.wave-divider');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        waves.forEach(wave => {
            const rect = wave.getBoundingClientRect();
            const speed = wave.dataset.speed || 0.5;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = (rect.top - window.innerHeight) * speed;
                wave.style.transform = `translateY(${yPos * 0.1}px)`;
            }
        });
    });

    // Section parallax
    const parallaxSections = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const translateY = scrollPercent * 100 - 50;
                section.style.backgroundPositionY = `${translateY}%`;
            }
        });
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number, .counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

/* ========================================
   DRAG SLIDER FOR PACKAGES
   ======================================== */
function initDragSlider() {
    const sliders = document.querySelectorAll('.drag-slider');

    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}

/* ========================================
   IMAGE REVEAL ON SCROLL
   ======================================== */
function initImageReveal() {
    const revealImages = document.querySelectorAll('.reveal-image');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    revealImages.forEach(img => imageObserver.observe(img));
}

/* ========================================
   BOOKING FORM
   ======================================== */
function initBookingForm() {
    const form = document.getElementById('bookingForm');

    if (form) {
        const today = new Date().toISOString().split('T')[0];
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');

        if (checkInInput) {
            checkInInput.setAttribute('min', today);
            checkInInput.addEventListener('change', function() {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            if (!validateForm(data)) return;

            showNotification('Thank you! Your booking request has been received. We will contact you within 24 hours.', 'success');
            form.reset();
        });
    }

    function validateForm(data) {
        if (!data.checkIn || !data.checkOut) {
            showNotification('Please select check-in and check-out dates.', 'error');
            return false;
        }
        if (!data.name || data.name.trim() === '') {
            showNotification('Please enter your full name.', 'error');
            return false;
        }
        if (!data.email || !isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        return true;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');

    if (!scrollProgress) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

/* ========================================
   TOP BAR HIDE ON SCROLL
   ======================================== */
function initTopBar() {
    const topBar = document.querySelector('.top-bar');
    const header = document.querySelector('.header');

    if (!topBar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            topBar.classList.add('hidden');
            header.style.top = '0';
        } else {
            topBar.classList.remove('hidden');
            header.style.top = '45px';
        }

        lastScroll = currentScroll;
    });
}

/* ========================================
   BOOKING BAR
   ======================================== */
function initBookingBar() {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const searchBtn = document.querySelector('.booking-search-btn');

    if (!checkInInput || !checkOutInput) return;

    // Set minimum dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    checkInInput.min = formatDate(today);
    checkInInput.value = formatDate(today);

    checkOutInput.min = formatDate(tomorrow);
    checkOutInput.value = formatDate(tomorrow);

    // Update checkout min when checkin changes
    checkInInput.addEventListener('change', function() {
        const newMin = new Date(this.value);
        newMin.setDate(newMin.getDate() + 1);
        checkOutInput.min = formatDate(newMin);

        if (new Date(checkOutInput.value) <= new Date(this.value)) {
            checkOutInput.value = formatDate(newMin);
        }
    });

    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = bookingSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Show notification
                showNotification('Please fill out the booking form below to complete your reservation.', 'info');
            }
        });
    }
}

/* ========================================
   LANGUAGE SWITCHER
   ======================================== */
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show notification (in a real app, this would trigger translation)
            const lang = this.dataset.lang.toUpperCase();
            showNotification(`Language switched to ${lang}. Translation coming soon!`, 'info');
        });
    });
}

/* ========================================
   SHOW NOTIFICATION HELPER
   ======================================== */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    document.body.appendChild(notification);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* ========================================
   NEWSLETTER FORM
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                const notification = document.createElement('div');
                notification.className = 'notification success show';
                notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas fa-check-circle"></i>
                        <span>Thank you for subscribing! Check your email for exclusive offers.</span>
                    </div>
                `;
                document.body.appendChild(notification);
                this.reset();
                setTimeout(() => notification.remove(), 4000);
            }
        });
    });
});

/* ========================================
   GALLERY LIGHTBOX
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                    <div class="lightbox-caption">${img.alt}</div>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            setTimeout(() => lightbox.classList.add('active'), 10);

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.closest('.lightbox-close')) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = 'visible';
                    }, 300);
                }
            });
        });
    });
});

/* ========================================
   SECTION REVEAL NUMBERS
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const sectionNumbers = document.querySelectorAll('.section-number');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    sectionNumbers.forEach(num => numberObserver.observe(num));
});

/* ========================================
   VIDEO MODAL (for cultural section)
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const playBtns = document.querySelectorAll('.play-btn');

    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <button class="video-modal-close"><i class="fas fa-times"></i></button>
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Video content would play here</p>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            setTimeout(() => modal.classList.add('active'), 10);

            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.closest('.video-modal-close')) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'visible';
                    }, 300);
                }
            });
        });
    });
});
