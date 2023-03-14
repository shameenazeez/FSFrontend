import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Nav from './nav';
import Navbar from './nav';
import Navigation from './nav';
import Signup from './signup';
import Login from './login';
import Home from './home';
import Order from './Order';

import { createContext, useState } from 'react';
import Gotocart from './gotocart';

const CustomerIdContext=createContext()
function App() {
  const [ProductId,setProductId]=useState("12")
  return (
    <div className="App">
      <CustomerIdContext.Provider value={[ProductId,setProductId]}>
     <Routes>
      <Route  path='/' element={<Navigation/>}></Route>
      <Route  path='/signup' element={<Signup/>}></Route>
      <Route  path='/login' element={<Login/>}></Route>
      <Route  path='/home' element={<Home/>}></Route>
      <Route  path='/order/:id' element={<Order/>}></Route>
      <Route  path='/gotocart' element={<Gotocart/>}></Route>
     </Routes>
     </CustomerIdContext.Provider>
      
   
    </div>
  );
}
export  {CustomerIdContext}
export default App;

