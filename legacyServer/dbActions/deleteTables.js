const db = require('../dbConnect')
const { tableNames } = require('..')

const deleteTables = () => {
  const queries = [
    `DROP TABLE IF EXISTS ${tableNames.items};`,
    `DROP TABLE IF EXISTS ${tableNames.inventoryTables};`,
    `DROP TABLE IF EXISTS ${tableNames.houseAreas};`,
  ]

  queries.forEach((query) => {
    db.query(query, (error, results, fields) => {
      if (error) {
        throw error
      }
      console.log(`Table deleted successfully: ${query}`)
    })
  })
}

deleteTables()
