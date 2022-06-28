const router = require('express').Router();
const { Example } = require('../../models');

//this get routes will return all data of example table from the database
router.get('/', async (req, res) => {
  const examplesData = await Example.findAll();
  console.log('examples', examplesData);
  res.json(examplesData);
});

module.exports = router;