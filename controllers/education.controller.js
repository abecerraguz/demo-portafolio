import {
    getAllEducationService,
    getEducationByIdService,
    createEducationService,
    updateEducationService,
    deleteEducationService
} from '../services/education.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

// ── Admin Web ──────────────────────────────────────────────────────────────
export const showEducationList = async (req, res, next) => {
    try {
        const education = await getAllEducationService(false);
        return res.render('admin/education/index', {
            layout: 'admin',
            title: 'Educación — Admin',
            education: education.map(e => e.toJSON()),
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};

export const showCreateEducation = (req, res) => {
    res.render('admin/education/create', {
        layout: 'admin',
        title: 'Nuevo registro de educación',
        error: req.query.error || null
    });
};

export const handleCreateEducation = async (req, res, next) => {
    try {
        const { institution, degree, field_of_study, start_year, end_year, description, logo_url, display_order, is_current } = req.body;
        if (!institution?.trim() || !degree?.trim()) {
            return res.redirect('/admin/education/new?error=Institución+y+título+son+obligatorios');
        }
        await createEducationService({
            institution: institution.trim(), degree: degree.trim(),
            field_of_study, description, logo_url,
            start_year: start_year ? Number(start_year) : null,
            end_year:   end_year   ? Number(end_year)   : null,
            display_order: Number(display_order) || 0,
            is_current: is_current === 'on' || is_current === 'true'
        });
        return res.redirect('/admin/education?success=Educación+creada+correctamente');
    } catch (err) {
        return next(err);
    }
};

export const showEditEducation = async (req, res, next) => {
    try {
        const edu = await getEducationByIdService(req.params.id);
        return res.render('admin/education/edit', {
            layout: 'admin',
            title: 'Editar Educación',
            edu: edu.toJSON(),
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};

export const handleUpdateEducation = async (req, res, next) => {
    try {
        const { institution, degree, field_of_study, start_year, end_year, description, logo_url, display_order, is_current, is_active } = req.body;
        if (!institution?.trim() || !degree?.trim()) {
            return res.redirect(`/admin/education/${req.params.id}/edit?error=Institución+y+título+son+obligatorios`);
        }
        await updateEducationService(req.params.id, {
            institution: institution.trim(), degree: degree.trim(),
            field_of_study, description, logo_url,
            start_year: start_year ? Number(start_year) : null,
            end_year:   end_year   ? Number(end_year)   : null,
            display_order: Number(display_order) || 0,
            is_current: is_current === 'on' || is_current === 'true',
            is_active:  is_active  === 'on' || is_active  === 'true'
        });
        return res.redirect(`/admin/education/${req.params.id}/edit?success=Educación+actualizada+correctamente`);
    } catch (err) {
        return next(err);
    }
};

export const handleDeleteEducation = async (req, res, next) => {
    try {
        await deleteEducationService(req.params.id);
        return res.redirect('/admin/education?success=Registro+eliminado+correctamente');
    } catch (err) {
        return next(err);
    }
};

// ── API REST ───────────────────────────────────────────────────────────────
export const apiGetEducation = async (req, res, next) => {
    try {
        const education = await getAllEducationService(true);
        return sendSuccess({ res, data: education, meta: { count: education.length } });
    } catch (err) {
        return next(err);
    }
};
