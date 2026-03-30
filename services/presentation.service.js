import ApiError from '../utils/ApiError.js';
import { Presentation } from '../database/index.js';

export const getPresentationService = async () => {
    const presentation = await Presentation.findOne({ where: { is_active: true } });
    return presentation;
};

export const upsertPresentationService = async (data) => {
    const existing = await Presentation.findOne();

    if (existing) {
        await existing.update(data);
        return existing;
    }

    return Presentation.create(data);
};
