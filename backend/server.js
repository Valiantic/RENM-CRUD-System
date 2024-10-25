const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ibbakes'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Endpoint to Add Product
app.post('/add-product', upload.single('image'), (req, res) => {
    const { product_name, price, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = 'INSERT INTO tbl_products (product_name, price, description, image_url) VALUES (?, ?, ?, ?)';
    db.query(sql, [product_name, price, description, imageUrl], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product added successfully!' });
    });
});

app.use('/uploads', express.static('uploads'));


app.listen(3001, () => console.log('Server running on port 3001'));
