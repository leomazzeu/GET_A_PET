const Pet = require('../models/Pet')

module.exports = class PetController {

  static async register(req, res) {
    res.json('Hello Pet!')
  }
}