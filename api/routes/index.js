const express = require('express');
const router = express.Router();

function isAuthorized(req, res, next) {
    if (!req.query.apiKey) res.redirect('/notAuthorized');
    if (req.query.apiKey === process.env.API_KEY) {
       next();
    }
    res.redirect('/notAuthorized');
}

router.get('/', isAuthorized, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notAuthorized', function(req, res, next) {
  res.render('authErr', { title: 'Express' });
});

module.exports = router;
