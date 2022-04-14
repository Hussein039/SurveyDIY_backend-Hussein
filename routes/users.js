var express = require('express');
var router = express.Router();
let userController = require('../controllers/user')

let passport = require('passport');


/* GET users listing. */
router.get('/',passport.authenticate('jwt', {session: false}), userController.retrieve);

// Sign-up
router.post('/', userController.signup);

// Sign-in
router.post('/signin', userController.signin);

// Routers for edit
router.put('/', passport.authenticate('jwt', {session: false}), userController.processEdit);

module.exports = router;
