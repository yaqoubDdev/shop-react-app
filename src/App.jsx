import { useState } from 'react'
import './App.css'

function ProdForm(props){

  const {
    name, handleName,
    price, handlePrice,
    qt, handleQt,
    addProd
  } = props

  
  return(
    <form onSubmit={addProd} className="form-feild">
      <label id="name">Name: </label>
      <input value={name} type="text" onChange={handleName} id="name-input"/>
      <label id="price">Price: </label>   
      <input value={price} type="number" onChange={handlePrice} id="price-input"/>
      <label id="qt">Quantity: </label>
      <input value={qt} type="number" onChange={handleQt} id="qt-input"/>
 
      
      <button type="submit" id="sub"> submit </button>
    </form>
  )
}

function Debug({name, price, qt}){
  
  return(
    <>   
      <p>name: {name} </p>
      <p>price: {price} </p>
      <p>qt: {qt} </p>
    </>
  )
}


function Table({products}){

  if (products.length == 0){
    return(
      <h4>No data</h4>
    )
  }
  
  let total = 0
  if (products.length >= 1){
    const ss = products.map(({name, price, qt}) => price*qt)
    total = ss.reduce((acc, e) => acc + e)
  }


  return(
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
        {products.map(({name, price, qt}, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{name}</td>
            <td align="right">{price.toLocaleString()}</td>
            <td align="right">{qt.toLocaleString()}</td>
            <td align="right">{(price * qt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colspan={4}>Total</td>
          <td align="right">{total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
  )
}

function App(){
  
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [qt, setQt] = useState("")

  function handleName(e){
    setName(e.target.value)
  }
  function handlePrice(e){
    setPrice(e.target.value)
  }
  function handleQt(e){
    setQt(e.target.value)
  }
  
  function handleSubmit(event){
    event.preventDefault()
    
    setProducts(p => [...p, {name, price: Number(price), qt: Number(qt)}])
    setName("")
    setPrice("")
    setQt("")
  }



  return(
    <>
      <ProdForm 

        name={name}  handleName={handleName}
        price={price} handlePrice={handlePrice}
        qt={qt} handleQt={handleQt}
        addProd={handleSubmit}
      
      />
      
      <Table products={products} />
    </>
  )
}
export default App
