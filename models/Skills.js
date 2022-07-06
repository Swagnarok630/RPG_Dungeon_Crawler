const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Skills extends Model { }

Skills.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mpcost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
        // TODO: Create/Search for skill icon images to use. Maybe a sword/staff for attack, a slash for double attack, a fireball for fireball, and healing star for cure
        // filename: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'skill',
    }
);

module.exports = Skills;