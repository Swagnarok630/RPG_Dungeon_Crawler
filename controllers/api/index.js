//THIS index file is the entry point of our API(data) routes,
//it will bring in all api routes and export 1 router middleware
const router = require('express').Router();

const gameRoutes = require('./apiRoutes');
const userRoutes = require('./userRoutes')

router.use('/game', gameRoutes);
router.use('/users', userRoutes)

module.exports = router;