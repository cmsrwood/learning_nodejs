import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2'

export default function Productos() {

  const navigate = useNavigate()

  const [productos, setProductos] = useState([])

  useEffect(() => {
    const traerTodosLosProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8800/productos')
        setProductos(res.data)
      } catch (err) {

      }
    }
    traerTodosLosProductos()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8800/productos/${id}`)
      navigate(0)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='container text-center my-5 p-5'>
      <div className="d-flex justify-content-between mb-5 border-bottom align-items-center">
        <h1 >Productos</h1>
        <Link to='/añadir'><button className='btn btn-success'><i className='bi'></i>Añadir nuevo producto</button></Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio1</th>
            <th>Precio2</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.precio1}</td>
              <td>{producto.precio2}</td>
              <td>
                <NumericFormat value={producto.total} displayType={'text'} thousandSeparator=',' prefix={'COP '} />
              </td>
              <td>
                <Link className='btn btn-danger mx-2' onClick={() => handleDelete(producto.id)}><i className='bi bi-trash'></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>





    </div>
  )
}
