import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js';

class User extends Model {
    async validatePassword(plainPassword) {
        return bcrypt.compare(plainPassword, this.password);
    }
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.ENUM('admin'), defaultValue: 'admin' }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 12);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            }
        }
    }
);

export default User;
