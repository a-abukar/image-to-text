const express = require('express');
const multer = require('multer');
const cors = require('cors');
const tesseract = require('node-tesseract-ocr');

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tesseractConfig = {
    lang: 'eng',
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const text = await tesseract.recognize(req.file.buffer, tesseractConfig);
        res.json({ text: text });
        
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image.');
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
