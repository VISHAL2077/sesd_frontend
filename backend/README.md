# Backend (Express + SQLite)

## Setup

1. `cd backend && npm install`
2. Copy `.env.example` to `.env` and set `JWT_SECRET` and `DB_FILE` path if desired
3. `npm run migrate` to create the database and tables
4. `npm start` to run the server

## Endpoints

- POST /api/auth/signup  { name, email, password, profile }
- POST /api/auth/signin  { email, password } -> { token }
- GET /api/transactions   (Authorization: Bearer <token>)
- POST /api/transactions  (Authorization: Bearer <token>)
- DELETE /api/transactions/:id (Authorization: Bearer <token>)
- GET /api/notes
- POST /api/notes
- DELETE /api/notes/:id
