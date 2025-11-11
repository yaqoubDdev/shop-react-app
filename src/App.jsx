import { useState, useEffect } from 'react'
import './App.css'
import prodService from './services/products'

function ProdForm(props) {

  const {
    name, handleName,
    price, handlePrice,
    qt, handleQt,
    addProd
  } = props


  return (
    <form onSubmit={addProd} className="form-feild">
      <label id="name">Name: </label>
      <input value={name} type="text" onChange={handleName} id="name-input" />
      <label id="price">Price: </label>
      <input value={price} type="number" onChange={handlePrice} id="price-input" />
      <label id="qt">Quantity: </label>
      <input value={qt} type="number" onChange={handleQt} id="qt-input" />


      <button type="submit" id="sub"> submit </button>
    </form>
  )
}

function Table({ products, clear, add, label, handleLabel }) {

  if (products.length == 0) {
    return (
      <div className="no-data-container">
        <h4 className="no-data-message">No data</h4>
      </div>
    )
  }

  let total = 0
  if (products.length >= 1) {
    const ss = products.map(({ price, qt }) => price * qt)
    total = ss.reduce((acc, e) => acc + e)
  }


  return (
    <>
      <table className="table-active">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th align="right">Price</th>
            <th align="right">Qt</th>
            <th align="right">Total</th>
          </tr>
        </thead>

        <tbody>
          {products.map(({ name, price, qt }, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td align="right">{price.toLocaleString()}</td>
              <td align="right">{qt.toLocaleString()}</td>
              <td align="right">{(price * qt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={4} align='center' >Total</td>
            <td align="right">NLe {total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
      <div className='controls-table'>
        <div className='label-input-container'>
          <label htmlFor="table-label">Table Label: </label>
          <input 
            type="text" 
            id="table-label" 
            value={label} 
            onChange={handleLabel}
            placeholder="Enter table name (optional)"
          />
        </div>
        <div className='table-buttons'>
          <button onClick={clear}>clear</button>
          <button onClick={add}>submit</button>
        </div>
      </div>
    </>
  )
}

function ProdTable({products, date, label}){

  let total = 0
  if (products.length >= 1) {
    const ss = products.map(({ price, qt }) => price * qt)
    total = ss.reduce((acc, e) => acc + e)
  }

  // Display label if provided, otherwise show date
  const displayTitle = label && label.trim() !== '' ? label : date

  return (
    <>
      <table className="table-active">
        <thead>
          <tr>
            <th colSpan={5} align='center'>{displayTitle}</th>
          </tr>
          {label && label.trim() !== '' && (
            <tr>
              <th colSpan={5} align='center' style={{fontSize: '0.85em', fontWeight: 'normal', fontStyle: 'italic'}}>
                {date}
              </th>
            </tr>
          )}
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th align="right">Price</th>
            <th align="right">Qt</th>
            <th align="right">Total</th>
          </tr>
        </thead>

        <tbody>
          {products.map(({ name, price, qt }, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td align="right">{price.toLocaleString()}</td>
              <td align="right">{qt.toLocaleString()}</td>
              <td align="right">{(price * qt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={4} align='center' >Total</td>
            <td align="right">NLe {total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

function AllProdTable({ allProducts}) {

  if (allProducts.length == 0) {
    return (
      <div className="no-data-container">
        <h4 className="no-data-message">No data</h4>
      </div>
    )
  }
  
  // Reverse array to show recent orders first (newest to oldest)
  const reversedProducts = [...allProducts].reverse()
  
  return(
    <>
      {reversedProducts.map(({data, date, id, label}) => (
        <ProdTable products={data} key={id} date={date} label={label} />
      ))}
    </>
  )
  
}

function App() {
  const [allProd, setAllProd] = useState([])
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [qt, setQt] = useState("")
  const [tableLabel, setTableLabel] = useState("")

  useEffect(() => {
    prodService.getAll()
      .then(data => {
        setAllProd(data)
        // console.log(data);
        
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
  function clearProd(){
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

  function addToAllProd(){
    if (products.length === 0) {
      alert("Add products first")
      return
    }
    
    const date = new Date()
    const p = {
      date: String(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} -- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`),
      label: tableLabel.trim(),
      data: products
    }
    
    prodService.create(p)
      .then(data => {
        setAllProd(ap => [...ap, data])
        setProducts([])
        setTableLabel("")
      })
      .catch(error => {
        console.error("Error saving products:", error)
        alert("Error saving products. Please try again.")
      })
  }



  return (
    <>
      <ProdForm

        name={name} handleName={handleName}
        price={price} handlePrice={handlePrice}
        qt={qt} handleQt={handleQt}
        addProd={handleSubmit}

      />

      <Table 
        products={products} 
        clear={clearProd} 
        add={addToAllProd}
        label={tableLabel}
        handleLabel={handleTableLabel}
      />

      <AllProdTable allProducts={allProd} />
    </>
  )
}
export default App


