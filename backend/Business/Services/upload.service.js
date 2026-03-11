import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'
import { fileTypeFromBuffer } from 'file-type'

// Types MIME autorisés (images uniquement)
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
];

// Configuration du stockage Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, name + '-' + uniqueSuffix + ext);
    },
});

// Filtre pour valider le type de fichier (RAPIDE - rejette les types évidents)
const fileFilter = (req, file, cb) => {
    // Validation basique sur le MIME type déclaré
    // On rejette juste silencieusement, fileValidation fera la vraie vérification
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(null, false); // Rejetter sans erreur Multer
    }
    cb(null, true);
};

// Instance Multer configurée
export const uploadMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB
    }
});

// Middleware de validation asynchrone du type de fichier
export const fileValidation = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier fourni ou type de fichier non autorisé' });
        }

        // Lire le fichier et vérifier son type réel
        const buffer = await fs.readFile(req.file.path);
        const type = await fileTypeFromBuffer(buffer);

        // Vérifier que le type est valide
        if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
            // Supprimer le fichier invalide
            await fs.unlink(req.file.path).catch(() => {});
            return res.status(400).json({ error: `Type de fichier invalide. Types acceptés: ${ALLOWED_MIME_TYPES.join(', ')}` });
        }

        return next();
    } catch (error) {
        // Supprimer le fichier en cas d'erreur
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        return res.status(500).json({ error: `Erreur lors de la vérification du fichier: ${error.message}` });
    }
};

// Service pour gérer l'upload
export async function uploadImage(file) {
    if (!file) {
        throw new Error('Aucun fichier fourni');
    }

    return {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype
    };
}

// Service pour supprimer une image
export async function deleteImage(filename) {
    try {
        const filepath = path.join('upload', filename);
        await fs.unlink(filepath);
        return { message: 'Image supprimée avec succès' };
    } catch (error) {
        throw new Error(`Impossible de supprimer l'image: ${error.message}`);
    }
}

export default {
    uploadMiddleware,
    fileValidation,
    uploadImage,
    deleteImage
};
