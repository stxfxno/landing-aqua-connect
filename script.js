document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Cambio de color de la barra de navegación al hacer scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animación suave para enlaces de navegación - CORREGIDO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Si el menú móvil está activo, cerrarlo
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
                
                // Calcular la posición exacta considerando el navbar fijo
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .help-card, .help-content, .problem-solution-wrapper, .problem-box, .solution-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 20) { // Reducido de 50 para animación más rápida
                element.classList.add('animate');
            }
        });
    };
    
    // Añadir clase para animar los elementos
    document.querySelectorAll('.feature-card, .help-card, .help-content, .problem-solution-wrapper, .problem-box, .solution-box').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Ejecutar una vez al cargar la página
    animateOnScroll();
    
    // Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validación básica
            if (name === '') {
                isValid = false;
                setError('name', 'Por favor, ingresa tu nombre');
            } else {
                clearError('name');
            }
            
            if (email === '') {
                isValid = false;
                setError('email', 'Por favor, ingresa tu correo electrónico');
            } else if (!isValidEmail(email)) {
                isValid = false;
                setError('email', 'Por favor, ingresa un correo electrónico válido');
            } else {
                clearError('email');
            }
            
            if (message === '') {
                isValid = false;
                setError('message', 'Por favor, ingresa tu mensaje');
            } else {
                clearError('message');
            }
            
            if (isValid) {
                // Aquí normalmente enviarías el formulario a un servidor
                // Para esta demo, mostraremos un mensaje de éxito
                contactForm.reset();
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            }
        });
    }
    
    function setError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentElement.appendChild(errorDiv);
            input.classList.add('error');
        } else {
            errorElement.textContent = message;
        }
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
            input.classList.remove('error');
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar la notificación con una animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar y eliminar la notificación después de 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Asegurarse de que la navegación por secciones funcione correctamente al cargar la página
    // Si la URL tiene un hash, navegar a esa sección después de cargar la página
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }, 300); // Pequeño retraso para asegurar que la página está completamente cargada
        }
    }
});