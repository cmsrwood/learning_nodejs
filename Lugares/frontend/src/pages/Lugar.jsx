import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, } from "react-router-dom";
import { BACKEND_URL } from '../config.js'


export default function Lugar() {

    const location = useLocation();
    const lugarId = location.pathname.split("/")[2];


    // Hooks
    const [nombre, setNombre] = useState('')
    const [desco, setDesc] = useState('')
    const [photo, setPhoto] = useState('')

    useEffect(() => {
        const getLugar = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/lugares/${lugarId}`);
                setNombre(res.data.nombre);
                setDesc(res.data.desco);
                setPhoto(res.data.photo);
            } catch (err) {
                console.log(err);
            }
        };
        getLugar();
    }, [lugarId]);


    return (
        <div className='container p-5 '>
            <Link to="/"><button className="btn btn-outline-success shadow"><i className="bi"></i>Volver</button></Link>
            <div className="row py-5 align-items-center justify-content-center">
                <img src={`../../public/images/${photo}`} className="col-6 rounded-5" alt="" />
                <div className="col-6 ">
                    <h1 className="">{nombre}</h1>
                    <p>{desco}</p>
                </div>
            </div>
        </div>
    );
}
