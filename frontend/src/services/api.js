/*
 Optional API wrapper for future Express backend.
 Currently we use Firebase directly from the frontend.
 This file provides a small wrapper example for fetch calls.
*/
export async function postJson(url, body){
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return r.json()
}
