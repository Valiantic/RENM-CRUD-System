import React from 'react';
import '../assets/css/admin.css';
import EditProduct from './EditProduct';
import { useState } from 'react';

// Added Props for instant add refresh on app 
const ProductList = ({ products, onProductUpdated }) => {

    const [selectedProduct, setSelectedProduct] = useState(null);


    const handleEditClick = (product) => {
        setSelectedProduct(product); // Set the selected product for editing
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
                        <button onClick={() => handleEditClick(product)}>Edit</button>

                    </div>
                ))}
            </div>


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
