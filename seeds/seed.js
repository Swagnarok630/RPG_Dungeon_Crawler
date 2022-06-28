const sequelize = require('../config/connection');
const { Example } = require('../models');
const exampleData = require('./exampleData.json');

// force: true will drop the table if it already exists
//npm run seed will execute this file, which will seed the database with the example data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const examples = await Example.bulkCreate(exampleData);
  console.log(`seeded ${examples.length} examples`);
  process.exit(0);
};

seedDatabase();