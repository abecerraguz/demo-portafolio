import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class AboutMe extends Model {}

AboutMe.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING(150), defaultValue: 'Sobre mí' },
        content: { type: DataTypes.TEXT, allowNull: false },
        skills: {
            type: DataTypes.JSON,
            defaultValue: [],
            comment: 'Array de strings con tecnologías/habilidades'
        },
        profile_image: { type: DataTypes.STRING(500), allowNull: true },
        github_url: { type: DataTypes.STRING(300), allowNull: true },
        linkedin_url: { type: DataTypes.STRING(300), allowNull: true },
        email: { type: DataTypes.STRING(150), allowNull: true },
        location: { type: DataTypes.STRING(150), allowNull: true },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
        sequelize,
        modelName: 'AboutMe',
        tableName: 'about_me'
    }
);

export default AboutMe;
