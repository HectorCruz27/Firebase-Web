// Importa las funciones que necesitas desde el CDN de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// La configuración de tu aplicación web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdGZGkASokkc6NSYRnI6VVmbVCP_S8Jh4",
  authDomain: "studio-6061365435-ea96e.firebaseapp.com",
  projectId: "studio-6061365435-ea96e",
  storageBucket: "studio-6061365435-ea96e.firebasestorage.app",
  messagingSenderId: "754582249353",
  appId: "1:754582249353:web:8f26ac51cbb3c6e314cb58"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Lógica de Autenticación ---

// Manejar el envío del formulario de login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuario ha iniciado sesión
            const user = userCredential.user;
            console.log('Usuario conectado:', user);
            alert('¡Inicio de sesión exitoso!');
            // Próximamente: Redirigir a un panel de control o página protegida.
            // window.location.href = '/dashboard.html'; 
        })
        .catch((error) => {
            console.error('Error en el login:', error);
            alert(`Error al iniciar sesión: ${error.message}`);
        });
});

// Manejar el enlace de "Olvidé mi contraseña"
const forgotPasswordLink = document.getElementById('forgot-password');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Por favor, ingresa tu correo electrónico para restablecer la contraseña:');
    
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Se ha enviado un correo para restablecer tu contraseña. ¡Revisa tu bandeja de entrada!');
            })
            .catch((error) => {
                console.error('Error al restablecer contraseña:', error);
                alert(`Error: ${error.message}`);
            });
    }
});
