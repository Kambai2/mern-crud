import React, { useEffect, useState} from 'react'
import "./user.css"
import axios from 'axios';  
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const User = () => {
    const [users, setUsers] = useState([]);

useEffect(() => {
    fetchUsers();
    }, []);

const fetchUsers = async () => {
    try { 
     const response = await axios.get("http://localhost:5000/api/users")
     setUsers(response.data.data);

    } catch (error) {
        console.log("Error while fetching data", error)
    }
};

const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await axios.delete(`http://localhost:5000/api/delete/user/${id}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.log("Error while deleting user", error);
            toast.error('Error deleting user');
        }
    }
};

// Inline add-user form removed; Add User navigates to separate page

  return (
    <div className='userTable'>
        <Link to="/add" type="button" class="btn btn-primary">
            Add User <i class="fa-solid fa-user-plus"></i></Link>

{users.length === 0 ? (
    <div className='noData'>
        <h3>No Data to display.</h3>
        <p>Please add New Users</p>
    </div>
):(
      <table className='table table-border' style={{marginTop: '20px'}}>
            <thead>
                <tr>
                    <th scope="col">S.No.</th>
                     <th scope="col">Name</th>
                      <th scope="col">Email</th>
                       <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return(
                         <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                      <td className='actionButtons'>
                        <Link to={`/update/`+user._id} type="button" class="btn btn-info">
                             <i class="fa-solid fa-pen-to-square"></i>
                        </Link>
                       
                        <button type="button" class="btn btn-danger" onClick={() => deleteUser(user._id)}>
                              <i class="fa-solid fa-trash"></i>
                        </button>
                      
                        </td>
                </tr>
                    );
                })}

            </tbody>
        </table>
)}

      
    </div>
  )
}

export default User

