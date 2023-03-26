const db = require('../dbConnect')

const showTables = () => {
  db.query('SHOW TABLES', (error, results, fields) => {
    if (error) {
      throw error
    }
    console.log('Tables in database:')
    results.forEach((result) => {
      console.log(result)
    })
  })
}

const showHouseAreasTable = () => {
  db.query('SELECT * FROM House_areas', (error, results, fields) => {
    if (error) {
      throw error
    }
    console.log('House_areas Table:')
    results.forEach((result) => {
      console.log(result)
    })
  })
}

showTables()
showHouseAreasTable()
