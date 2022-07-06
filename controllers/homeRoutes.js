//These are all the view routes for your application
const router = require('express').Router();
const { genMap2, genMapv2, getRandomMap } = require("../utils/maps");
//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  //this will render the view otherpage.handlebars
  res.render('login');
});

router.get("/game", async (req, res) => {
  // const mapData = genMapv2().map(row => ({ cols: row }));
  // console.log(mapData)
  const map = await getRandomMap();
  res.render("game", map)
})

module.exports = router;