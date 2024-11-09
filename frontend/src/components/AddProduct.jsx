import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/admin.css';

// Props pass here for Instant refresh rate
const AddProduct = ({ onProductAdded }) => {

  // Data to be sent to the server
  const [product, setProduct] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    image: null, 
    category: '',
    sizes: [],
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle checkbox changes for sizes
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setProduct((prev) => {
      const sizes = checked
        ? [...prev.sizes, value]  // Add size if checked
        : prev.sizes.filter((size) => size !== value);  // Remove size if unchecked
      return { ...prev, sizes };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('category', product.category);  // Append the category to form data
    formData.append('sizes', JSON.stringify(product.sizes));  // Append selected sizes

    try {
        // Send a POST request to the server
      await axios.post('http://localhost:3001/add-product', formData);
      setShowModal(true);  // Show modal on success
      setProduct({
        name: '',
        price: '',
        description: '',
        image: null,
        category: '',
        sizes: [],
        
      });

      onProductAdded();  // Fetch products Instant Refresh Rate
      
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

      {/* Checkbox for Size Selection */}
      <div className="select">
        <h3 className="text-lg font-semibold mb-2">Select Size & Price</h3>
        <label className="block">
          <input
            type="checkbox"
            value="4 x 4 - ₱240"
            checked={product.sizes.includes('4 x 4 - ₱240')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          4 x 4 - ₱240
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="7 x 3 - ₱550"
            checked={product.sizes.includes('7 x 3 - ₱550')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          7" x 3" - ₱550
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="7 x 5 - ₱849"
            checked={product.sizes.includes('7 x 5 - ₱849')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          7" x 5" - ₱849
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="7 x 7 - ₱1,299"
            checked={product.sizes.includes('7 x 7 - ₱1,299')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          7" x 7" - ₱1,299
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="8 x 2.5 - ₱399"
            checked={product.sizes.includes('8 x 2.5 - ₱399')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          8" x 2.5" - ₱399
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="8 x 2.5 - ₱410"
            checked={product.sizes.includes('8 x 2.5 - ₱410')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          8 x 2.5 - ₱410
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="8 x 2.5 - ₱650"
            checked={product.sizes.includes('8 x 2.5 - ₱650')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          8" x 2.5" - ₱650
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="12 x 2.5 - ₱799"
            checked={product.sizes.includes('12 x 2.5 - ₱799')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          12" x 2.5" - ₱799
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="12 x 2.5 - ₱805"
            checked={product.sizes.includes('12 x 2.5 - ₱805')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          12" x 2.5" - ₱805
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="12 x 2.5 - ₱1,100"
            checked={product.sizes.includes('12 x 2.5 - ₱1,100')}
            onChange={handleSizeChange}
            className="mr-2"
          />
          12" x 2.5" - ₱1,100
        </label>
      </div>

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
