import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Presentation extends Model {}

Presentation.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        greeting: { type: DataTypes.STRING(100), defaultValue: 'Hola, soy' },
        name: { type: DataTypes.STRING(150), allowNull: false },
        title: { type: DataTypes.STRING(200), allowNull: false },
        subtitle: { type: DataTypes.STRING(300), allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        cta_text: { type: DataTypes.STRING(80), defaultValue: 'Ver proyectos' },
        cta_url: { type: DataTypes.STRING(200), defaultValue: '#projects' },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
        sequelize,
        modelName: 'Presentation',
        tableName: 'presentations'
    }
);

export default Presentation;
