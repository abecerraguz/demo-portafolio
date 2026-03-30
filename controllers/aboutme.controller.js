import { getAboutMeService, upsertAboutMeService } from '../services/aboutme.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

// ── Admin Web ──────────────────────────────────────────────────────────────
export const showEditAboutMe = async (req, res, next) => {
    try {
        const aboutMe = await getAboutMeService();
        const data    = aboutMe ? aboutMe.toJSON() : {};
        // Convierte array a string para el campo del formulario
        if (Array.isArray(data.skills)) data.skills_text = data.skills.join(', ');

        return res.render('admin/aboutme/edit', {
            layout: 'admin',
            title: 'Editar Sobre mí',
            aboutMe: data,
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};

export const handleUpdateAboutMe = async (req, res, next) => {
    try {
        const { title, content, skills, profile_image, github_url, linkedin_url, email, location } = req.body;
        if (!content?.trim()) {
            return res.redirect('/admin/aboutme/edit?error=El+contenido+es+obligatorio');
        }
        await upsertAboutMeService({ title, content: content.trim(), skills, profile_image, github_url, linkedin_url, email, location });
        return res.redirect('/admin/aboutme/edit?success=Sobre+mí+actualizado+correctamente');
    } catch (err) {
        return next(err);
    }
};

// ── API REST ───────────────────────────────────────────────────────────────
export const apiGetAboutMe = async (req, res, next) => {
    try {
        const aboutMe = await getAboutMeService();
        return sendSuccess({ res, data: aboutMe });
    } catch (err) {
        return next(err);
    }
};
