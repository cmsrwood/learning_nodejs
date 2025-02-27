import React, { useState } from 'react';
import Navigate from '../plantillas/Navigate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Validation from './LoginValidation';

export default function Signin() {

     //hooks
     const [user,setUser] = useState({
        email:"",
        password:""
    })
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setUser(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      
      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const err = Validation(user)
            setErrors(err)
            if (err.email === "" && err.password === ""){
              axios.post("http://localhost:8800/login",user)
              .then(res => {
                if (res.data==="Success"){
                    Swal.fire("You logged in successfully!", "Welcome!", "success");
                    navigate("/homeuser")
                }
                else{
                  Swal.fire("Wrong email or password!", "Try again!", "error");
                }
              })
              .catch (err => console.log(err))
            }
        }catch(err){
          console.log(err)
        }
      }

  return (
    <div className=''>
        <Navigate/>
        <div className='p-5'>
            <h1 className='text-center'>Sign in</h1>
            <form className='justify-content-center align-items-center px-5' onSubmit={handleSubmit}>
                <div className='mb-3 form-group'>
                    <label className='form-label'>Email</label>
                    <input className='form-control' onChange={handleChange} type="email" name='email' required/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3 form-group'>
                    <label className='form-label'>Password</label>
                    <input className='form-control' onChange={handleChange} type="password" name='password' required/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <div className='mb-3 form-group text-center'>
                <button type="submit" className='btn btn-primary'> Sign in </button>
                </div>
            </form>
        </div>
    </div>
  )
}


