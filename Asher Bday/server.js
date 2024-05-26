const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asher_birthday';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

// Photo schema and model
const photoSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalname: String,
    mimetype: String,
    size: Number
});

const Photo = mongoose.model('Photo', photoSchema);

// Comment schema and model
const commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Routes
app.post('/upload', upload.single('photo'), async (req, res) => {
    const photo = new Photo({
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
    });

    await photo.save();
    res.json(photo);
});

app.get('/photos', async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
});

// Route to handle comment submissions
app.post('/comments', async (req, res) => {
    const { text } = req.body;
    const comment = new Comment({ text });

    await comment.save();
    res.json(comment);
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
