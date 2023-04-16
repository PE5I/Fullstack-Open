require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

app.use(express.json())

app.get('/api/notes', async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll()
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
  try {
    console.log(req.body)
    const note = await Note.create(req.body)
    return res.json(note)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
//     console.log(notes);
//     sequelize.close()
//   } catch (error) {
//     console.log('Unable to connect to the database:', error)
//   }
// }
// main()