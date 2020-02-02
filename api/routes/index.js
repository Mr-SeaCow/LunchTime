const express = require('express');
const router = express.Router();
const { sqlInterface } = require('../services/sqlserver')

function isAuthorized(req, res, next) {
  if (!req.query.apiKey) res.redirect('/notAuthorized');
  if (req.query.apiKey === process.env.API_KEY) {
    next();
  }
  res.redirect('/notAuthorized');
}

router.get('/', isAuthorized, async function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getStudents', function (req, res, next) {
  sqlInterface.getStudents({
    lunch: req.query.LunchPeriod,
    grade: req.query.GradeNumber,
    isActive: req.query.IsActive
  }, (sqlRes) => {
    res.send(sqlRes);
  })
});

router.get('/getStudent', function (req, res, next) {
  sqlInterface.getStudent({ studentId: req.query.StudentID }, (sqlRes) => {
    res.send(sqlRes);
  })
});

router.get('/getAccount', function (req, res, next) {
  sqlInterface.getAccount({ accountId: req.query.AccountID }, (sqlRes) => {
    res.send(sqlRes);
  })
});

router.get('/getAccounts', function (req, res, next) {
  sqlInterface.getAccounts((sqlRes) => {
    res.send(sqlRes);
  })
});

router.get('/getStudentAndAccount', function (req, res, next) {
  sqlInterface.getStudentAndAccount({ studentId: req.query.StudentID }, (sqlRes) => {
    res.send(sqlRes);
  })
});

router.get('/getFood', function (req, res, next) {
  sqlInterface.getFood({
    foodId: req.query.FoodID,
    foodCategory: req.query.FoodCategory,
    isActive: req.query.IsActive
  }, (sqlRes) => {
    res.send(sqlRes);
  })
});


// CHANGE TO POST!
router.get('/createStudent', function (req, res, next) {
  sqlInterface.createStudent({
    accountId: req.query.AccountID,
    firstName: req.query.FirstName,
    lastName: req.query.LastName,
    gradeNumber: req.query.GradeNumber,
    allowChargingLunch: req.query.AllowChargingLunch,
    hotLunchOnly: req.query.HotLunchOnly,
    allergies: req.query.Allergies,
    emailAddress: req.query.EmailAddress
  }, (sqlRes) => {
    res.send(sqlRes);
  })
});
// CHANGE TO POST!
router.get('/createFood', function (req, res, next) {
  sqlInterface.createFood({
    foodName: req.query.FoodName,
    foodCategory: req.query.FoodCategory,
    foodAmount: req.query.FoodAmount
  }, (sqlRes) => {
    res.send(sqlRes);
  })
});



router.get('/notAuthorized', function (req, res, next) {
  res.render('authErr', { title: 'Express' });
});

module.exports = router;
