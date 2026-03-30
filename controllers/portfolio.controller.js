import { getPresentationService } from '../services/presentation.service.js';
import { getAboutMeService } from '../services/aboutme.service.js';
import { getAllProjectsService } from '../services/projects.service.js';
import { getAllEducationService } from '../services/education.service.js';

// Renderiza la página principal del portafolio (single-page)
export const showHome = async (req, res, next) => {
    try {
        const [presentation, aboutMe, projects, education] = await Promise.all([
            getPresentationService(),
            getAboutMeService(),
            getAllProjectsService(true),
            getAllEducationService(true)
        ]);

        return res.render('home', {
            layout: 'main',
            title: presentation?.name ? `${presentation.name} — Portafolio` : 'Portafolio',
            presentation:   presentation   ? presentation.toJSON()         : null,
            aboutMe:        aboutMe         ? aboutMe.toJSON()              : null,
            projects:       projects.map(p => p.toJSON()),
            education:      education.map(e => e.toJSON())
        });
    } catch (err) {
        return next(err);
    }
};
