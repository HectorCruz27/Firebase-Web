const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// --- Inicialización de Firebase Admin SDK ---
// Carga las credenciales de la cuenta de servicio desde el archivo JSON
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// --- Middlewares ---
// Sirve los archivos estáticos de la carpeta 'public' (HTML, CSS, JS del frontend)
app.use(express.static('public'));
// Permite al servidor entender y procesar JSON en las solicitudes
app.use(express.json());

// --- Rutas de la API ---

/**
 * Endpoint para crear un nuevo usuario.
 * En una aplicación real, esta ruta debería estar protegida para que solo 
 * administradores puedan crear usuarios.
 * 
 * Uso: Envía una solicitud POST a /api/create-user con un cuerpo JSON como:
 * { "email": "nuevo.usuario@example.com", "password": "contraseñaSegura123" }
 */
app.post('/api/create-user', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'El email y la contraseña son obligatorios.' });
    }

    admin.auth().createUser({
        email: email,
        password: password,
    })
    .then(userRecord => {
        console.log('Usuario creado exitosamente:', userRecord.uid);
        res.status(201).send({ message: `Usuario creado con éxito con el UID: ${userRecord.uid}` });
    })
    .catch(error => {
        console.error('Error creando el usuario:', error);
        res.status(500).send({ error: error.message });
    });
});

// --- Iniciar Servidor ---
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log('Ahora puedes usar una herramienta como Postman o curl para crear un usuario.');
  console.log('Ejemplo con curl:');
  console.log(`curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}' http://localhost:3000/api/create-user`);
});
