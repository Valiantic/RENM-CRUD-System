import React, { useState } from 'react';
import EditProduct from './EditProduct';
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductList = ({ products, onProductUpdated }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null); // Track product to delete

    // Function to handle the Edit button click 
    const handleEditClick = (product) => {
        setSelectedProduct(product); // Set the selected product for editing
    };

    // Function to open the delete confirmation modal
    const openDeleteConfirmation = (productId) => {
        setProductToDelete(productId); // Set product to delete for confirmation
    };

    // Function to handle confirmed deletion
    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/products/${productToDelete}`);
            onProductUpdated(); // Refresh the product list after deletion
            setProductToDelete(null); // Close the confirmation modal
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Function to cancel the deletion
    const cancelDelete = () => {
        setProductToDelete(null); // Close the modal without deleting
    };

    // Function to safely get the sizes data
    const getSizes = (sizes) => {
        if (Array.isArray(sizes)) {
            return sizes;
        }
        // If it's not an array, try parsing it as a JSON string or fallback to empty array
        try {
            return JSON.parse(sizes);
        } catch {
            return [];
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
                        {/* <p>Price: ${product.price}</p> */}
                        <p>Category: {product.category}</p>
                        <p>{product.description}</p>

                        {/* Display the sizes as a list */}
                        {product.sizes && getSizes(product.sizes).length > 0 && (
                            <div>
                                <h4>Available Sizes:</h4>
                                <ul>
                                    {getSizes(product.sizes).map((size, index) => (
                                        <li key={index}>{size}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* BUTTONS FOR EDIT AND DELETE */}
                        <button onClick={() => handleEditClick(product)}>Edit</button>
                        <button onClick={() => openDeleteConfirmation(product.id)}>Delete</button>

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

            {/* DELETE CONFIRMATION MODAL */}
            {productToDelete && (
                <DeleteConfirmationModal
                    onConfirm={confirmDelete} // Delete action on confirmation
                    onCancel={cancelDelete} // Cancel action
                />
            )}
        </div>
    );
};

export default ProductList;
