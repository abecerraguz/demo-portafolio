import { Router } from 'express';
import { requireAdminAuth } from '../middlewares/adminAuth.js';
import {
    showLoginPage,
    handleLogin,
    handleLogout
} from '../controllers/auth.controller.js';
import { showDashboard } from '../controllers/admin.controller.js';
import {
    showEditPresentation,
    handleUpdatePresentation
} from '../controllers/presentation.controller.js';
import {
    showEditAboutMe,
    handleUpdateAboutMe
} from '../controllers/aboutme.controller.js';
import {
    showProjectsList,
    showCreateProject,
    handleCreateProject,
    showEditProject,
    handleUpdateProject,
    handleDeleteProject
} from '../controllers/projects.controller.js';

import { handleUploadImage } from '../controllers/projects.controller.js';
import {
    showEducationList,
    showCreateEducation,
    handleCreateEducation,
    showEditEducation,
    handleUpdateEducation,
    handleDeleteEducation
} from '../controllers/education.controller.js';

const router = Router();

// ── Auth ────────────────────────────────────────────────────────────────────
router.get ('/',              (req, res) => res.redirect('/admin/login'));
router.get ('/login',         showLoginPage);
router.post('/login',         handleLogin);
router.post('/logout',        handleLogout);

// ── Dashboard (protegido) ────────────────────────────────────────────────────
router.get('/dashboard', requireAdminAuth, showDashboard);

// ── Presentación ────────────────────────────────────────────────────────────
router.get ('/presentation/edit', requireAdminAuth, showEditPresentation);
router.post('/presentation/edit', requireAdminAuth, handleUpdatePresentation);

// ── Sobre mí ────────────────────────────────────────────────────────────────
router.get ('/aboutme/edit', requireAdminAuth, showEditAboutMe);
router.post('/aboutme/edit', requireAdminAuth, handleUpdateAboutMe);

// ── Proyectos ────────────────────────────────────────────────────────────────
router.get ('/projects',          requireAdminAuth, showProjectsList);
router.get ('/projects/new',      requireAdminAuth, showCreateProject);
router.post('/projects',          requireAdminAuth, handleCreateProject);
router.get ('/projects/:id/edit', requireAdminAuth, showEditProject);
router.post('/projects/:id',      requireAdminAuth, handleUpdateProject);
router.post('/projects/:id/delete', requireAdminAuth, handleDeleteProject);

// Endpoint para subir imágenes
router.post('/projects/upload', requireAdminAuth, handleUploadImage);

// ── Educación ────────────────────────────────────────────────────────────────
router.get ('/education',          requireAdminAuth, showEducationList);
router.get ('/education/new',      requireAdminAuth, showCreateEducation);
router.post('/education',          requireAdminAuth, handleCreateEducation);
router.get ('/education/:id/edit', requireAdminAuth, showEditEducation);
router.post('/education/:id',      requireAdminAuth, handleUpdateEducation);
router.post('/education/:id/delete', requireAdminAuth, handleDeleteEducation);

export default router;
