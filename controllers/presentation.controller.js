import { getPresentationService, upsertPresentationService } from '../services/presentation.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

// ── Admin Web ──────────────────────────────────────────────────────────────
export const showEditPresentation = async (req, res, next) => {
    try {
        const presentation = await getPresentationService();
        return res.render('admin/presentation/edit', {
            layout: 'admin',
            title: 'Editar Presentación',
            presentation: presentation ? presentation.toJSON() : {},
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};

export const handleUpdatePresentation = async (req, res, next) => {
    try {
        const { greeting, name, title, subtitle, description, cta_text, cta_url } = req.body;
        if (!name?.trim() || !title?.trim()) {
            return res.redirect('/admin/presentation/edit?error=El+nombre+y+título+son+obligatorios');
        }
        await upsertPresentationService({ greeting, name: name.trim(), title: title.trim(), subtitle, description, cta_text, cta_url });
        return res.redirect('/admin/presentation/edit?success=Presentación+actualizada+correctamente');
    } catch (err) {
        return next(err);
    }
};

// ── API REST ───────────────────────────────────────────────────────────────
export const apiGetPresentation = async (req, res, next) => {
    try {
        const presentation = await getPresentationService();
        return sendSuccess({ res, data: presentation });
    } catch (err) {
        return next(err);
    }
};
