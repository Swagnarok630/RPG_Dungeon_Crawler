const router = require('express').Router();
// const { Example } = require('../../models');
const seeder = require("../../seeds/seed")

//this get routes will return all data of example table from the database
// router.get('/', async (req, res) => {
//   const examplesData = await Example.findAll();
//   console.log('examples', examplesData);
//   res.json(examplesData);
// });

router.post('/super-secret-seeder', async (req, res) => {
  if (req.headers.authorization !== process.env.SUPER_SECRET) return res.json("CANNOT SEED, WRONG CREDENTIALS");
  await seeder();
  res.json("db seeded!")
})

module.exports = router;