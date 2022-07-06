const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chars extends Model { }

Chars.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        job_class: {
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
        manapoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // TODO: Create/Search for character images to use. Maybe fighter for warrior, black mage for mage, and white mage for cleric
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
        modelName: 'char',
    }
);

module.exports = Chars;