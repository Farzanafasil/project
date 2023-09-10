import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate=useNavigate()

    const [user,setUser]=useState();
   
    const inputHandler = (e) => {
        console.log('onchange')
       
        setUser(
            {  ...user,[e.target.name]:[e.target.value]})
        console.log(user);
     
        
      };
      
      
      const  addHandler= () => {
        axios.post("http://localhost:5000/api/login",user).then((response) => {
          if (response.data.message === "Login success") {
          
            alert(response.data.message);
            
            
              navigate('/home');
            
          } 
          else {
            alert('Login failed');
          }
        });
      };
    
  return (
    <div className='container'>

        <h1>SignIn</h1>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <input type="text" className="box form-control" id="email" name="email" placeholder='youremail@gmail.com' onChange={inputHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="box form-control" id="password" name="password" placeholder='********' onChange={inputHandler} />
          </div>
        
        <button onClick={addHandler} >submit</button>
        

        <a href='/register'>New User</a>




    </div>
  )
}

export default SignIn