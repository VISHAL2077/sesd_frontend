import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

export default function Navbar(){
  const nav = useNavigate()
  async function logout(){
    await signOut(auth)
    nav('/signin')
  }
  return (
    <nav className="nav">
      <Link to="/">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/reports">Reports</Link>
      <button onClick={logout}>Sign out</button>
    </nav>
  )
}
