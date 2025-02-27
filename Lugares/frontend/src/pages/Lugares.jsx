import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { BACKEND_URL, FRONTEND_URL } from '../config.js'

export default function Lugares() {

  const navigate = useNavigate()

  const [Lugares, setLugares] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/lugares`)
        setLugares(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/lugares/${id}`)
      Swal.fire({
        title: "Eliminado!",
        text: "El lugar ha sido eliminado",
        icon: "success"
      }).then(() => navigate(0))
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='container text-center p-5'>
      <h1 className='mb-5'>Lugares</h1>
      <Link to='/add'><button className='btn btn-outline-success shadow'><i className='bi'></i>Añadir nuevo lugar</button></Link>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-5">
        {Lugares.map(lugar => (
          <div className="col" key={lugar.id}>
            <div className="card text-center shadow-lg mb-3" >
              <img height={150} src={`${FRONTEND_URL}/images/${lugar.photo}`} className="card-img-top" alt="..." />
              <div className="card-body ">
                <div className="card-title">
                  <h3> {lugar.nombre} </h3>
                </div>
                <p>{lugar.desco}</p>
                <Link target='_blank' to={`https://www.google.com/maps/search/${lugar.nombre}/@4.6514554,-74.2000918,11.25z?entry=ttu`}><button className='btn btn-outline-primary shadow'><i className="bi bi-geo-alt-fill"></i></button></Link>
                <div className="row justify-content-around mt-4">
                  <Link className='btn btn-outline-success w-25 shadow' to={`/lugar/${lugar.id}`}><i className="bi bi-eye"></i></Link>
                  <Link className='btn btn-outline-warning w-25 shadow' to={`/update/${lugar.id}`}><i className="bi bi-pencil-square"></i></Link>
                  <Link className='btn btn-outline-danger w-25 shadow' onClick={() => handleDelete(lugar.id)}><i className='bi bi-trash'></i> </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
