const sequelize = require('../config/connection');
const { Chars, Items, Skills, Enemies } = require('../models');
const charData = require("./charsData.json");
const itemData = require("./itemsData.json");
const skillData = require("./skillsData.json");
const enemyData = require("./enemiesData.json");

// force: true will drop the table if it already exists
//npm run seed will execute this file, which will seed the database with the example data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const chars = await Chars.bulkCreate(charData);
  const items = await Items.bulkCreate(itemData);
  const skills = await Skills.bulkCreate(skillData);
  const enemies = await Enemies.bulkCreate(enemyData);
  console.log(`seeded ${chars.length} character data`);
  console.log(`seeded ${items.length} item data`);
  console.log(`seeded ${skills.length} skill data`);
  console.log(`seeded ${enemies.length} skill data`);

  process.exit(0)
};
module.exports = seedDatabase;
// seedDatabase();
