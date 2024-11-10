import React, { useState, useEffect } from 'react';
import EditProduct from './EditProduct';
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductList = ({ products, onProductUpdated }) => {

    // State to hold the selected product for editing
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productList, setProductList] = useState(products);

    useEffect(() => {
        setProductList(products); // Ensure productList is up-to-date with props
    }, [products]);

    // Handle click on edit button
    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };

    // Open the delete confirmation modal
    const openDeleteConfirmation = (productId) => {
        setProductToDelete(productId);
    };

    // Send request to delete the product
    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/products/${productToDelete}`);
            onProductUpdated();
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Cancel the delete operation
    const cancelDelete = () => {
        setProductToDelete(null);
    };

    // Parse the sizes string into an array
    const getSizes = (sizes) => {
        if (!sizes) return [];
        if (Array.isArray(sizes)) return sizes;
        try {
            const parsedSizes = JSON.parse(sizes);
            return Array.isArray(parsedSizes) ? parsedSizes : [];
        } catch {
            return [];
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 md:p-3 text-left border-b">Image</th>
                            <th className="p-2 md:p-3 text-left border-b">Product Name</th>
                            <th className="p-2 md:p-3 text-left border-b">Category</th>
                            <th className="p-2 md:p-3 text-left border-b">Description</th>
                            <th className="p-2 md:p-3 text-left border-b">Available Sizes</th>
                            <th className="p-2 md:p-3 text-left border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => {
                            const sizes = getSizes(product.sizes);
                            return (
                                <tr key={product.id} className="border-b hover:bg-gray-100">
                                    <td className="p-2 md:p-3 flex justify-center">
                                        {/* FETCH PRODUCT IMAGES FROM THE SERVER  */}
                                        <img
                                            src={`http://localhost:3001${product.image_url}`}
                                            alt={product.product_name}
                                            className="rounded-full"
                                            style={{ width: '55px', height: '55px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td className="p-2 md:p-3 text-gray-700">{product.product_name}</td>
                                    <td className="p-2 md:p-3 text-gray-600">{product.category}</td>
                                    <td className="p-2 md:p-3 text-gray-600 truncate max-w-xs">{product.description}</td>
                                    <td className="p-2 md:p-3">
                                        {sizes.length > 0 ? (
                                            <ul className="list-disc ml-4">
                                                {sizes.map((size, index) => (
                                                    <li key={index} className="text-gray-500">{size}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            // Display N/A if no sizes are available
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </td>
                                    <td className="p-2 md:p-3 flex flex-col gap-2 md:flex-row">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteConfirmation(product.id)}
                                            className="bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


            {/* MODALS FOR EDIT AND DELETE OPERATIONS */}

            {selectedProduct && (
                <EditProduct
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onProductUpdated={onProductUpdated}
                />
            )}

            {productToDelete && (
                <DeleteConfirmationModal
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export default ProductList;
