const express = require('express')
const cors = require('cors') // Verificar como o front interage sem o cors

const app = express()

// Config JSON Response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })) //Permite que o back e o front se mantenham no mesmo endereço

// Public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000!')
})