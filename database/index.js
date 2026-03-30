import sequelize from '../config/db.js';
import User from './User.js';
import Presentation from './Presentation.js';
import AboutMe from './AboutMe.js';
import Project from './Project.js';
import Education from './Education.js';

/**
 * Sincroniza los modelos con la base de datos y carga datos iniciales
 * si es la primera vez que se ejecuta el sistema.
 */
export const initDatabase = async () => {
    await sequelize.authenticate();
    console.log('[DB] Conexión establecida correctamente.');

    // Crea las tablas si no existen (no destruye datos existentes)
    await sequelize.sync({ alter: false, force: false });
    console.log('[DB] Tablas sincronizadas.');

    await seedAdminUser();
    await seedInitialContent();
};

const seedAdminUser = async () => {
    const count = await User.count();
    if (count > 0) return;

    await User.create({
        name: process.env.ADMIN_NAME || 'Administrador',
        email: process.env.ADMIN_EMAIL || 'admin@portafolio.com',
        password: process.env.ADMIN_PASSWORD || 'Admin1234!',
        role: 'admin'
    });
    console.log(`[DB] Usuario admin creado: ${process.env.ADMIN_EMAIL || 'admin@portafolio.com'}`);
};

const seedInitialContent = async () => {
    const presCount = await Presentation.count();
    if (presCount === 0) {
        await Presentation.create({
            greeting: 'Hola, soy',
            name: 'Tu Nombre',
            title: 'Desarrollador Full Stack',
            subtitle: 'Construyendo experiencias digitales con pasión',
            description: 'Bienvenido a mi portafolio. Aquí encontrarás mis proyectos y experiencia profesional.',
            cta_text: 'Ver proyectos',
            cta_url: '#projects'
        });
        console.log('[DB] Presentación inicial creada.');
    }

    const aboutCount = await AboutMe.count();
    if (aboutCount === 0) {
        await AboutMe.create({
            title: 'Sobre mí',
            content: 'Soy un desarrollador apasionado por crear soluciones tecnológicas innovadoras.',
            skills: ['JavaScript', 'Node.js', 'React', 'PostgreSQL'],
            location: 'Chile'
        });
        console.log('[DB] Sobre mí inicial creado.');
    }
};

export { sequelize, User, Presentation, AboutMe, Project, Education };
