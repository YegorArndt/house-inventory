const db = require('../dbConnect')
const { tableNames } = require('..')

const initialHouseAreasAndTheirTables = {
  kitchen: [
    {
      tableName: 'food',
      items: [
        {
          itemName: 'bread',
          quantity: 2,
          daysToUseUp: 3,
          price: 2,
        },
        {
          itemName: 'milk',
          quantity: 1,
          daysToUseUp: 7,
          price: 1,
        },
      ],
    },
    {
      tableName: 'dishes',
      items: [
        {
          itemName: 'forks',
          quantity: 4,
          daysToUseUp: null,
          price: null,
        },
        {
          itemName: 'plates',
          quantity: 7,
          daysToUseUp: null,
          price: null,
        },
        {
          itemName: 'knives',
          quantity: 7,
          daysToUseUp: null,
          price: null,
        },
        {
          itemName: 'spoons',
          quantity: 7,
          daysToUseUp: null,
          price: null,
        },
      ],
    },
  ],

  bar: [
    {
      tableName: 'wine',
      items: [
        {
          itemName: 'wine1',
          quantity: 1,
          daysToUseUp: 0,
          price: 1,
        },
        {
          itemName: 'wine2',
          quantity: 1,
          daysToUseUp: 0,
          price: 1,
        },
      ],
    },
  ],

  bed: [
    {
      tableName: 'bed covers',
      items: [
        {
          itemName: 'bed cover1',
          quantity: 1,
          daysToUseUp: 0,
          price: 1,
        },
        {
          itemName: 'bed cover2',
          quantity: 1,
          daysToUseUp: 0,
          price: 1,
        },
      ],
    },
  ],

  bathroom: [
    {
      tableName: 'toiletries',
      items: [
        {
          itemName: 'toiletry1',
          quantity: 1,
          daysToUseUp: 0,
          price: 1,
        },
        {
          itemName: 'toiletry2',
          quantity: 1,
          daysToUseUp: 0,
          price: 1,
        },
      ],
    },
  ],
}

const createTables = (populateEachTable) => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS ${tableNames.houseAreas} (
        name VARCHAR(255) NOT NULL PRIMARY KEY
      );`,
    `CREATE TABLE IF NOT EXISTS ${tableNames.inventoryTables} (
        name VARCHAR(255) NOT NULL PRIMARY KEY,
        houseAreaName VARCHAR(255) NOT NULL,
        FOREIGN KEY (houseAreaName) REFERENCES ${tableNames.houseAreas}(name)
      );`,
    `CREATE TABLE IF NOT EXISTS ${tableNames.items} (
        name VARCHAR(255) NOT NULL PRIMARY KEY,
        quantity INT,
        daysToUseUp INT,
        price FLOAT,
        tableName VARCHAR(255) NOT NULL,
        FOREIGN KEY (tableName) REFERENCES ${tableNames.inventoryTables}(name)
      );`,
  ]

  queries.forEach((query, index) => {
    db.query(query, (error, results, fields) => {
      if (error) {
        throw error
      }
      console.log(`Table created successfully: ${query}`)
    })

    db.query(`SELECT * FROM ${tableNames.houseAreas}`, (error, result) => {
      if (error) {
        throw error.message
      }
      if (result.length === 0) {
        populateEachTable(index)
      }
    })
  })
}

createTables((dbTableIndex) => {
  const doQuery = (query, message) => {
    db.query(query, (error, results, fields) => {
      if (error) {
        throw error
      }
      console.log(message)
    })
  }

  switch (dbTableIndex) {
    case 0:
      // House areas table
      Object.keys(initialHouseAreasAndTheirTables).forEach((areaName) =>
        doQuery(
          `INSERT INTO ${tableNames.houseAreas} (name) VALUES ('${areaName}')`,
          `House area '${areaName}' inserted successfully`
        )
      )
      break
    case 1:
      // Inventory tables table
      Object.entries(initialHouseAreasAndTheirTables).forEach(
        ([houseAreaName, tables]) => {
          tables.forEach((tableData) =>
            doQuery(
              `INSERT INTO ${tableNames.inventoryTables} (name, houseAreaName) VALUES ('${tableData.tableName}', '${houseAreaName}')`,
              `Inventory table '${tableData.tableName}' inserted successfully`
            )
          )
        }
      )
      break
    default:
      // Items table
      Object.values(initialHouseAreasAndTheirTables).forEach((tables) => {
        tables.forEach((tableData) => {
          tableData.items.forEach((item) =>
            doQuery(
              `INSERT INTO ${tableNames.items} (name, quantity, daysToUseUp, price, tableName) VALUES ('${item.itemName}', ${item.quantity}, ${item.daysToUseUp}, ${item.price}, '${tableData.tableName}')`,
              `Item '${item.itemName}' inserted successfully`
            )
          )
        })
      })
      break
  }
})
