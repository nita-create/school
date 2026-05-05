import mysql from 'mysql2/promise'

// create connection pool (better than single connection)
export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
})