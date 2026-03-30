import { Router } from 'express';
import { apiLogin } from '../../controllers/auth.controller.js';
import { apiGetPresentation } from '../../controllers/presentation.controller.js';
import { apiGetAboutMe } from '../../controllers/aboutme.controller.js';
import { apiGetProjects, apiGetProjectById } from '../../controllers/projects.controller.js';
import { apiGetEducation } from '../../controllers/education.controller.js';

const router = Router();

// Auth
router.post('/auth/login', apiLogin);

// Portafolio (rutas públicas de lectura)
router.get('/presentation', apiGetPresentation);
router.get('/aboutme',      apiGetAboutMe);
router.get('/projects',     apiGetProjects);
router.get('/projects/:id', apiGetProjectById);
router.get('/education',    apiGetEducation);

export default router;
