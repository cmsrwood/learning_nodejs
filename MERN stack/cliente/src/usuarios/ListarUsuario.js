import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ListarUsuario() {

    const [datausuarios, setdatausuario]=useState([])

    useEffect(() => {
        axios.get('api/usuario/obtenerusuarios').then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    },[])
    
//Mapear lista de usuarios en Objeto usuario

    return (
        <div>
            <h2>Lista de usuarios</h2>
        </div>
    );
}
