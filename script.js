document.addEventListener("DOMContentLoaded", () => {
    
    const navbar = document.querySelector("#navbar");
    const mobileMenu = document.querySelector("#mobile-menu");
    const navMenu = document.querySelector("#nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const contactForm = document.querySelector("#contactForm");
    const formWrapper = document.querySelector("#form-wrapper");
    const nombreInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const mensajeInput = document.querySelector("#mensaje");


    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    mobileMenu.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = mobileMenu.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = mobileMenu.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        });
    });


    const setError = (input, errorSpan, message) => {
        input.classList.add("invalid");
        errorSpan.textContent = message;
    };

    const clearError = (input, errorSpan) => {
        input.classList.remove("invalid");
        errorSpan.textContent = "";
    };

    const validateEmailFormat = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // Validaciones individuales
    const validateNombre = () => {
        const errorSpan = document.querySelector("#error-nombre");
        if (nombreInput.value.trim() === "") {
            setError(nombreInput, errorSpan, "El nombre completo es obligatorio.");
            return false;
        } else if (nombreInput.value.trim().length < 3) {
            setError(nombreInput, errorSpan, "El nombre debe tener al menos 3 caracteres.");
            return false;
        }
        clearError(nombreInput, errorSpan);
        return true;
    };

    const validateEmail = () => {
        const errorSpan = document.querySelector("#error-email");
        if (emailInput.value.trim() === "") {
            setError(emailInput, errorSpan, "El correo electrónico es requerido.");
            return false;
        } else if (!validateEmailFormat(emailInput.value.trim())) {
            setError(emailInput, errorSpan, "Por favor, escribe un correo válido.");
            return false;
        }
        clearError(emailInput, errorSpan);
        return true;
    };

    const validateMensaje = () => {
        const errorSpan = document.querySelector("#error-mensaje");
        if (mensajeInput.value.trim() === "") {
            setError(mensajeInput, errorSpan, "Por favor, introduce los detalles de tu reservación.");
            return false;
        }
        clearError(mensajeInput, errorSpan);
        return true;
    };

    nombreInput.addEventListener("input", validateNombre);
    emailInput.addEventListener("input", validateEmail);
    mensajeInput.addEventListener("input", validateMensaje);

      contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página recargue

           const isNombreValid = validateNombre();
        const isEmailValid = validateEmail();
        const isMensajeValid = validateMensaje();

        if (isNombreValid && isEmailValid && isMensajeValid) {
            
             const cliente = nombreInput.value.trim().split(" ")[0];

               formWrapper.innerHTML = `
                <div class="success-card">
                    <i class="fas fa-clipboard-check"></i>
                    <h3>¡Reservación Registrada, ${cliente}!</h3>
                    <p>Tu solicitud ha sido procesada con éxito. Hemos enviado un comprobante digital a <strong>${emailInput.value.trim()}</strong> con las indicaciones para tu visita.</p>
                    <p style="margin-top: 15px; font-weight: bold; color: var(--primary);">¡Te esperamos para disfrutar del mejor sabor cuscatleco!</p>
                </div>
            `;
        }
    });
});