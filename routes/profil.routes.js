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

  router.get('/timetables', async (req, res, next) => {
    const user= req.session.currentUser;
    const allTT= await TimeTable.find({admin: user._id});
    
    res.status(200).json(allTT);
  })

  router.delete('/:id', async (req, res, next) => {
    try {
      await TimeTable.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error)
    }
  })

  module.exports = router;