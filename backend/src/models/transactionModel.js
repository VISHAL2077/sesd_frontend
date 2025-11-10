const sqlite3 = require('sqlite3').verbose()
const { DB_FILE } = require('../utils/dbConnect')

function getDb(){ return new sqlite3.Database(process.env.DB_FILE || DB_FILE) }

function createTransaction(tx, cb){
  const db = getDb()
  const stmt = db.prepare('INSERT INTO transactions (user_id, date, type, name, amount) VALUES (?,?,?,?,?)')
  stmt.run(tx.user_id, tx.date, tx.type, tx.name, tx.amount, function(err){
    stmt.finalize(); db.close(); cb(err, this ? this.lastID : null)
  })
}

function listTransactions(user_id, cb){
  const db = getDb()
  db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [user_id], (err, rows)=>{ db.close(); cb(err, rows) })
}

function deleteTransaction(id, cb){
  const db = getDb()
  db.run('DELETE FROM transactions WHERE id = ?', [id], function(err){ db.close(); cb(err, this.changes) })
}

module.exports = { createTransaction, listTransactions, deleteTransaction }
