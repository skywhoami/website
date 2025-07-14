export default defineEventHandler(async event => {
  const db = useDatabase('DB')

  await db.sql`
  CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `

  const { rows } =
    await db.sql`SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC`
  return rows
})
