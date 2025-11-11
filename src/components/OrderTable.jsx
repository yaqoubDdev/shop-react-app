function OrderTable({ products, date, label }) {
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

export default OrderTable

