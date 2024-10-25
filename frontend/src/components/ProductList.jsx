import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/admin.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend
        axios.get('http://localhost:3001/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
