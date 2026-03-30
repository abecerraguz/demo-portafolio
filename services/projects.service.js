import ApiError from '../utils/ApiError.js';
import { Project } from '../database/index.js';

const normalizeTechStack = (techStack) => {
    if (typeof techStack === 'string') {
        return techStack.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (Array.isArray(techStack)) return techStack;
    return [];
};

export const getAllProjectsService = async (onlyActive = true) => {
    const where = onlyActive ? { is_active: true } : {};
    return Project.findAll({ where, order: [['display_order', 'ASC'], ['createdAt', 'DESC']] });
};

export const getProjectByIdService = async (id) => {
    const project = await Project.findByPk(id);
    if (!project) throw new ApiError(404, 'Proyecto no encontrado.');
    return project;
};

export const createProjectService = async (data) => {
    data.tech_stack = normalizeTechStack(data.tech_stack);
    return Project.create(data);
};

export const updateProjectService = async (id, data) => {
    const project = await getProjectByIdService(id);
    data.tech_stack = normalizeTechStack(data.tech_stack);
    await project.update(data);
    return project;
};

export const deleteProjectService = async (id) => {
    const project = await getProjectByIdService(id);
    await project.destroy();
    return { deleted: true };
};
