function ProdForm({ name, handleName, price, handlePrice, qt, handleQt, addProd }) {
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

export default ProdForm

