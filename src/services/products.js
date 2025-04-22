import axios from "axios";
const baseUrl = 'http://localhost:2000/products'

const getAll = () => {
  const res = axios.get(baseUrl)
  return res.then(res => res.data)
}

const create = (newObject) => {
  const res = axios.post(baseUrl, newObject)
  return res.then(res => res.data)
}

export default {getAll, create}