// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

app.use((req, res, next) => {
      if (req.session.currentUser) {
        // res.locals.currentUser = req.session.currentUser
        res.locals.isLoggedIn = true
      }
      next() 
})

const capitalize = require('./utils/capitalize')
const projectName = 'Project-2'

// app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const profilRoutes = require('./routes/profil.routes')
app.use('/profil', profilRoutes)

const timeTableRoutes = require('./routes/timetable.routes')
app.use('/timetable', timeTableRoutes)
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
