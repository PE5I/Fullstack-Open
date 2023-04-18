require('dotenv').config()
const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to DB')
  } catch (err) {
    console.log('failed to connect to DB')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }