import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/editModal.css';

const EditProduct = ({ product, onClose, onProductUpdated }) => {

    // State to hold the updated product data
    const [productName, setProductName] = useState(product.product_name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState(product.sizes ? JSON.parse(product.sizes) : []);
    const [category, setCategory] = useState(product.category || "");

    // Handle changes for the category dropdown
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setCategory(value);
        }
    };

    // Handle changes for the sizes checkboxes
    const handleSizeChange = (e) => {
        const value = e.target.value;
        setSelectedSizes((prevSizes) => {
            const updatedSizes = Array.isArray(prevSizes) ? prevSizes : [];
            return updatedSizes.includes(value)
                ? updatedSizes.filter((size) => size !== value)
                : [...updatedSizes, value];
        });
    };


    // Send request to update the product in the backend 
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('sizes', JSON.stringify(selectedSizes || []));
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            await axios.put(`http://localhost:3001/products/${product.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onProductUpdated();
            onClose();
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

                    {/* CATEGORY DROPDOWN */}
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

                    {/* SIZES AND PRIZE CHECKBOXES */}
                    <div className="size_prize">
                        <h3 className="text-lg font-semibold mb-2">Select Size & Price</h3>
                        {['4 x 4 - ₱240', '7 x 3 - ₱550', '7 x 5 - ₱849', '7 x 7 - ₱1,299', '8 x 2.5 - ₱399', '8 x 2.5 - ₱410', '8 x 2.5 - ₱650', '12 x 2.5 - ₱799', '12 x 2.5 - ₱805', '12 x 2.5 - ₱1,100'].map(size => (
                            <label className="block" key={size}>
                                <input
                                    type="checkbox"
                                    value={size}
                                    checked={selectedSizes.includes(size)}
                                    onChange={handleSizeChange}
                                    className="mr-2"
                                />
                                {size}
                            </label>
                        ))}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Update Product</button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
