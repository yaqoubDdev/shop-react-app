import { useState, useEffect } from 'react'
import './App.css'
import prodService from './services/products'
import ProdForm from './components/ProdForm'
import ProductTable from './components/ProductTable'
import OrderHistory from './components/OrderHistory'
import { formatDate } from './utils/dateFormatter'

function App() {
  const [allProd, setAllProd] = useState([])
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [qt, setQt] = useState("")
  const [tableLabel, setTableLabel] = useState("")
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    prodService.getAll()
      .then(data => {
        setAllProd(data)
      })
  }, [])

  function handleName(e) {
    setName(e.target.value)
  }

  function handlePrice(e) {
    setPrice(e.target.value)
  }

  function handleQt(e) {
    setQt(e.target.value)
  }

  function handleTableLabel(e) {
    setTableLabel(e.target.value)
  }

  function clearProd() {
    setProducts([])
    setTableLabel("")
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!name || !price || !qt) {
      alert("fill form first")
      return
    }

    setProducts(p => [...p, { name, price: Number(price), qt: Number(qt) }])
    setName("")
    setPrice("")
    setQt("")
  }

  function addToAllProd() {
    if (products.length === 0) {
      alert("Add products first")
      return
    }
    
    const p = {
      date: formatDate(),
      label: tableLabel.trim(),
      data: products
    }
    
    prodService.create(p)
      .then(data => {
        setAllProd(ap => [...ap, data])
        setProducts([])
        setTableLabel("")
        // Switch to history view on mobile after successful save
        if (window.innerWidth <= 768) {
          setShowHistory(true)
        }
      })
      .catch(error => {
        console.error("Error saving products:", error)
        alert("Error saving products. Please try again.")
      })
  }

  return (
    <div className="app-container">
      <button 
        className="view-toggle-btn" 
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? '← Add Products' : 'View History →'}
      </button>

      <div className={`form-section ${showHistory ? 'hidden-mobile' : ''}`}>
        <ProdForm
          name={name}
          handleName={handleName}
          price={price}
          handlePrice={handlePrice}
          qt={qt}
          handleQt={handleQt}
          addProd={handleSubmit}
        />

        <ProductTable 
          products={products} 
          clear={clearProd} 
          add={addToAllProd}
          label={tableLabel}
          handleLabel={handleTableLabel}
        />
      </div>

      <div className={`history-section ${showHistory ? '' : 'hidden-mobile'}`}>
        <OrderHistory allProducts={allProd} />
      </div>
    </div>
  )
}

export default App
