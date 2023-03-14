import React, { useEffect,useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import  axios from 'axios'

function Home() {
    const user= localStorage.getItem("user")
  

    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("user")
        navigate('/login')
    }

    
  return (
   
    <div>
        homee

      { user ? <div><Button onClick={logout}>logout</Button></div> : <Button onClick={()=>navigate('/login')}>login</Button>}
    </div>
  )
}

export default Home