const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Items extends Model { }

Items.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        potion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
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
        modelName: 'item',
    }
);

module.exports = Items;