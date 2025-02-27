import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Books() {

  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const params = useParams();
  

  // Hooks
  const [title, setTitle]=useState('')
  const [desc, setDesc]=useState('')
  const [cover, setCover]=useState('')
  const [price, setPrice]=useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCover(res.data.cover);
        setPrice(res.data.price);
      } catch (err) {
        console.log(err);
      }
    };
    getBook();
  }, [bookId]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const book={
        title: title,
        desc: desc,
        cover: cover,
        price:price,
        id: params.id
    }
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
      Swal.fire("Book updated!", "", "success");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form text-center container p-5'>
      <h1 className="mb-3">Update a Book</h1>
      <form className="form-group">
        <input className='form-control mb-3' type="text" placeholder='title' value={title} onChange={(e) => {setTitle(e.target.value)}} name='title'/>
        <input className='form-control mb-3' type="text" placeholder='desc' value={desc} onChange={(e) => {setDesc(e.target.value)}} name='desc'/>
        <input className='form-control mb-3' type="number" placeholder='price' value={price} onChange={(e) => {setPrice(e.target.value)}} name='price'/>
        <input className='form-control mb-3' type="file" placeholder='cover' onChange={(e) => {setCover(e.target.value)}}  name='cover'/>
        <button className="btn btn-success" onClick={handleClick}>Update</button>
      </form>
      <Link to="/">See all books</Link>
    </div>
  );
};
