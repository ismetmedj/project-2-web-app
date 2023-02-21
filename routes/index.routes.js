const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const User = require('../models/User.model')
const TimeTable = require('../models/TimeTable.model')

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('./auth/login')
})

module.exports = router
