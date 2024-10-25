import { useState, useEffect} from 'react'
import axios from 'axios';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3001/products');
        console.log("Fetched products:", response.data); // Add this line

        setProducts(response.data);
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Fetch products once when the component mounts
useEffect(() => {
    fetchProducts();
}, []);



  return (
    <>
      <h1>Admin Dashboard</h1>
      {/* Props passes on AddProduct */}
      <AddProduct onProductAdded={fetchProducts} />
      {/* Props passes on ProductList */}
      <ProductList products={products} />
    </>
  )
}

export default App
