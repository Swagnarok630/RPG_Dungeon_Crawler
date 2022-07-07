const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Enemies extends Model { }

Enemies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hitpoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // TODO: Create/Search for potion images to use. Maybe red for HP, blue for MP, and purple for both
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
        modelName: 'enemy',
    }
);

module.exports = Enemies;