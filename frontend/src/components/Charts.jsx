import React from 'react'

export default function Charts({ summary }){
  // Simple textual chart placeholders — replace with chart library if needed
  if(!summary) return null
  return (
    <div>
      <h4>Income vs Expense</h4>
      <p>Income: {summary.income} Expense: {summary.expense} Saving: {summary.saving}</p>
    </div>
  )
}
