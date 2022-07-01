const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Map extends Model { }

Map.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //name this column whatever you want
        name: {
            //this is the type of data that will be stored in this column
            type: DataTypes.STRING,
            //each time a row of data is inserted, this column will need to have a value
            allowNull: false,
        },
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