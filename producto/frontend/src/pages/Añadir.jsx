import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Swal from 'sweetalert2'


export default function Añadir() {

  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    precio1: "",
    precio2: "",
    total: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setProducto(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8800/subir", producto);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='form text-center container my-5 p-5 border'>
      <h1>Añadir un nuevo producto</h1>
      <form onSubmit={handleClick} className='form-group'>
        <input type="text" className='form-control my-4' placeholder='Nombre' onChange={handleChange} name='nombre' required />
        <input type="number" className='form-control my-4' placeholder='Cantidad' onChange={handleChange} name='cantidad' min={0} required />
        <input type="number" className='form-control my-4' placeholder='Precio 1' onChange={handleChange} name='precio1' step={50} min={0} required />
        <input type="number" className='form-control my-4' placeholder='Precio 2' onChange={handleChange} name='precio2' step={50} min={0} required />
        <input value={producto.precio1 * producto.cantidad} type="number" className='form-control my-4' placeholder='Total' onChange={handleChange} name='total' step={50} min={0} required />
        <button type='submit' className='btn btn-success my-4'>Añadir</button>
      </form>
    </div>
  )
}
