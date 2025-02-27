import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'


export default function Update() {

  const location = useLocation();
  const lugarId = location.pathname.split("/")[2];
  const params = useParams();
  

  // Hooks
  const [nombre, setNombre]=useState('')
  const [desco, setDesc]=useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const getLugar = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/lugares/${lugarId}`);
        setNombre(res.data.nombre);
        setDesc(res.data.desco);
      } catch (err) {
        console.log(err);
      }
    };
    getLugar();
  }, [lugarId]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const book={
        id: params.id,
        nombre: nombre,
        desco: desco,
    }
      await axios.put(`${BACKEND_URL}/lugares/${lugarId}`, book);
      navigate("/");
      Swal.fire("Lugar actualizado!", "", "success");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form text-center container p-5'>
      <h1 className="mb-5">Actualizar lugar</h1>
      <form className="form-group">
      <div className="form-floating mb-3">
        <input className='form-control mb-3' id ="floatingInput" type="text" placeholder='nombre' value={nombre} onChange={(e) => {setNombre(e.target.value)}} name='nombre'/>
        <label htmlFor="floatingInput">Nombre del lugar</label>
      </div>
      <div className="form-floating mb-3">
        <input className='form-control mb-3' id ="floatingInput" type="text" placeholder='desco' value={desco} onChange={(e) => {setDesc(e.target.value)}} name='desco'/>
        <label htmlFor="floatingInput">Descripción</label>
      </div>
        <button className="btn btn-outline-success" onClick={handleClick}>Actualizar</button>
      </form>
    </div>
  );
};
