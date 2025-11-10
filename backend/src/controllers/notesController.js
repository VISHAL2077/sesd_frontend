const sqlite3 = require('sqlite3').verbose()
const { DB_FILE } = require('../utils/dbConnect')

function getDb(){ return new sqlite3.Database(process.env.DB_FILE || DB_FILE) }

exports.addNote = (req, res) => {
  const { text, due } = req.body
  const user_id = req.user.id
  const db = getDb()
  const stmt = db.prepare('INSERT INTO notes (user_id, text, due) VALUES (?,?,?)')
  stmt.run(user_id, text, due || null, function(err){
    stmt.finalize(); db.close(); if(err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID })
  })
}

exports.listNotes = (req, res) => {
  const user_id = req.user.id
  const db = getDb()
  db.all('SELECT * FROM notes WHERE user_id = ? ORDER BY due', [user_id], (err, rows)=>{ db.close(); if(err) return res.status(500).json({ error: err.message }); res.json(rows) })
}

exports.deleteNote = (req, res) => {
  const id = req.params.id
  const db = getDb()
  db.run('DELETE FROM notes WHERE id = ?', [id], function(err){ db.close(); if(err) return res.status(500).json({ error: err.message }); res.json({ deleted: true }) })
}
