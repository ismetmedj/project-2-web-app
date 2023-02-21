const isLoggedIn = require('../middleware/isLoggedIn');
const TimeTable = require('../models/TimeTable.model');
const User = require('../models/User.model');

const express = require("express");
const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    const user= req.session.currentUser;
    // console.log('   '+user);
    try {
      const allTT= await TimeTable.find({admin: user._id});
      res.render('profil', {user, allTT, script: ['profil']});
    } catch (error) {
      next(error);
    }
  })
  
  router.post('/', isLoggedIn, async (req, res, next)=> {
    try {
      const userId= await User.findOne({username: req.session.currentUser.username});
      const createTT= {
        title: req.body.title,
        admin: userId._id,
        participants: [],
      }
      const newTimeTable = await TimeTable.create(createTT);
      
      res.redirect(`/timetable/${newTimeTable._id}`);
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
      console.log(req.body);
      const upTT= {...req.body};
      await TimeTable.findByIdAndUpdate(req.params.id, upTT)
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  })
router.get('/sharedtimetables', isLoggedIn, async (req, res, next) => {
  console.log(req.session.currentUser._id);
  const allShare= await TimeTable.find({participants: req.session.currentUser._id});
  console.log('hey '+allShare);
  res.status(200).json(allShare);
})
  
  router.get('/timetables',isLoggedIn, async (req, res, next) => {
    const user= req.session.currentUser;
    const allTT= await TimeTable.find({admin: user._id});
    
    res.status(200).json(allTT);
  })
  
  router.get('/:id',isLoggedIn, async (req, res, next) => {
    const TT= await TimeTable.findById(req.params.id);
    res.status(200).json(TT);
  })
  router.delete('/:id',isLoggedIn, async (req, res, next) => {
    try {
      await TimeTable.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error)
    }
  })

  router.delete('/share/:id', isLoggedIn, async (req, res, next) => {
    try {
      const noFriend= await TimeTable.findById(req.params.id);
      const index= noFriend.participants.indexOf(req.session.currentUser._id);
      noFriend.participants.splice(index, 1);
      await TimeTable.findByIdAndUpdate(req.params.id, noFriend);
      res.status(200).json(noFriend);
    } catch (error) {
      next(error);
    }
  })
  module.exports = router;