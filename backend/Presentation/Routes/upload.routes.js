import express from 'express'
import uploadController from '../Controllers/upload.controller.js'
import uploadService from '../../Business/Services/upload.service.js'

const router = express.Router();

// Route pour uploader une image avec validation du type
router.post('/', 
        uploadService.uploadMiddleware.single('file'),
        uploadService.fileValidation,
        uploadController.uploadImage);

// Route pour supprimer une image (optionnel)
router.delete('/:filename', uploadController.deleteImage);

export default router;
