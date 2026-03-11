
// server.js (ESM)
import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json' with { type: 'json' }

// Import ESM du router applicatif
import userRouter from './Presentation/Routes/user.routes.js'
import stockIngredientRouter from './Presentation/Routes/stockIngredient.route.js'
import ingredientRouter from './Presentation/Routes/ingredient.routes.js'
import recipeIngredientRouter from './Presentation/Routes/recipeIngredient.route.js'
import recipeRouter from './Presentation/Routes/recipe.routes.js'
import uploadRouter from './Presentation/Routes/upload.routes.js'

const app = express()
const PORT = process.env.PORT ?? 3000

// Middlewares de base
app.use(express.json())

// Healthcheck simple
app.get('/', (_req, res) => res.send('API OK'))

// Swagger uniquement sur /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



// Middleware to serve static files (optional)
app.use(express.static('public'));
app.use('/images', express.static('upload'));

// Toutes les routes applicatives
app.use('/', userRouter)     
app.use('/', ingredientRouter)
app.use('/', stockIngredientRouter)
app.use('/', recipeIngredientRouter)
app.use('/', recipeRouter)
app.use('/', uploadRouter)

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
