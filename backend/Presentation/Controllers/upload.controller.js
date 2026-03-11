import uploadService from '../../Business/Services/upload.service.js'

export async function uploadImage(req, res) {    
    try {
        const result = await uploadService.uploadImage(req.file);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteImage(req, res) {
    try {
        const { filename } = req.params;
        const result = await uploadService.deleteImage(filename);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    uploadImage,
    deleteImage
};
