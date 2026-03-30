import ApiError from '../utils/ApiError.js';
import { Education } from '../database/index.js';

export const getAllEducationService = async (onlyActive = true) => {
    const where = onlyActive ? { is_active: true } : {};
    return Education.findAll({ where, order: [['display_order', 'ASC'], ['start_year', 'DESC']] });
};

export const getEducationByIdService = async (id) => {
    const edu = await Education.findByPk(id);
    if (!edu) throw new ApiError(404, 'Registro de educación no encontrado.');
    return edu;
};

export const createEducationService = async (data) => {
    return Education.create(data);
};

export const updateEducationService = async (id, data) => {
    const edu = await getEducationByIdService(id);
    await edu.update(data);
    return edu;
};

export const deleteEducationService = async (id) => {
    const edu = await getEducationByIdService(id);
    await edu.destroy();
    return { deleted: true };
};
