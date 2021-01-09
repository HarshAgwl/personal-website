import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import Auth from './auth/index.js'
import config from './config/default.js'
import routes from './routes/index.js'

const app = express()

const auth = new Auth(app)

const __dirname = path.resolve()
const root = path.join(__dirname, '../client/build')

app.use(express.static(root))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routes);

app.get('/api/users', auth.ensureAuthenticated)
app.post('/api/users/login', auth.authenticate(), auth.getUser.bind(auth))
app.post('/api/users/logout', auth.logout.bind(auth))

app.get("*", (req, res) => {
    res.sendFile('index.html', { root })
})

mongoose.connect(config.mongoDbUrl);

const db = mongoose.connection;

db.on('error', function(err) { console.log(err.message); });

db.once('open', () => {
    console.log("Successfully connected to the database");
});

const port = process.env.port || 8085

app.listen(port)