const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const MONGO_URI =
    process.env.MONGODB_URI ||
    'mongodb+srv://lekix:H8232tRAA4L6fNj@timetables.n1szt8g.mongodb.net/?retryWrites=true&w=majority'

const users = require('../seeds/user.json')
const events = require('../seeds/event.json')
const timeTables = require('../seeds/timeTable.json')

const Event = require('../models/Event.model')
const User = require('../models/User.model')
const TimeTable = require('../models/TimeTable.model')

mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(async (x) => {
        try {
            const dbName = x.connections[0].name
            console.log(`Connected to Mongo! Database name: "${dbName}"`)

            await seedUsers()
            await seedTimeTables()
            await seedEvents()
            await mongoose.disconnect()
        } catch (error) {
            console.error(error)
        }
    })
    .catch((err) => {
        console.error('Error connecting to mongo: ', err)
    })

async function seedUsers() {
    await User.deleteMany()
    await cryptUsersPassword()
    await User.create(users)
}

async function cryptUsersPassword() {
    for (const user of users) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
    }
}

async function seedTimeTables() {
    // faire une boucle sur notre array de timetables (qui contient title et admin)
    // pour chaque, on trouve le user qui correspond à l'admin voulu (recherche findOne sur la table User)
    // On réassigne timetable.admin pour lui donner comme valeur l'id de l'élément qu'on vient de trouver
    // et à la fin on create
    await TimeTable.deleteMany()
    for (const timeTable of timeTables) {
        const author = await User.findOne({ username: timeTable.admin })
        timeTable.admin = author._id
    }
    await TimeTable.create(timeTables)
}

async function seedEvents() {
    await Event.deleteMany()
    for (const event of events) {
        const timeTable = await TimeTable.findOne({ title: event.timeTable })
        event.timeTable = timeTable._id
    }
    await Event.create(events)
}
