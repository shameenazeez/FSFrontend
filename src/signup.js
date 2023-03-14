import React, { useEffect, useState } from 'react'
import {Alert} from '@mui/material'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit'
  import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



function Signup() {
  const [name,setName]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [alert,setAlert]= useState(false)
  const [missingalert,setMissingAlert]= useState(false)
  const [passwordSmallalert,setpasswordSmallalert]= useState(false)
 
  const navigate=useNavigate()
  // useEffect(() => {
  //  const user= localStorage.getItem("user");
  //   if(user)
  //   navigate("/home")
  //  }, [])
  
   const submit=()=>{
    if(!name || !email || !password){
      setMissingAlert(true)
     }
   else{
    setMissingAlert(false)
     axios.post('http://localhost:5000/api/signup',{name,email,password}).then((res)=>{
      let isDuplicate=res.data.isDuplicate;
      let isPasswordSmall=res.data.isPasswordSmall;
     
    
    if(isDuplicate){
      setAlert(true)
     }
     else if(isPasswordSmall){
        setpasswordSmallalert(true)
     }
     else{
      
      setAlert(false)
       navigate('/login')
     }
       
    
      
     
   })}}
 
    
  return (
    <div>
    
    
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
    
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <div className='alertbox'>{missingalert?  <Alert severity="error">Enter all fields</Alert> : " "}</div>
          <div className='alertbox'>{passwordSmallalert ?  <Alert severity="error">password is too short</Alert> : " "}</div>
          <div className='alertbox '>{alert? <Alert severity="error">this email already in use</Alert>: " "}</div>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' onChange={(e)=>{setName(e.target.value);console.log(e.target.value);}} />
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' onChange={(e)=>{setEmail(e.target.value);console.log(e.target.value);}} />
     
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'  onChange={(e)=>{setPassword(e.target.value);console.log(e.target.value);}}/>
          {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' /> */}
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={submit} >Register</MDBBtn>
          <div className='loginlink'>Already have an account?<Link to={'/login'}>Login here</Link></div>
        </MDBCardBody>
    
      </MDBCard>
    </MDBContainer>
    </div>
  )
}

export default Signup