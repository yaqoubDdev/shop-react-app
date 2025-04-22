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

function Debug({ name, price, qt }) {

  return (
    <>
      <p>name: {name} </p>
      <p>price: {price} </p>
      <p>qt: {qt} </p>
    </>
  )
}


function Table({ products, clear, add }) {

  if (products.length == 0) {
    return (
      <h4>No data</h4>
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
        <button onClick={clear}>clear</button>
        <button onClick={add}>submit</button>
      </div>
    </>
  )
}

function ProdTable({products, date}){

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
            <th colSpan={5} align='center'>{date}</th>
          </tr>
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
      <h4>No data</h4>
    )
  }
  
  return(
    <>
      {allProducts.map(({data, date, id}) => (
        <ProdTable products={data} key={id} date={date} />
      ))}
    </>
  )
  
}

function App() {
  const [allProd, setAllProd] = useState([])
  const [products, setProducts] = useState([
    {
      name: "fui",
      price: 20,
      qt: 20
    },
    {
      name: "ioef ",
      price: 760,
      qt: 10
    },
    {
      name: "ewweiiweiri salt",
      price: 110,
      qt: 20
    }
  ])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [qt, setQt] = useState("")

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
  function clearProd(){
    setProducts([])
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
    console.log(Array(products));
    const date = new Date()
    const p = {
      date: String(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} -- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`),
      data: products
    }
    
    prodService.create(p)
      .then(data => {
        console.log(data);
        
        setAllProd(ap => [...ap, data])
        // setProducts([])
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

      <Table products={products} clear={clearProd} add={addToAllProd} />

      <AllProdTable allProducts={allProd} />
    </>
  )
}
export default App


