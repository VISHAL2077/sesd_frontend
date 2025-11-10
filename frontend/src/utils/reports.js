import { startOfMonth, endOfMonth } from 'date-fns'

export function monthlySummary(transactions, year, month){
  const start = new Date(year, month-1, 1)
  const end = new Date(year, month, 0, 23,59,59)
  const filtered = transactions.filter(t => {
    const d = t.date && t.date.seconds ? new Date(t.date.seconds*1000) : new Date(t.date)
    return d >= start && d <= end
  })
  let income = 0, expense = 0
  filtered.forEach(t => { if(t.type==='income') income += Number(t.amount); else expense += Number(t.amount) })
  return { income, expense, saving: income - expense, entries: filtered }
}

export function annualSummary(transactions, year, startMonth=1){
  const months = []
  for(let m=startMonth;m<=12;m++) months.push({ month:m, ...monthlySummary(transactions, year, m) })
  const totalIncome = months.reduce((s,a)=>s+a.income,0)
  const totalExpense = months.reduce((s,a)=>s+a.expense,0)
  return { months, totalIncome, totalExpense, saving: totalIncome - totalExpense }
}
