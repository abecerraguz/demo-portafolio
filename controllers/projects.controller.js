import {
    getAllProjectsService,
    getProjectByIdService,
    createProjectService,
    updateProjectService,
    deleteProjectService
} from '../services/projects.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

import path from 'path';
import fs from 'fs';

// ── Admin Web ──────────────────────────────────────────────────────────────
export const showProjectsList = async (req, res, next) => {
    try {
        const projects = await getAllProjectsService(false);
        return res.render('admin/projects/index', {
            layout: 'admin',
            title: 'Proyectos — Admin',
            projects: projects.map(p => p.toJSON()),
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};

export const showCreateProject = (req, res) => {
    res.render('admin/projects/create', {
        layout: 'admin',
        title: 'Nuevo Proyecto',
        error: req.query.error || null
    });
};

export const handleCreateProject = async (req, res, next) => {
    try {
        const { title, description, tech_stack, image_url, github_url, demo_url, display_order, is_featured } = req.body;
        if (!title?.trim()) {
            return res.redirect('/admin/projects/new?error=El+título+es+obligatorio');
        }
        await createProjectService({
            title: title.trim(), description, tech_stack, image_url, github_url, demo_url,
            display_order: Number(display_order) || 0,
            is_featured: is_featured === 'on' || is_featured === 'true'
        });
        return res.redirect('/admin/projects?success=Proyecto+creado+correctamente');
    } catch (err) {
        return next(err);
    }
};

export const showEditProject = async (req, res, next) => {
    try {
        const project = await getProjectByIdService(req.params.id);
        const data    = project.toJSON();
        if (Array.isArray(data.tech_stack)) data.tech_stack_text = data.tech_stack.join(', ');

        return res.render('admin/projects/edit', {
            layout: 'admin',
            title: 'Editar Proyecto',
            project: data,
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};

// ── Subida de imágenes ─────────────────────────────────────────────
export const handleUploadImage = async (req, res, next) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'No se envió ningún archivo.' });
        }
        const image = req.files.image;
        // Validar tipo de archivo (solo imágenes)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(image.mimetype)) {
            return res.status(400).json({ error: 'Tipo de archivo no permitido.' });
        }
        // Nombre seguro y ruta destino
        const ext = path.extname(image.name);
        const fileName = `project_${Date.now()}${ext}`;
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
        // Mover archivo
        try {
            await image.mv(uploadPath);
        } catch (err) {
            console.error('Error al mover archivo:', err);
            return res.status(500).json({ error: 'Error al guardar la imagen', details: err.message });
        }
        // Devolver URL relativa
        const fileUrl = `/uploads/${fileName}`;
        return res.json({ url: fileUrl });
    } catch (err) {
        console.error('Error inesperado en subida:', err);
        return res.status(500).json({ error: 'Error inesperado en el servidor', details: err.message });
    }
};

export const handleUpdateProject = async (req, res, next) => {
    try {
        const { title, description, tech_stack, image_url, github_url, demo_url, display_order, is_featured, is_active } = req.body;
        if (!title?.trim()) {
            return res.redirect(`/admin/projects/${req.params.id}/edit?error=El+título+es+obligatorio`);
        }
        await updateProjectService(req.params.id, {
            title: title.trim(), description, tech_stack, image_url, github_url, demo_url,
            display_order: Number(display_order) || 0,
            is_featured: is_featured === 'on' || is_featured === 'true',
            is_active:   is_active   === 'on' || is_active   === 'true'
        });
        return res.redirect(`/admin/projects/${req.params.id}/edit?success=Proyecto+actualizado+correctamente`);
    } catch (err) {
        return next(err);
    }
};

export const handleDeleteProject = async (req, res, next) => {
    try {
        await deleteProjectService(req.params.id);
        return res.redirect('/admin/projects?success=Proyecto+eliminado+correctamente');
    } catch (err) {
        return next(err);
    }
};

// ── API REST ───────────────────────────────────────────────────────────────
export const apiGetProjects = async (req, res, next) => {
    try {
        const projects = await getAllProjectsService(true);
        return sendSuccess({ res, data: projects, meta: { count: projects.length } });
    } catch (err) {
        return next(err);
    }
};

export const apiGetProjectById = async (req, res, next) => {
    try {
        const project = await getProjectByIdService(req.params.id);
        return sendSuccess({ res, data: project });
    } catch (err) {
        return next(err);
    }
};
