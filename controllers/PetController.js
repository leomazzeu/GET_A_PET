const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class PetController {

  // create a pet
  static async create(req, res) {
    
    const { name, age, weight, color } = req.body
    const images = req.files

    const available = true

    //images upload

    //validation
    if(!name) {
      res.status(422).json({message: "O nome é obrigatório!"})
      return
    }

    if(!age) {
      res.status(422).json({message: "A idade do pet é obrigatória!"})
      return
    }

    if(!weight) {
      res.status(422).json({message: "O peso do pet é obrigatório!"})
      return
    }

    if(!color) {
      res.status(422).json({message: "A cor do pet é obrigatória!"})
      return
    }

    if(images.length === 0) {
      res.status(422).json({message: "A imagem do pet é obrigatória!"})
      return
    }

    //get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)

    //create a pet
    const pet = new Pet({name, age, weight, color, available, images: [], 
    user: {
      _id: user._id,
      name: user.name,
      image: user.image,
      phone: user.phone
    }})

    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      
      const newPet = await pet.save()
      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet
      })

    } catch (error) {
      res.status(500).json({message: error})
    }
  }

  // get all pets
  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt') // Pega do mais novo para o mais velho

    res.status(200).json({ pets })
  }

  // get all user pets
  static async getAllUserPets(req, res) {
    
    //get user from token
    const token = await getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

    if(pets.length < 1) {
      return res.status(422).json({ message: "Nenhum Pet cadastrado!" })
    }

    res.status(200).json({ pets })
  }
}