import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Education extends Model {}

Education.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        institution: { type: DataTypes.STRING(200), allowNull: false },
        degree: { type: DataTypes.STRING(200), allowNull: false },
        field_of_study: { type: DataTypes.STRING(200), allowNull: true },
        start_year: { type: DataTypes.INTEGER, allowNull: true },
        end_year: { type: DataTypes.INTEGER, allowNull: true },
        is_current: { type: DataTypes.BOOLEAN, defaultValue: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        logo_url: { type: DataTypes.STRING(500), allowNull: true },
        display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
        sequelize,
        modelName: 'Education',
        tableName: 'education'
    }
);

export default Education;
