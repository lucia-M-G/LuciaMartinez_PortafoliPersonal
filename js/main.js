// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    const copyEmailBtn = document.querySelector('.copy-email');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Esto evita que la página se mueva
            e.stopPropagation(); // Esto también ayuda
            
            const email = this.getAttribute('data-email');
            console.log('Email a copiar:', email); // Para debuggear
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(email).then(() => {
                // Guardar el texto original y estilo
                const originalText = this.textContent;
                const originalBg = this.style.backgroundColor;
                
                // Mostrar confirmación
                this.textContent = '¡Email copiat!';
                this.style.backgroundColor = '#27ae60';
                
                // Restaurar después de 2 segundos
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = originalBg;
                }, 2000);
                
            }).catch(err => {
                console.error('Error al copiar: ', err);
                // Fallback para navegadores antiguos
                fallbackCopyTextToClipboard(email);
            });
        });
    }
    
    // Función fallback para navegadores que no soportan navigator.clipboard
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                const btn = document.querySelector('.copy-email');
                const originalText = btn.textContent;
                btn.textContent = '¡Copiat!';
                btn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            }
        } catch (err) {
            console.error('Fallback error: ', err);
            // Último recurso: abrir cliente de email
            window.location.href = `mailto:${text}`;
        }
        
        document.body.removeChild(textArea);
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
    
    // Add animation to skill bars
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.info-card, .card, .timeline-content, .dafo-item').forEach(el => {
        observer.observe(el);
    });
});