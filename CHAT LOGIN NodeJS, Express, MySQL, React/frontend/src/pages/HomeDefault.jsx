// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeDefault() {
  return (
    <div className="text-center align-items-center p-5 mt-5">
        <img src="/logo.png" className="img-fluid" alt="" />
        <h1>Te damos la bienvenida al Chat</h1>
        <p className="text-secondary mb-4">Un chat sencillo para que puedas comunicarte con tus amigos</p>
        <Link to="/signup" className="btn btn-primary mb-5">Comenzar</Link>
    </div>
  )
}
