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
    },
    {
        hooks: {
            //this hook/function will run everytime before a new row is inserted
            beforeCreate: async (data) => {
                //modify the data/payload if you want, hash password, normalize data, etc.
                data.column1 = data.column1 + ' WOW!';
                //value for column1 will always have 'WOW!' appended to it
                return data;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'items',
    }
);

module.exports = Items;