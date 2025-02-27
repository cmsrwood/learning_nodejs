import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import Chat from './Chat'
import axios from 'axios'
import Swal from 'sweetalert2'

const socket = io.connect("http://localhost:8800")


function Sala() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

 

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get("http://localhost:8800/session")
      .then(res =>{
        if (res.data.loggedIn) {
          setUsername(res.data.username)
          console.log(res)
        } else {
          navigate("/login")
        }
      })
      .catch(err => console.log(err))
  }, [])

  const logout = async (e) =>{
    e.preventDefault()
    try{
          axios.get("http://localhost:8800/logout")
          .then(res => {
            if (res.data === "Success"){
              Swal.fire("You logged out successfully!", "Welcome!", "success")
              navigate("/login")
            }
          })
          .catch (err => console.log(err))
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='chat container p-5'>
      {!showChat?
        <div className="card shadow">
        <div className="card-header">
          <h3>Unirme al chat</h3>
          <div> 
            <p>Bienvenido {username}</p>
            <button className='btn btn-danger my-2' onClick={logout}>Cerrar sesión <i className="bi bi-box-arrow-right"></i></button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <label htmlFor="room" className='form-label' >Sala:</label>
            <input className='form-control my-2' placeholder='ID de la sala' onKeyDown={(e) => e.key === "Enter" && joinRoom()} onChange={(e) => setRoom(e.target.value)} type="text"/>
            <div className='text-center'>
              <button className=' text-center btn btn-primary my-2' onClick={joinRoom}>Unirse</button>
            </div>
          </li>
        </ul>
      </div>
      :
      <Chat socket={socket} username={username} room={room}/>
      }
    </div>
  )
}

export default Sala
