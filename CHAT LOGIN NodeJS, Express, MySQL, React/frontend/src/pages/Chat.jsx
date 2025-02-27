// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'
// eslint-disable-next-line react/prop-types
const Chat = ({ socket, username, room }) => {

    const navigate = useNavigate()
    const [currentMessage, setCurrentMessage] = useState("")
    const [messagesList, setMessagesList] = useState([])

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: new Date().getHours() + ":" + new Date().getMinutes()
            };
            // eslint-disable-next-line react/prop-types
            await socket.emit("send_message", info);
            setMessagesList((list) => [...list, info]);
            setCurrentMessage("");
        }
    }
    
    useEffect (() => {
      const messageHandle = (message) => {
        setMessagesList((list) => [...list, message])
      }
        // eslint-disable-next-line react/prop-types
        socket.on("receive_message", messageHandle)

        // eslint-disable-next-line react/prop-types
        return () => socket.off("receive_message", messageHandle)
    }, [ socket ])

  return (
    <div className=''>
        <div className="card shadow">
        <div className="card-header  ">
          <div className="d-flex justify-content-between">
            <h3>Live chat | Room: {room}</h3>
            <div>
              <h3>{username} (Tú)</h3>
              <button className="btn btn-danger" onClick={() => navigate(0)}>Salir de la sala <i className="bi bi-sign-out"></i></button>
            </div>
          </div>
          <small>Conectados: {username} </small>
        </div>
        <ul className="list-group list-group-flush">
        <ScrollToBottom>
          <li className=" p-5" style={{ height: "400px" }}>
            {messagesList.map((item) => {
                const color = item.author === username ? "primary " : "secondary"
                const direction = item.author === username ? "end" : "start"
                const user = item.author === username ? "": item.author
                return (
                  <div className= {`d-flex justify-content-${direction} text-${direction}`} key={item.time}>
                    <div className={`alert alert-${color}`} role="alert">
                      <div> <strong>{user}</strong>  </div>
                      <div> {item.message} </div>
                      <div> {item.time} </div>
                    </div>
                  </div>
                )
            })}
            
          </li>
        </ScrollToBottom>
          <li className="list-group-item">
            <div className="input-group my-2">
                <input value={currentMessage} className='form-control ' type="text" onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder='Escribe un mensaje' onChange={(e) => setCurrentMessage(e.target.value)} />
                <button className='btn btn-primary ' onClick={sendMessage}>Enviar <i className="bi bi-send"></i></button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
  )
}

export default Chat
