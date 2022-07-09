//These are all the view routes for your application
const router = require('express').Router();
const { getRandomMap } = require('../utils/maps');
const { Map, Users, UserChar } = require("../models")

// Start page for the app, the root page
router.get('/', (req, res) => {
  res.render('home');
});

// Login/Signup page
router.get('/login', (req, res) => {
  res.render('login');
});

// After login verification, game start/continue screen
router.get('/start', async (req, res) => {
  console.log(req.session)
  //get user characters 
  const user = await Users.findOne({ where: { id: req.session.userId } });
  console.log("USER", user.dataValues);
  if (!user) return res.redirect('/login');
  //if they have saved characters
  const chars = await UserChar.findAll({ where: { user_id: req.session.userId } });
  const charsClean = chars.map(c => c.get({ plain: true }))
  console.log(charsClean)
  //get chars from db
  res.render('start', { char: [{ "filename": "Warrior_L.png", "job_class": "Warrior" }, { "filename": "Mage_L.png", "job_class": "Mage" }, { "filename": "Cleric_L.png", "job_class": "Cleric" }], userChars: charsClean });
})

// Game screen with procedurally generated map
router.get('/game/:charid', async (req, res) => {
  //some context to what char was created
  const currentChar = await UserChar.findByPk(req.params.charid, { plain: true });
  const currentMap = await Map.findOne({ where: { char_id: req.params.charid } });
  const userInfo = await Users.findByPk(currentChar.dataValues.user_id);
  if (!currentMap) {
    //only gen new map if new char, or new level
    const map = getRandomMap(req.params.charid);
    //now you have procedural map, now save it with user-char info,
    const mapSave = await Map.create({ name: map.name, map: JSON.stringify(map), char_id: req.params.charid })
    res.render('game', { map, character: currentChar.dataValues, user: userInfo.dataValues, });
  } else {
    res.render('game', { map: {...currentMap.dataValues, ...JSON.parse(currentMap.dataValues.map)}, user: userInfo.dataValues, character: currentChar.dataValues })
  }
});

module.exports = router;

