# Aplicación de Login con Firebase

Esta es una aplicación web que implementa un sistema de autenticación seguro utilizando **Firebase Authentication**. La característica principal es que el registro de nuevos usuarios está restringido; solo un administrador puede crear nuevos usuarios, quienes luego podrán iniciar sesión y gestionar su contraseña.

## ✨ Características Principales

-   **Inicio de Sesión Seguro**: Formulario de login para usuarios existentes.
-   **Recuperación de Contraseña**: Flujo para que los usuarios restablezcan su contraseña si la olvidan.
-   **Creación de Usuarios por Administrador**: No hay registro público. Los usuarios son creados desde un entorno seguro (backend) por un administrador.
-   **Frontend Sencillo y Elegante**: Una interfaz de usuario limpia y responsiva.
-   **Backend con Node.js**: Servidor construido con Express para futuras ampliaciones (como un panel de admin).

## 🚀 Tecnologías Utilizadas

-   **Backend**: Node.js, Express
-   **Frontend**: HTML, CSS, JavaScript (puro)
-   **Autenticación**: Firebase Authentication (SDK para Web y Admin SDK para Node.js)
-   **Entorno de Desarrollo**: Configurado con `.idx/dev.nix` para desarrollo consistente.

## ⚙️ Configuración del Proyecto

Para poder ejecutar este proyecto, necesitarás configurar tus credenciales de Firebase.

### Prerrequisitos

-   Tener una cuenta de [Google](https://accounts.google.com/signup) para usar Firebase.
-   Tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Firebase:**
    -   Ve a la [Consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto.
    -   Activa la **Autenticación con Correo electrónico/Contraseña**.
    -   **Para el Frontend**: En la configuración de tu proyecto (`Project settings`), crea una **aplicación web** y copia el objeto de configuración `firebaseConfig`. Deberás pegarlo en `public/app.js`.
    -   **Para el Backend**: En la misma configuración, ve a la pestaña `Service accounts` y genera una nueva clave privada. Esto descargará un archivo JSON. **¡TRATA ESTE ARCHIVO COMO SECRETO!** Lo usaremos más adelante en el servidor.

## ▶️ Uso

Una vez que hayas configurado tus credenciales de Firebase, puedes iniciar la aplicación con el siguiente comando:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

---
*Este README fue generado para un proyecto de ejemplo que demuestra un flujo de autenticación seguro y con roles.*
