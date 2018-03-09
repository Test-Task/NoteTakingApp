var express = require('express');
var router = express.Router();
var validator = require('express-validator');
router.use(validator());
var path = require("path");
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var passport = require('passport');
var Auth = require('../../passport/auth');

var usersController = require('./users_ctrl');


router.get('/', function (req, res, next) {
    res.render('/index.html');
});

router.post('/login', function (req, res) {
    usersController.loginUser(req, res);
});

router.post('/register', function (req, res) {
    usersController.registerUser(req, res);
});





module.exports = router;
