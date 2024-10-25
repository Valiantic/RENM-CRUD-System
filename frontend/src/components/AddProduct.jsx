import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/admin.css'

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('price', price);
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:3001/add-product', formData);
            setShowModal(true);  // Show modal on success
            // Reset form
            setProductName('');
            setPrice('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                <button type="submit">Add Product</button>
            </form>

            {showModal && (
                <div className="modal">
                    <p>Product added successfully!</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
