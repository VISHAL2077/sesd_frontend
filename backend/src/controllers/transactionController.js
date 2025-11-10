const Model = require('../models/transactionModel')

exports.create = (req, res) => {
  const user_id = req.user.id
  const { date, type, name, amount } = req.body
  if(!date || !name || !amount) return res.status(400).json({ error: 'missing fields' })
  Model.createTransaction({ user_id, date, type, name, amount }, (err, id)=>{
    if(err) return res.status(500).json({ error: err.message })
    res.json({ id })
  })
}

exports.list = (req, res) => {
  const user_id = req.user.id
  Model.listTransactions(user_id, (err, rows)=>{
    if(err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Model.deleteTransaction(id, (err, changes)=>{
    if(err) return res.status(500).json({ error: err.message })
    if(changes === 0) return res.status(404).json({ error: 'not found' })
    res.json({ deleted: true })
  })
}
