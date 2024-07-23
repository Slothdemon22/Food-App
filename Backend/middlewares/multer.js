import multer from 'multer';

// Configure Multer to use disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public'); // Destination folder on your server
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original filename
    }
});

const upload = multer({ storage });

export default upload;
