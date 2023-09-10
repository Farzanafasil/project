import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Home from './Home'


const Dashboard = () => {
   
    const [data,setData]=useState([])
 
    const [filter,setFilter]=useState('all')
    const[showForm,SetFormShow]=useState(false)
    const[update,setupdate]=useState(false);
    const[singleValue,setSingleValue]=useState([])
    
    


    const fetchApi=()=>{
     
      axios.get('http://localhost:5000/api/todolist/').then((response)=>{
        // console.log(response.data)

       setData(response.data)
     

    }).catch()
    }
    const filterChange=()=>{
      
      axios.get(`http://localhost:5000/api/todolist/${filter}`).then((response)=>{
        // console.log(response.data)

       setData(response.data)
     

    }).catch()
    }

   
   

const toggleChange=(id,newstatus)=>{
    console.log(id);
    console.log(newstatus);
    axios.put('http://localhost:5000/api/todolist/'+id,{status:newstatus})
    .then((response)=>{
        if(response.data.message==="Data Updated")
        console.log(response.data)
        alert(response.data.message)
       fetchApi();
        

    });

}
const deleteTask=(id)=>{
    console.log(id);
    axios.delete('http://localhost:5000/api/todolist/'+id).then((response)=>{
        alert(response.data.message);
        fetchApi();
        setFilter('all')

    })

}
const updataTask=(value)=>{
  console.log('value:',value)
 
 
  SetFormShow(true);
  setupdate(true);
  setSingleValue(value)
 


}
const handleAddItemClick=()=>{
  setupdate(false)

 SetFormShow(true);

}
const handleItemAdded=(newData)=>{


  console.log('newitem:', newData)
  setData([...data,newData])


}

useEffect(()=>{
     
  if(filter==='all')
  {
   fetchApi()
   
  }
  else
  {
    filterChange()
  }

  

},[filter])


let finalJSX = 
<div class='container'>
<h1>Todo List</h1>
<div className="text-center mb-3">
  <button className="btn btn-primary"onClick={handleAddItemClick}> 
    <i className="fas fa-plus"></i> Add New Item
  </button>
</div>

 
{showForm && <Home onAdditem={handleItemAdded} method='post'data={{description:'',status:''}} />}
<div class="float-right">
<select class="dropdown" id='filter' value={filter}onChange={(e) => setFilter(e.target.value)}>

  <option value='all' >all</option>
  <option value='ongoing' >ongoing</option>
  <option value='compleated' >compleated</option>
</select>
</div>
<div class='container mt-5'>

<table class="table table-stripe">
<thead>
  <tr>
  <th>Si No</th>
    <th>Status</th>
    <th>Task</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  
  { data.map((todo,index) => 
       (<tr key={todo._id}>
          <td>{index}</td>
       <td>
         
         <input type='checkbox'
       

         checked={todo.status==='compleated'}
        
         onChange={()=>toggleChange(todo._id,todo.status==='compleated'? 'ongoing' : 'compleated')}
       
        />
        {todo.status}
       </td>
       <td style={{textDecoration:todo.status==='compleated'?  'line-through' : 'none'}}>{todo.description}</td>

       <td>
        {/* <span onClick={()=>deleteTask(todo._id)}>&#x2716;</span> */}
       <i class="fas fa-trash delete-icon" title="Delete" onClick={()=>deleteTask(todo._id)}></i>
       <i class="fas fa-edit edit-icon" title="Edit" onClick={()=>updataTask(todo)}></i>
       </td>
     </tr>
  ))}
</tbody>
</table>
</div>
</div>

if(update) finalJSX=<Home method='put' data={singleValue}/>

return(





   finalJSX

    

);
};

    



export default Dashboard