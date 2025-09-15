// Importa las funciones que necesitas desde el CDN de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// La configuración de tu aplicación web de Firebase (la misma que en dashboard.js)
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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // --- Comprobación de Estado de Autenticación ---
    // Comprueba si el usuario ya tiene una sesión activa.
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Si hay un usuario, no debería estar en la página de login.
            // Redirigir al dashboard inmediatamente.
            console.log('Usuario ya autenticado. Redirigiendo al dashboard...');
            window.location.href = 'public/dashboard.html';
        }
        // Si no hay usuario, la página de login se muestra normalmente.
    });

    // --- Lógica del Formulario de Inicio de Sesión ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            // Iniciar sesión con Firebase
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // El inicio de sesión es exitoso.
                    // onAuthStateChanged se encargará de la redirección al dashboard.
                    console.log('Inicio de sesión exitoso:', userCredential.user);
                })
                .catch((error) => {
                    // Manejo de errores de inicio de sesión
                    console.error('Error de inicio de sesión:', error.code, error.message);
                    alert(`Error al iniciar sesión: ${error.message}`);
                });
        });
    }
});
