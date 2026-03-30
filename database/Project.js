import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Project extends Model {}

Project.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING(200), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        tech_stack: {
            type: DataTypes.JSON,
            defaultValue: [],
            comment: 'Array de tecnologías usadas: ["React","Node.js",...]'
        },
        image_url: { type: DataTypes.STRING(500), allowNull: true },
        github_url: { type: DataTypes.STRING(300), allowNull: true },
        demo_url: { type: DataTypes.STRING(300), allowNull: true },
        is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
        display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
        sequelize,
        modelName: 'Project',
        tableName: 'projects'
    }
);

export default Project;
