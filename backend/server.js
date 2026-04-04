
// server.js (ESM)
import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

// Import ESM du router applicatif
import userRouter from './Presentation/Routes/user.routes.js'
import stockIngredientRouter from './Presentation/Routes/stockIngredient.route.js'
import ingredientRouter from './Presentation/Routes/ingredient.routes.js'
import recipeIngredientRouter from './Presentation/Routes/recipeIngredient.route.js'
import recipeRouter from './Presentation/Routes/recipe.routes.js'
import uploadRouter from './Presentation/Routes/upload.routes.js'
import authenticateJWT from './Token_Auth/authenticateJWT.js'
import authRoutes from './Presentation/Routes/auth.routes.js';
import SwaggerParser from '@apidevtools/swagger-parser'
import cookieParser from "cookie-parser"
import cors from "cors"

//middleware who manage JWT token
import './Token_Auth/passport.js';

const app = express()
const PORT = process.env.PORT ?? 3000


// Middlewares de base
app.use(express.json())
app.use(cookieParser())

//mettre ici ce que tu rentes dans la bar du navigateur
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}))

// Healthcheck simple
app.get('/', (_req, res) => res.send('API OK'))



//Login parts
app.use('/auth', authRoutes)

// Swagger uniquement sur /api-docs
const swaggerDocument = await SwaggerParser.bundle('./swagger/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middleware to serve static files from upload folder
app.use('/images', express.static('upload'));

// Toutes les routes applicatives
app.use('/api/users', authenticateJWT, userRouter)     
app.use('/api/ingredient', authenticateJWT, ingredientRouter)
app.use('/api/stockIngredient', authenticateJWT, stockIngredientRouter)
app.use('/api/recipeIngredient', authenticateJWT, recipeIngredientRouter)
app.use('/api/recipe', authenticateJWT, recipeRouter)
app.use('/api/upload', authenticateJWT, uploadRouter)

// 404 si aucune route ne matche (hors Swagger)
app.use((req, res, _next) => {
  if (req.path.startsWith('/api-docs')) return res.end() // laisse Swagger gérer
  res.status(404).json({ error: 'Not Found' })
})

// Handler d’erreurs (dernier middleware)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`)
  console.log(`Swagger UI    → http://localhost:${PORT}/api-docs`)
})
