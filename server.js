const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for CORS and static file serving
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Use the original name of the file for storage
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint for file upload
app.post('/upload', upload.single('data'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send('Keine Datei hochgeladen.');
  }
  // Respond with success message if file is uploaded
  res.send('Daten erfolgreich hochgeladen!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});