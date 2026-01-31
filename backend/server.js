
// server.js (ESM)
import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json' with { type: 'json' }
import multer from 'multer'
import path from 'path'

// Import ESM du router applicatif
import userRouter from './Presentation/Routes/user.routes.js'
import ingredientRouter from './Presentation/Routes/ingredient.routes.js'
import recipeRouter from './Presentation/Routes/recipe.routes.js'

const app = express()
const PORT = process.env.PORT ?? 3000

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    log(file)
    cb(null, 'upload/'); // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req);
  
  if (!req.file) {
    return res.status(400).send('No file uploaded!');
  }
  res.send({
    filename: req.file.filename,
  });
});

// Middlewares de base
app.use(express.json())

// Healthcheck simple
app.get('/', (_req, res) => res.send('API OK'))

// Swagger uniquement sur /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



// Middleware to serve static files (optional)
app.use(express.static('public'));



// Toutes les autres routes applicatives
app.use('/', userRouter)     
app.use('/', ingredientRouter)
app.use('/', recipeRouter)    

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
