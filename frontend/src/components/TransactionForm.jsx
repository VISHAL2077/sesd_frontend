import React, { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../services/firebase'

export default function TransactionForm({ uid }){
  const [t, setT] = useState({ date: '', type: 'expense', amount:'', name: '' })

  async function submit(e){
    e.preventDefault()
    const docRef = collection(db, 'users', uid, 'transactions')
    await addDoc(docRef, { ...t, amount: Number(t.amount), date: new Date(t.date), createdAt: Timestamp.now() })
    setT({ date:'', type:'expense', amount:'', name:'' })
  }

  return (
    <form onSubmit={submit} className="tx-form">
      <input type="date" required value={t.date} onChange={e=>setT({...t,date:e.target.value})} />
      <select value={t.type} onChange={e=>setT({...t,type:e.target.value})}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input required placeholder="Name (salary, rent...)" value={t.name} onChange={e=>setT({...t,name:e.target.value})} />
      <input required placeholder="Amount" type="number" value={t.amount} onChange={e=>setT({...t,amount:e.target.value})} />
      <button type="submit">Add</button>
    </form>
  )
}
