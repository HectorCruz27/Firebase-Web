// Importa las funciones que necesitas desde el CDN de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// --- Configuración de Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyBdGZGkASokkc6NSYRnI6VVmbVCP_S8Jh4",
  authDomain: "studio-6061365435-ea96e.firebaseapp.com",
  projectId: "studio-6061365435-ea96e",
  storageBucket: "studio-6061365435-ea96e.firebasestorage.app",
  messagingSenderId: "754582249353",
  appId: "1:754582249353:web:8f26ac51cbb3c6e314cb58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Estado Global del Flujo ---
let selectedSociety = '';
let selectedClientType = '';

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const userEmailSpan = document.getElementById('user-email');
    const logoutButtonProfile = document.getElementById('logout-button-profile');

    const views = {
        dashboard: document.getElementById('dashboard-view'),
        createClient: document.getElementById('create-client-view'),
        clientType: document.getElementById('client-type-view'),
        naturalForm: document.getElementById('natural-person-form-view'),
        juridicalForm: document.getElementById('juridical-person-form-view'),
        profile: document.getElementById('profile-view')
    };

    const navLinks = {
        dashboard: document.getElementById('dashboard-link'),
        createClient: document.getElementById('create-client-link'),
        profile: document.getElementById('profile-link'),
    };

    // --- Autenticación ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (userEmailSpan) userEmailSpan.textContent = user.email;
        } else {
            window.location.href = 'index.html';
        }
    });

    logoutButtonProfile?.addEventListener('click', () => signOut(auth));

    // --- Lógica de Navegación ---
    const switchView = (viewToShow) => {
        // Ocultar todas las vistas
        Object.values(views).forEach(view => {
            if (view) view.style.display = 'none';
        });

        // Mostrar la vista correcta con el estilo de display adecuado
        if (viewToShow) {
            if (viewToShow === views.profile) {
                viewToShow.style.display = 'flex';
            } else {
                viewToShow.style.display = 'block';
            }
        }

        // Actualizar el link de navegación activo
        Object.values(navLinks).forEach(link => {
            if (link) link.classList.remove('active');
        });
        
        const inCreationFlow = [views.createClient, views.clientType, views.naturalForm, views.juridicalForm].includes(viewToShow);

        if (viewToShow === views.dashboard) {
            navLinks.dashboard.classList.add('active');
        } else if (inCreationFlow) {
            navLinks.createClient.classList.add('active');
        } else if (viewToShow === views.profile) {
            navLinks.profile.classList.add('active');
        }
    };

    // Navegación del menú principal
    navLinks.dashboard.addEventListener('click', (e) => { e.preventDefault(); switchView(views.dashboard); });
    navLinks.createClient.addEventListener('click', (e) => { e.preventDefault(); switchView(views.createClient); });
    navLinks.profile.addEventListener('click', (e) => { e.preventDefault(); switchView(views.profile); });

    // Flujo de Creación: Seleccionar Sociedad
    document.querySelectorAll('.society-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedSociety = card.getAttribute('data-society');
            document.getElementById('client-type-header').textContent = `Creando cliente para ${selectedSociety}`;
            switchView(views.clientType);
        });
    });

    // Flujo de Creación: Seleccionar Tipo de Persona
    document.querySelectorAll('.client-type-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedClientType = card.getAttribute('data-type');
            if (selectedClientType === 'Natural') {
                document.getElementById('natural-form-header').textContent = `Cliente Natural para ${selectedSociety}`;
                switchView(views.naturalForm);
            } else {
                document.getElementById('juridical-form-header').textContent = `Cliente Jurídico para ${selectedSociety}`;
                switchView(views.juridicalForm);
            }
        });
    });

    // Flujo de Creación: Botones "Volver"
    document.getElementById('back-to-society-selection').addEventListener('click', () => switchView(views.createClient));
    document.getElementById('back-to-type-from-natural').addEventListener('click', () => switchView(views.clientType));
    document.getElementById('back-to-type-from-juridical').addEventListener('click', () => switchView(views.clientType));

    // Flujo de Creación: Guardar Formularios (por ahora, solo en consola)
    document.getElementById('natural-person-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            sociedad: selectedSociety,
            tipoCliente: 'Persona Natural',
            nombres: e.target.elements['natural-nombres'].value,
            apellidos: e.target.elements['natural-apellidos'].value,
            dni: e.target.elements['natural-dni'].value,
            telefono: e.target.elements['natural-telefono'].value,
            direccion: e.target.elements['natural-direccion'].value,
            email: e.target.elements['natural-email'].value
        };
        console.log("Guardando Cliente Natural:", formData);
        alert('Cliente Natural guardado (revisa la consola para ver los datos).');
        switchView(views.dashboard);
    });

    document.getElementById('juridical-person-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            sociedad: selectedSociety,
            tipoCliente: 'Persona Jurídica',
            razonSocial: e.target.elements['juridical-razon-social'].value,
            ruc: e.target.elements['juridical-ruc'].value,
            direccion: e.target.elements['juridical-direccion'].value,
            telefono: e.target.elements['juridical-telefono'].value,
            email: e.target.elements['juridical-email'].value
        };
        console.log("Guardando Cliente Jurídico:", formData);
        alert('Cliente Jurídico guardado (revisa la consola para ver los datos).');
        switchView(views.dashboard);
    });

    // --- Vista Inicial ---
    switchView(views.dashboard);
});