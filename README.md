# Portafolio Personal

Portafolio profesional con panel de administración. Construido con Express, Handlebars y PostgreSQL, listo para desplegar en Railway.

## Stack tecnológico

- **Backend**: Node.js + Express (ES Modules)
- **ORM**: Sequelize v6
- **Base de datos**: PostgreSQL
- **Vistas**: Express-Handlebars + Bootstrap 5
- **Autenticación**: JWT en cookie httpOnly (admin) / Bearer token (API)

## Estructura del proyecto

```
portafolio/
├── index.js                    ← Entry point
├── config/db.js                ← Instancia Sequelize
├── database/                   ← Modelos Sequelize
│   ├── User.js
│   ├── Presentation.js
│   ├── AboutMe.js
│   ├── Project.js
│   └── Education.js
├── models/Server.js            ← Clase Server (Express)
├── controllers/                ← Lógica de requests
├── services/                   ← Lógica de negocio
├── middlewares/                ← Auth, errores, logger
├── routes/                     ← Rutas web y API
├── views/                      ← Handlebars (.hbs)
│   ├── layouts/
│   ├── partials/
│   └── admin/
└── public/                     ← CSS, JS estáticos
```

## Secciones del portafolio

| Sección       | Descripción                        | Admin URL                    |
|---------------|------------------------------------|------------------------------|
| Presentación  | Hero con nombre, título y CTA      | `/admin/presentation/edit`   |
| Sobre mí      | Bio, foto, habilidades y redes     | `/admin/aboutme/edit`        |
| Proyectos     | Cards con CRUD completo            | `/admin/projects`            |
| Educación     | Timeline de estudios con CRUD      | `/admin/education`           |

## Instalación local

```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd portafolio

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL

# 4. Crear la base de datos (PostgreSQL debe estar corriendo)
createdb portafolio_db

# 5. Iniciar en desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.  
El panel admin en `http://localhost:3000/admin`.

**Credenciales por defecto** (configurables en `.env`):
- Email: `admin@portafolio.com`
- Contraseña: `Admin1234!`

> ⚠️ Cambia las credenciales antes de hacer deploy.

## API REST

Endpoints públicos disponibles en `/api/v1`:

```
GET  /api/v1/presentation
GET  /api/v1/aboutme
GET  /api/v1/projects
GET  /api/v1/projects/:id
GET  /api/v1/education
```

Login para obtener token:
```
POST /api/v1/auth/login
Body: { "email": "...", "password": "..." }
```

## Deploy en Railway

### 1. Repositorio en GitHub

```bash
git init
git add .
git commit -m "feat: portafolio inicial"
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

### 2. Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app) → **New Project**
2. Selecciona **Deploy from GitHub repo** → elige tu repositorio
3. Agrega un servicio **PostgreSQL** desde el mismo proyecto
4. En la pestaña **Variables** del servicio web, configura:

```
NODE_ENV=production
JWT_SECRET=<secreto-seguro-de-64-caracteres>
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD=<contrasena-segura>
ADMIN_NAME=Tu Nombre
```

> La variable `DATABASE_URL` es asignada automáticamente por Railway al conectar el servicio PostgreSQL.

5. Railway detectará el `Procfile` y ejecutará `node index.js`.  
   Las tablas se crean automáticamente en el primer arranque.

### Healthcheck

Para que Railway detecte que la app está lista, el `/` responde con `200 OK`.
