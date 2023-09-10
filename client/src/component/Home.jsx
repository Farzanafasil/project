import axios from 'axios'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'




const Home = (props) => {
    const navigate=useNavigate()
    // const [description,setDescription]=useState('')
    // const [status,setStatus]=useState('')
    const [update,setupdate]=useState({
      ...props.data,
      status: props.data?.status || ''
    })
    
    // console.log(props.method)
    // console.log(props.data)
    

    
    const InputHandler = (e) => {
      const { name, value } = e.target;
      setupdate({
        ...update,
        [name]: value,
      });
     
    };


  const Submit=()=>{

    const data=
    {description:update.description,
      status:update.status
      };

    if(props.method==='post')
    {
      

    axios.post('http://localhost:5000/api/todolist/',data)
    .then((response)=>{
       console.log(response);
       console.log(response.data.message)
     if (response.data.message === "created succesfully") {
         alert(response.data.message);
        window.location.reload(false)
          
      } else {
        alert(response.data.message);
      }
       


    }).catch()
    
  }
  
  if(props.method==='put')
  {
 

    axios.put('http://localhost:5000/api/todolist/'+update._id,update)
   
    .then((response)=>{

      
    
      if(response.data.message==="Data Updated")
      {
        alert('data updated succesfuuly')
        window.location.reload(false)
     
      }
      else
      {
        alert('not updated')
      }
    }).catch((err) => {
      console.log(err);
    });
  }
console.log(update.description)
console.log(update.status)
}

  return (
    <div>

      <div class='row mt-5'>
      <div class="w-25 p-3">
      <form class = 'card p-3 bg-light'>
      <div class="form-group">
     
      <textarea name='description' class="form-control" id="textarea"  placeholder="Enter your text here"
            value={update.description}
            onChange={InputHandler}
            // (e) => setDescription(e.target.value)
            required
          />
          </div><br/>
      <label>Status</label>
      <select name='status' class="form-control" id="dropdown" value={update.status} onChange={InputHandler}>

      {/* (e) => setStatus(e.target.value) */}
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
      <br/>
      <button class='btn btn-primary' onClick={Submit}>Add</button>
      

    
    
      </form>
      </div>
      </div>
    




        
     </div>
  )
}

export default Home