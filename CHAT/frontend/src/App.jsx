import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './pages/Chat'

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <div className='chat container p-5'>
      {!showChat?
        <div className="card shadow">
        <div className="card-header">
          <h3>Unirme al chat</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <label htmlFor="username" className='form-label' >Username:</label>
            <input className='form-control my-2' placeholder='Username...' onKeyDown={(e) => e.key === "Enter" && joinRoom()} onChange={(e) => setUsername(e.target.value)} type="text"/>
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

export default App
