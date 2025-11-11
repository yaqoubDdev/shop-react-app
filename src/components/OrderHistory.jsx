import NoData from './NoData'
import OrderTable from './OrderTable'

function OrderHistory({ allProducts }) {
  if (allProducts.length === 0) {
    return <NoData />
  }
  
  // Reverse array to show recent orders first (newest to oldest)
  const reversedProducts = [...allProducts].reverse()
  
  return (
    <>
      {reversedProducts.map(({data, date, id, label}) => (
        <OrderTable products={data} key={id} date={date} label={label} />
      ))}
    </>
  )
}

export default OrderHistory

