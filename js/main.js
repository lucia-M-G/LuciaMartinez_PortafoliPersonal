// Mobile menu toggle - VERSIÓN ACTUALIZADA
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Copiar email al portapapeles - VERSIÓN CORREGIDA
    const copyEmailBtn = document.querySelector('.copy-email');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const email = this.getAttribute('data-email');
            
            // Método moderno
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showCopiedFeedback(this);
                }).catch(err => {
                    console.error('Error al copiar: ', err);
                    fallbackCopyTextToClipboard(email, this);
                });
            } else {
                // Método antiguo
                fallbackCopyTextToClipboard(email, this);
            }
        });
    }
    
    function showCopiedFeedback(element) {
        const originalText = element.textContent;
        const originalBg = element.style.backgroundColor;
        
        element.textContent = '¡Email copiat!';
        element.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.backgroundColor = originalBg;
        }, 2000);
    }
    
    function fallbackCopyTextToClipboard(text, element) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                showCopiedFeedback(element);
            }
        } catch (err) {
            console.error('Fallback error: ', err);
            document.body.removeChild(textArea);
            // Último recurso: abrir cliente de email
            window.location.href = `mailto:${text}`;
        }
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.info-card, .card, .timeline-content, .dafo-item, .task-card, .reflection-card, .strategy-card').forEach(el => {
        observer.observe(el);
    });
});