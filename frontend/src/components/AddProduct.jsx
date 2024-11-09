// AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/admin.css';

const AddProduct = () => {

  // Data to be sent to the server
  const [product, setProduct] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    image: null, 
    category: ''  // Add category to state
  });

  // modal state
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct(prev => ({ ...prev, image: e.target.files[0] }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('category', product.category);  // Append the category to form data

    try {
        // Send a POST request to the server
      await axios.post('http://localhost:3001/add-product', formData);
      setShowModal(true);  // Show modal on success
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      <input 
        type="text" 
        name="name" 
        placeholder="Product Name" 
        value={product.name} 
        onChange={handleChange} 
        className="w-full mb-4 p-2 border rounded" 
      />
      
      <input 
        type="number" 
        name="price" 
        placeholder="Price" 
        value={product.price} 
        onChange={handleChange} 
        className="w-full mb-4 p-2 border rounded" 
      />
      
      <textarea 
        name="description" 
        placeholder="Description" 
        value={product.description} 
        onChange={handleChange} 
        className="w-full mb-4 p-2 border rounded" 
      />
      
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="w-full mb-4 p-2 border rounded" 
      />
      
      {/* Select input for category */}
      <select 
        name="category" 
        value={product.category} 
        onChange={handleChange} 
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Select Category</option>
        <option value="Chiffon Base">Chiffon Base</option>
        <option value="Choco Moist">Choco Moist</option>
      </select>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Add Product
      </button>

            {/* Modal to show success message */}
            {showModal && (
                <div className="modal">
                    <p>Product added successfully!</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
    </form>
  );
};

export default AddProduct;
