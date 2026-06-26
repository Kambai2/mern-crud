import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./addUser.css";
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AddUser = () => {
    const users = {
        name:"",
        email:"",
        address:""
    };
    const [user,setUser]=useState(users)
    const navigate=useNavigate();

    const inputHandler = (e) =>{
        const {name,value}=e.target

        console.log(name,value);
        setUser({...user,[name]:value});
    };

    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post(`${API_BASE_URL}/user`, user)
        .then((res)=>{
          console.log("User created successfully", res.data);
          toast.success("User created successfully");
        })
        .then(()=>navigate("/"))
        .catch((err)=>console.log("Error while creating user", err));
        }
  return (
    <div className='addUser'>
        <Link to="/" type="button" className='btn btn-secondary'><i class="fa-solid fa-backward"></i> Back</Link>
        <h3>Add New User</h3>
        <form className='addUserForm' onSubmit={submitForm}>

        <div className='inputGroup'>
        <label htmlFor='name'>Name:</label>
        <input type='text'
         id='name'
         onChange={inputHandler}
         name='name'
         autoComplete='off'
         placeholder='Enter your Name' />
        </div>

  <div className='inputGroup'>
        <label htmlFor='email'>E-mail:</label>
        <input type='text'
         id='email'
          onChange={inputHandler}
         name='email'
         autoComplete='off'
         placeholder='Enter your Email' />
        </div>

      <div className='inputGroup'>
        <label htmlFor='address'>Address:</label>
        <input type='text'
         id='address'
          onChange={inputHandler}
         name='address'
         autoComplete='off'
         placeholder='Enter your Address' />
        </div>

    <div className='inputGroup'>
        <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default AddUser