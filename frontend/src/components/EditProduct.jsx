import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/editModal.css';

const EditProduct = ({ product, onClose, onProductUpdated }) => {
    // State variables to track product details
    const [productName, setProductName] = useState(product.product_name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(product.category); // Track the selected category

    // For Select / Dropdown
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setCategory(value);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category); // Send the category in the form data
        if (image) formData.append('image', image);

        try {
            await axios.put(`http://localhost:3001/products/${product.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onProductUpdated(); // Refresh product list in ProductList
            onClose(); // Close modal
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content-edit">
                <h2>Edit Product</h2>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name"
                        required
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    ></textarea>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {/* Select input for category */}
                    <select
                        name="category"
                        value={category} 
                        onChange={handleChange} 
                        className="w-full mb-4 p-2 border rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Chiffon Base">Chiffon Base</option>
                        <option value="Choco Moist">Choco Moist</option>
                    </select>

                    <button type="submit">Update Product</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
