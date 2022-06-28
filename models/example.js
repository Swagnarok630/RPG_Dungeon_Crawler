const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Example extends Model {}

Example.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //name this column whatever you want
    column1: {
      //this is the type of data that will be stored in this column
      type: DataTypes.STRING,
      //each time a row of data is inserted, this column will need to have a value
      allowNull: false,
    },
    column2: {
      type: DataTypes.INTEGER,
      //value in this column is optional (can be nullish)
      allowNull: true,
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
    modelName: 'example',
  }
);

module.exports = Example;