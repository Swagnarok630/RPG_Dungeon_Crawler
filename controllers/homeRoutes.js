//These are all the view routes for your application
const router = require('express').Router();
const { genMap2, genMapv2 } = require("../models/maps");
//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/otherpage', (req, res) => {
  //this will render the view otherpage.handlebars
  res.render('otherpage');
});

router.get("/map", (req, res) => {
  const mapData = genMapv2().map(row => ({ cols: row }));
  console.log(mapData)
  res.render("map", { row: mapData })
})

module.exports = router;