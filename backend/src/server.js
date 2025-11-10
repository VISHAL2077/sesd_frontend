require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const txRoutes = require('./routes/transactions')
const notesRoutes = require('./routes/notes')
const { initDb } = require('./utils/dbConnect')

const app = express()
app.use(bodyParser.json())

// Initialize DB (ensure tables exist)
initDb()

app.use('/api/auth', authRoutes)
app.use('/api/transactions', txRoutes)
app.use('/api/notes', notesRoutes)

app.get('/', (req, res) => res.json({ message: 'Finance Tracker backend is running' }))

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server running on port', port))
