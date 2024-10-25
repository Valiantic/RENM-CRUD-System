const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

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

// Endpoint to Read Products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM tbl_products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to Update Product by id
app.put('/products/:id', upload.single('image'), (req, res) => {
    const productId = req.params.id;
    const { product_name, price, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // SQL QUERY TO UPDATE RECORD ON A DATABASE 
    let sql = `UPDATE tbl_products SET product_name = ?, price = ?, description = ?`;
    const params = [product_name, price, description];

    // If a new image is uploaded, include it in the update
    if (req.file) {
        sql += `, image_url = ?`;
        params.push(`/uploads/${req.file.filename}`);
    }


    // Only update image URL if a new file was uploaded
    if (imageUrl) {
        sql += `, image_url = ?`;
        params.push(imageUrl);
    }

    sql += ` WHERE id = ?`;
    params.push(productId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating product" });
        }
        res.json({ message: "Product updated successfully" });
    });
});



app.use('/uploads', express.static('uploads'));


app.listen(3001, () => console.log('Server running on port 3001'));
