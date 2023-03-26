import express from 'express'
import corsMiddleware from './middleware/cors'
import routes from './routes'

const app = express()

// Add middleware to parse JSON request bodies
app.use(express.json())

// Add CORS middleware
app.use(corsMiddleware)

// Add routes
app.use(routes)

// Handle 404s
app.use((req, res) => {
  res.status(404).end()
})

export default app
