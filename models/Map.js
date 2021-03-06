const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Map extends Model { }

Map.init(
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
        map: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        char_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "user_character",
                key: "id",
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'map',
    }
);

module.exports = Map;