import { AboutMe } from '../database/index.js';
// Esto es una prueba
export const getAboutMeService = async () => {
    return AboutMe.findOne({ where: { is_active: true } });
};

export const upsertAboutMeService = async (data) => {
    // Normaliza skills: acepta string separado por comas o array
    if (typeof data.skills === 'string') {
        data.skills = data.skills
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
    }
    if (!Array.isArray(data.skills)) data.skills = [];

    const existing = await AboutMe.findOne();
    if (existing) {
        await existing.update(data);
        return existing;
    }
    return AboutMe.create(data);
};
