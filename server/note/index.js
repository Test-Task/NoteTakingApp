var express = require('express');
var router = express.Router();
var validator = require('express-validator');
router.use(validator());
var path = require("path");
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var Auth = require('../../passport/auth');

var noteController = require('./note_ctrl');



router.post('/addNote', Auth.isAuthenticated, function(req, res) {
    noteController.addNote(req, res);
});

router.get('/getallNotes/:userId', Auth.isAuthenticated, function(req, res) {
    noteController.getallNotes(req, res);
});

router.post('/updateNote', Auth.isAuthenticated, function(req, res) {
    noteController.updateNote(req, res);
});

router.get('/deleteNote/:id', Auth.isAuthenticated, function(req, res) {
    noteController.deleteNote(req, res);
});

router.get('/getNoteById/:id', Auth.isAuthenticated, function(req, res) {
    noteController.getNoteById(req, res);
});



module.exports = router;
