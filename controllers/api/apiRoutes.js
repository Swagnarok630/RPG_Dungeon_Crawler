const router = require('express').Router();

const seeder = require("../../seeds/seed")



router.post('/super-secret-seeder', async (req, res) => {
  if (req.headers.authorization !== process.env.SUPER_SECRET) return res.json("CANNOT SEED, WRONG CREDENTIALS");
  await seeder();
  res.json("db seeded!")
})

module.exports = router;