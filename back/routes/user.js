// routes - user
const express = require('express');
const router = express.Router();
//const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth'); //modifier nom

//sync sql
const db = require('../models');
router.get('/', function(req, res, next) {
    db.api.findAll({ limit: 10 }).then(function(rows) {
       res.render('user', { rows: rows });
   });
});

//router
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/register', authCtrl.signup); //novinka

module.exports = router;