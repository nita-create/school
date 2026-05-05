import express from 'express'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())

// use routes
app.use('/api', userRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})