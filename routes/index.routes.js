const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();
const User= require('../models/User.model');
const TimeTable= require('../models/TimeTable.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get('/timetable', isLoggedIn, (req, res, next) => {
  res.render('timetable');
});
router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.post('/timetable', isLoggedIn, async (req, res, next)=> {
  try {
    
    const userId= await User.findOne({username: req.session.currentUser.username});
    const createTT= {
      title: req.body.title,
      admin: userId._id,
      participants: [],
    }
    const newTimeTable = await TimeTable.create(createTT);
    res.status(201).json(newTimeTable);
  } catch (error) {
    next(error);
  }
})
module.exports = router;
