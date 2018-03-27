var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var mongoose = require('../utils/database.js');

router.post( "/regist", userController.regist );
router.post( "/login", userController.login );

module.exports = router;
