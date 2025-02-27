// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Signin() {

  if (localStorage.getItem("user")) {
    window.location.href = "/sala"
  }

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get("http://localhost:8800/session")
      .then(res =>{
        if (res.data.loggedIn) {
          navigate("/sala")
        } else {
          console.log("Not logged in")
        }
      })
      .catch(err => console.log(err))
  }, [])

     //hooks
     const [user,setUser] = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setUser(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      
      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
              axios.post("http://localhost:8800/login",user)
              .then(res => {
                console.log(res)
                if (res.data==="Success"){
                    Swal.fire("You logged in successfully!", "Welcome!", "success");
                    navigate("/sala")
                }
                else{
                  Swal.fire("Wrong username or password!", "Try again!", "error");
                }
              })
              .catch (err => console.log(err))
        }catch(err){
          console.log(err)
        }
      }

      

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-center'>Sign in</h1>
            <form className='justify-content-center align-items-center px-5' onSubmit={handleSubmit}>
                <div className='mb-3 form-group'>
                    <label className='form-label'>Username</label>
                    <input className='form-control' onChange={handleChange} type="text" name='username' required/>
                </div>
                <div className='mb-3 form-group'>
                    <label className='form-label'>Password</label>
                    <input className='form-control' onChange={handleChange} type="password" name='password' required/>
                </div>
                <div className='mb-3 form-group text-center'>
                <button type="submit" className='btn btn-primary'> Sign in </button>
                </div>
            </form>
        </div>
    </div>
  )
}


