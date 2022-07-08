//These are all the view routes for your application
const router = require('express').Router();
const { getRandomMap } = require('../utils/maps');
const { Map } = require("../models")

// Start page for the app, the root page
router.get('/', (req, res) => {
  res.render('home');
});

// Login/Signup page
router.get('/login', (req, res) => {
  res.render('login');
});

// After login verification, game start/continue screen
router.get('/start', (req, res) => {
  //get chars from db
  res.render('start', { char: [{ "filename": "Warrior_L.png", "job_class": "Warrior" }, { "filename": "Mage_L.png", "job_class": "Mage" }, { "filename": "Cleric_L.png", "job_class": "Cleric" }] });
})

// Game screen with procedurally generated map
router.get('/game/:charid', async (req, res) => {
  //some context to what char was created
  const map = getRandomMap(req.params.charid);
  //now you have procedural map, now save it with user-char info,
  // const mapSave = await Map.create({ title: map.name, map: JSON.stringify(map), char_id: req.params.charid })
  res.render('game', map);
});

module.exports = router;

