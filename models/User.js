const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Cria o campo de createdAt e UpdatedAt
  }
  )
)

module.exports = User