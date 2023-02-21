const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const User = require('../models/User.model')
const TimeTable = require('../models/TimeTable.model')
const isLoggedOut = require('../middleware/isLoggedOut')

/* GET home page */
router.get('/', isLoggedOut, (req, res, next) => {
    res.render('./auth/login')
})

router.get('/users', async (req, res, next) => {
    const allUsers= await User.find();
    res.render('./users', {allUsers})
})
router.post('/users', async (req, res, next) => {
    const user= req.session.currentUser;
    const all= await User.find({username: {"$not": RegExp(user.username)}});
    res.status(200).json(all);
})
module.exports = router
