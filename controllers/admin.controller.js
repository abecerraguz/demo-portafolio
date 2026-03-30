import { getPresentationService } from '../services/presentation.service.js';
import { getAboutMeService } from '../services/aboutme.service.js';
import { getAllProjectsService } from '../services/projects.service.js';
import { getAllEducationService } from '../services/education.service.js';

export const showDashboard = async (req, res, next) => {
    try {
        const [presentation, aboutMe, projects, education] = await Promise.all([
            getPresentationService(),
            getAboutMeService(),
            getAllProjectsService(false),
            getAllEducationService(false)
        ]);

        return res.render('admin/dashboard', {
            layout: 'admin',
            title: 'Dashboard — Admin',
            adminUser: req.adminUser,
            presentation:   presentation  ? presentation.toJSON()  : null,
            aboutMe:        aboutMe        ? aboutMe.toJSON()       : null,
            projectsCount:  projects.length,
            educationCount: education.length,
            success: req.query.success || null,
            error:   req.query.error   || null
        });
    } catch (err) {
        return next(err);
    }
};
