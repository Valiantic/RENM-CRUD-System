import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProduct from './components/AddProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Admin Dashboard</h1>
      <AddProduct/>
    </>
  )
}

export default App
