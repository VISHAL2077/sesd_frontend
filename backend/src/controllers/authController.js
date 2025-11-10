const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { DB_FILE } = require('../utils/dbConnect')
const SECRET = process.env.JWT_SECRET || 'dev_secret'

function getDb(){ return new sqlite3.Database(process.env.DB_FILE || DB_FILE) }

exports.signup = async (req, res) => {
  const { name, email, password, profile } = req.body
  if(!email || !password) return res.status(400).json({ error: 'email and password required' })
  const hashed = await bcrypt.hash(password, 10)
  const db = getDb()
  const stmt = db.prepare('INSERT INTO users (name,email,password,profile) VALUES (?,?,?,?)')
  stmt.run(name || null, email, hashed, JSON.stringify(profile || {}), function(err){
    stmt.finalize()
    db.close()
    if(err) return res.status(400).json({ error: err.message })
    const token = jwt.sign({ id: this.lastID, email }, SECRET, { expiresIn: '7d' })
    res.json({ token })
  })
}

exports.signin = (req, res) => {
  const { email, password } = req.body
  const db = getDb()
  db.get('SELECT id, email, password FROM users WHERE email = ?', [email], async (err, row)=>{
    db.close()
    if(err) return res.status(500).json({ error: err.message })
    if(!row) return res.status(401).json({ error: 'invalid' })
    const ok = await bcrypt.compare(password, row.password)
    if(!ok) return res.status(401).json({ error: 'invalid' })
    const token = jwt.sign({ id: row.id, email: row.email }, SECRET, { expiresIn: '7d' })
    res.json({ token })
  })
}
