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
      const allUsers= await User.find({username: {"$not": RegExp(user.username)}});
      res.render('profil', {user,allUsers, allTT, script: ['profil']});
    } catch (error) {
      next(error);
    }
  })
  
  router.post('/', isLoggedIn, async (req, res, next)=> {
    try {

      // console.log(req.body);
      // res.sendStatus(200);
      // return;
      const {title, ...users}= req.body;
      const partic= [];
      const editors=[];
      for(key in users){
        if(users[key]==='participant'){
          const userShare= await User.findOne({username: key});
          if(userShare) {
            partic.push(userShare._id);
          }
        }
        if(users[key]==='editor'){
          const userShare= await User.findOne({username: key});
          if(userShare){
            editors.push(userShare._id);
          }
        }
      }
      // console.log(partic);

      // console.log(req.body);
      // const partic= [];
      // for(key in req.body){
      //   if(req.body[key]==='on'){
      //     const userShare= await User.findOne({username: key});
      //     partic.push(userShare._id);
      //   }
      // }
      console.log(partic);
      const userId= await User.findOne({username: req.session.currentUser.username});
      const createTT= {
        title: req.body.title,
        admin: userId._id,
        participants: partic,
        editors: editors

      }
      const newTimeTable = await TimeTable.create(createTT);
      
      res.redirect(`/timetable/${newTimeTable._id}`);
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
      const partic= [];
      const edito= [];

      for(username of req.body.partic){
        const userShare= await User.findOne({username: username});
        partic.push(userShare._id);
      }
      for(username of req.body.edito){
        const userShare= await User.findOne({username: username});
        edito.push(userShare._id);
      }
      // console.log(partic);
      const upTT= {title: req.body.title, participants: partic, editors: edito};

      console.log(partic);
      // const upTT= {title: req.body.title, participants: partic};
      await TimeTable.findByIdAndUpdate(req.params.id, upTT)
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  })
router.get('/sharedtimetables', isLoggedIn, async (req, res, next) => {
  console.log(req.session.currentUser._id);
  const allShare= await TimeTable.find({$or:[{ participants: req.session.currentUser._id}, {editors: req.session.currentUser._id}]});  
  // console.log('hey '+allShare);
  // const allShare= await TimeTable.find({participants: req.session.currentUser._id});
  console.log('hey '+allShare);
  res.status(200).json(allShare);
})
  
  router.get('/timetables',isLoggedIn, async (req, res, next) => {
    const user= req.session.currentUser;
    const allTT= await TimeTable.find({admin: user._id}).populate('participants').populate('editors');

    // const allTT= await TimeTable.find({admin: user._id}).populate('participants');
    
    res.status(200).json(allTT);
  })
  
  router.get('/:id',isLoggedIn, async (req, res, next) => {
    const TT= await TimeTable.findById(req.params.id);
    // console.log(TT);
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

  // router.delete('/share/:id', isLoggedIn, async (req, res, next) => {
  //   try {
  //     const noFriend= await TimeTable.findById(req.params.id);
  //     const index= noFriend.participants.indexOf(req.session.currentUser._id);
  //     noFriend.participants.splice(index, 1);
  //     await TimeTable.findByIdAndUpdate(req.params.id, noFriend);
  //     res.status(200).json(noFriend);
  //   } catch (error) {
  //     next(error);
  //   }
  // })
  module.exports = router;