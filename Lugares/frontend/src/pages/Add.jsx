import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'

export default function Add() {

const navigate = useNavigate()

const handleClick = async (e) => {
  e.preventDefault();
  try {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    await axios.post(`${BACKEND_URL}/lugares`,formData)
    navigate("/")
    Swal.fire("Lugar guardado!", "", "success");
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: "Ocurrio un error al anadir el lugar. Por favor, intenta de nuevo.",
      icon: "error"
    });
    console.log(err);
  }
};


  return (
    <div className='form text-center container p-5'>
      <h1 className='text-center'>Añade un nuevo lugar</h1>
      <form id='form' className='form-group p-5' encType='multipart/form-data' onSubmit={handleClick} >
      <div className="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Nombre' name='nombre' required/>
      </div>
      <div className="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Descripcion'  name='desco' required/>
      </div>
      <div className="mb-3">
        <input className='form-control' type="file"accept='image/*' autoComplete='off' id ='photo' name='photo' required/>
      </div>
        <button className='btn btn-outline-success' type='submit'>Añadir</button>
        <Link to='/' className='btn btn-outline-danger ms-3'>Cancelar</Link>
      </form>
    </div>
  )
}