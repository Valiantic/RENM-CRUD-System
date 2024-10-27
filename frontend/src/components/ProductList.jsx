import React from 'react';
import '../assets/css/admin.css';
import EditProduct from './EditProduct';
import { useState } from 'react';
import axios from 'axios';

// Added Props for instant add refresh on app 
const ProductList = ({ products, onProductUpdated }) => {

    const [selectedProduct, setSelectedProduct] = useState(null);

    // Function to handle the Edit button click 
    const handleEditClick = (product) => {
        setSelectedProduct(product); // Set the selected product for editing
    };

    // Function to handle the Delete button click
    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/products/${productId}`);
            onProductUpdated(); // Refresh the product list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div>
            <h2>Product List</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={`http://localhost:3001${product.image_url}`} alt={product.product_name} />
                        <h3>{product.product_name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>

                        {/* BUTTONS FOR EDIT AND DELETE */}
                        <button onClick={() => handleEditClick(product)}>Edit</button>
                        <button onClick={() => handleDeleteClick(product.id)}>Delete</button>

                    </div>
                ))}
            </div>


            {/* EDIT PRODUCT MODAL */}
            {selectedProduct && (
                <EditProduct
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onProductUpdated={onProductUpdated}
                />
            )}
            
        </div>
    );
};

export default ProductList;
