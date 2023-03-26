const express = require('express')
const db = require('./dbConnect')

const app = express()

// Add middleware to parse JSON request bodies
app.use(express.json())

app.use((req, res) => {
  res.status(404).end()
})

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const tableNames = {
  houseAreas: 'House_areas',
  inventoryTables: 'Inventory_tables',
  items: 'Items',
}

const query = async (sqlQuery) => {
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, tableNames, query }
