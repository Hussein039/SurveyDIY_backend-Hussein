let express = require('express');
let router = express.Router();
let responseController = require('../controllers/response');
let passport = require('passport');

// response can be viewed by created
/* GET Route for displaying response list according to surveyId*/
router.get('/:surveyId', passport.authenticate('jwt', {session: false}), responseController.list);

// response can be made by anonymous
/* POST Route for processing the Add page - CREATE Operation */
router.post('/:surveyId', responseController.add);

// response can be viewed by created
/* GET Route for statistics of response according to surveyId*/
router.get('/statistics/:surveyId', passport.authenticate('jwt', {session: false}), responseController.statistics);

module.exports = router;