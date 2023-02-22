const isLoggedIn = require('../middleware/isLoggedIn');
const TimeTable = require('../models/TimeTable.model');
const User = require('../models/User.model');
const Event= require('../models/Event.model');

const express = require("express");
const router = express.Router();

router.get('/:id/event', isLoggedIn, async (req, res, next) => {
    const allEvent= await Event.find({timeTable: req.params.id});
    const allEvent= await Event.find({admin: req.params.id});
    // console.log(allEvent);
    res.status(200).json(allEvent);
})

router.get('/:id', isLoggedIn, async (req, res, next) => {
    const TT= await TimeTable.findById(req.params.id);
    res.render('timetable', {TT, script: ['script']});
});
  
router.post('/:id', isLoggedIn, async (req, res, next) => {
    const struct= {...req.body, timeTable: req.params.id};
    const event= await Event.create(struct);
    res.status(201).json(event);
})

router.patch('/:id/event/:eventId', isLoggedIn, async (req, res, next) => {
    // const editEvent= {
    //     title: req.body.title,
    //     content: req.body.content,
    //     hour: req.body.hour,
    //     day: req.body.day,
    //     timeTable: req.params.id
    // };
    // console.log(req.body);
    const editEvent= {...req.body};
    await Event.findByIdAndUpdate(req.params.eventId, editEvent);
    res.sendStatus(200);
})

router.delete('/event/:eventId', isLoggedIn, async (req, res, next) => {
    await Event.findByIdAndDelete(req.params.eventId);
    // console.log(req.params.eventId);
    res.sendStatus(200);
})
module.exports = router; 