import NoData from './NoData'

function ProductTable({ products, clear, add, label, handleLabel }) {
  if (products.length === 0) {
    return <NoData />
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

export default ProductTable

