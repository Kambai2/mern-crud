import React,{ useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./update.css";
import axios from 'axios';
import toast from 'react-hot-toast';


const UpdateUser = () => {
    const users = {
        name:"",
        email:"",
        address:""
    };
    const [user,setUser]=useState(users)
    const navigate=useNavigate();
    const {id} = useParams();

    const inputHandler = (e) =>{
        const {name,value}=e.target

        console.log(name,value);
        setUser({...user,[name]:value});
    };

    useEffect (()=>{
        axios.get(`http://localhost:5000/api/user/${id}`)
        .then((res)=>{ 
            console.log("User fetched successfully", res.data);
            setUser(res.data.data);
        })
        .catch((err)=>console.log("Error fetching user", err));
    }, [id]);

    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:5000/api/user", user)
        .then((res)=>{
          console.log("User created successfully", res.data);
          toast.success("User created successfully");
        })
        .then(()=>navigate("/"))
        .catch((err)=>console.log("Error while creating user", err));
        }
  return (
    <div className='updateUser'>
        <Link to="/" type="button" className='btn btn-secondary'><i class="fa-solid fa-backward"></i> Back</Link>
        <h3>Update User</h3>
        <form className='updateUserForm' onSubmit={submitForm}>

        <div className='inputGroup'>
        <label htmlFor='name'>Name:</label>
        <input type='text'
         id='name'
         value={user.name}
         onChange={inputHandler}
         name='name'
         autoComplete='off'
         placeholder='Enter your Name' />
        </div>

  <div className='inputGroup'>
        <label htmlFor='email'>E-mail:</label>
        <input type='text'
         id='email'
         value={user.email}
          onChange={inputHandler}
         name='email'
         autoComplete='off'
         placeholder='Enter your Email' />
        </div>

      <div className='inputGroup'>
        <label htmlFor='address'>Address:</label>
        <input type='text'
         id='address'
         value={user.address}
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

export default UpdateUser