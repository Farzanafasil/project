
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './component/SignIn';
import Registration from './component/Registration';
import Home from './component/Home';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
     <Route path='/' element={<SignIn/>}/>
     <Route path='/register'  element={<Registration/>}/>
     <Route path='/home'  element={<Home method='post' data={{description:'',status:''}}/>}/>
     <Route path='/dash'  element={<Dashboard/>}/>
     {/* method='post' data={{description:'',status:''}} */}
     
     
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
