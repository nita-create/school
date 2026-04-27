import express from 'express'
import mysql from 'mysql2'

const app = express()
app.use(express.json())

// MySQL connection pool
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database: school')
})



// GET all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users'
  connection.query(query,  (err, results) => {
    if (err) {
      console.error('Error fetching users:', err)
      return res.status(500).send({ 
        error: 'Error fetching users'
       
     })
   
    }
    res.send(results)
  })
})

// GET user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const query = 'SELECT * FROM users WHERE id = ?'
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err)
      return res.status(500).send({ error: 'Error fetching user' })
    }
    if (results.length === 0) {
      return res.status(404).send({ error: 'User not found' })
    }
    res.send(results[0])
  })
})

// CREATE new user
app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: 'Name is required' })
  }
  const query = 'INSERT INTO users (name) VALUES (?)'
  connection.query(query, [req.body.name], (err, results) => {
    if (err) {
      console.error('Error creating user:', err)
      return res.status(500).send({ error: 'Error creating user' })
    }
    res.status(201).send({
      id: results.insertId,
      name: req.body.name,
      message: 'User created successfully'
    })
  })
})

// UPDATE user by ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!req.body.name) {
    return res.status(400).send({ error: 'Name is required' })
  }
  const query = 'UPDATE users SET name = ? WHERE id = ?'
  connection.query(query, [req.body.name, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err)
      return res.status(500).send({ error: 'Error updating user' })
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ error: 'User not found' })
    }
    res.send({ id, name: req.body.name })
  })
})

// DELETE user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const query = 'DELETE FROM users WHERE id = ?'
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err)
      return res.status(500).send({ error: 'Error deleting user' })
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ error: 'User not found' })
    }
    res.json({ message: 'User deleted successfully' })
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
