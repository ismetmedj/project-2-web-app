const isLoggedIn = require('../middleware/isLoggedIn');
const TimeTable = require('../models/TimeTable.model');
const User = require('../models/User.model');
const Event= require('../models/Event.model');

const express = require("express");
const router = express.Router();

router.get('/:id', isLoggedIn, async (req, res, next) => {
    const TT= await TimeTable.findById(req.params.id);
    res.render('timetable', {TT, script: ['script']});
});
  
router.post('/:id', isLoggedIn, async (req, res, next) => {
    const struct= {...req.body, timeTable: req.params.id};
    const event= await Event.create(struct);
    res.status(201).json(event);
})
module.exports = router; 