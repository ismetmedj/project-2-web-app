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
  
module.exports = router; 