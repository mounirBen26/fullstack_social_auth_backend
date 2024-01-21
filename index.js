const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const passportSetup = require('./passport')
const authRoute = require('./routes/auth')

const app = express()

// app.use(session({
//     name:'session',keys:'moun',maxAge:24*60*60*100
// }))
app.use(session({
    secret: 'keyboard cat',
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET,POST,PUT,DELETE',
    credentials:true
}))
app.use('/auth',authRoute)
app.listen(5000, ()=>{
    console.log('Server Running...')
})