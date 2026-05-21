
Mi Boleta Frontend

Frontend desarrollado en React + TypeScript para la gestión de rifas, loterías, sorteos y boletas.
La aplicación permite registrar y administrar tickets de juego en un solo lugar, evitando perder información importante sobre números jugados, fechas y premios.

📌 Descripción

Muchas personas participan constantemente en:

Rifas
Loterías
Sorteos
Boletas
Juegos ocasionales

Pero frecuentemente olvidan:

Qué número jugaron
Cuándo era el sorteo
Dónde compraron la boleta
Si el ticket ganó o no

Este proyecto busca centralizar toda esa información mediante una aplicación web moderna y organizada.

🚀 Tecnologías utilizadas
React
TypeScript
React Router DOM
Axios
Context API
CSS moderno y responsive
Arquitectura limpia (Clean Architecture)
🧱 Arquitectura del frontend

El proyecto sigue una estructura basada en Clean Architecture:

src/
├── application/
│   └── dtos/
│
├── domain/
│   ├── entities/
│   └── repositories/
│
├── infrastructure/
│   ├── api/
│   ├── auth/
│   ├── repositories/
│   └── storage/
│
├── presentation/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   └── styles/
🔐 Autenticación

La aplicación incluye:

✅ Registro de usuarios
✅ Inicio de sesión
✅ Persistencia de sesión con localStorage
✅ Manejo de JWT
✅ Logout
✅ Protección de rutas
✅ Rutas para administradores

La autenticación fue implementada usando:

AuthContext
ProtectedRoute
AdminRoute
🎟️ Gestión de Tickets

Cada usuario puede:

✅ Crear tickets
✅ Editar tickets
✅ Eliminar tickets
✅ Consultar historial
✅ Ver próximos sorteos

Cada ticket contiene:

Nombre del sorteo
Tipo de juego
Número jugado
Fecha
Valor apostado
Lugar de compra
Estado
Notas
👤 Panel de administrador

El administrador puede:

✅ Ver tickets de todos los usuarios
✅ Visualizar el dueño del ticket
✅ Filtrar información
✅ Consultar estadísticas generales

⚙️ Instalación
1. Clonar repositorio
git clone <repo>
2. Instalar dependencias
npm install
3. Ejecutar el proyecto
npm start

o

npm run dev
🌐 API Backend

El frontend consume una API REST desarrollada con:

Express
Prisma
PostgreSQL
JWT
TypeScript

Base URL:

http://localhost:4000/api/v1
🔑 Variables importantes

La autenticación utiliza tokens JWT almacenados localmente.

Headers utilizados:

Authorization: Bearer <token>
📱 Funcionalidades implementadas
Usuarios
Registro
Login
Logout
Persistencia de sesión
Tickets
CRUD completo
Modal de creación
Edición dinámica
Eliminación con confirmación
Dashboard
Estadísticas
Próximos sorteos
Historial
Admin
Vista global del sistema
Información del propietario del ticket
🎨 Diseño

La interfaz utiliza:

Cards modernas
Navbar responsive
Gradientes
Estados visuales
Componentes reutilizables

Consumo de APIs REST
Routing
