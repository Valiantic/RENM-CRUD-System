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


// ADMIN CRUD FUNCTIONALITY

// Endpoint to Create Product
app.post('/add-product', upload.single('image'), (req, res) => {
    const { product_name, price, description, category, sizes } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Parse the sizes from JSON string
    const parsedSizes = JSON.parse(sizes);  // 'sizes' will be a JSON string from the frontend

    const sql = 'INSERT INTO tbl_products (product_name, price, description, image_url, category, sizes) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [product_name, price, description, imageUrl, category, JSON.stringify(parsedSizes)], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ message: 'Error adding product' });
          }
          res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
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
    const { product_name, price, description, category } = req.body; // Destructure category from the body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // SQL QUERY TO UPDATE RECORD IN THE DATABASE
    let sql = `UPDATE tbl_products SET product_name = ?, price = ?, description = ?, category = ?`; // Add category here
    const params = [product_name, price, description, category]; // Add category to the params array

    // If a new image is uploaded, include it in the update
    if (req.file) {
        sql += `, image_url = ?`;
        params.push(`/uploads/${req.file.filename}`);
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

// Endpoint to Delete a Product by id
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;

    const sql = `DELETE FROM tbl_products WHERE id = ?`;
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting product" });
        }
        res.json({ message: "Product deleted successfully" });
    });
});



app.use('/uploads', express.static('uploads'));


app.listen(3001, () => console.log('Server running on port 3001'));
