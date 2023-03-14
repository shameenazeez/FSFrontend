
import React, { useContext, useEffect, useState } from 'react'
import {Alert} from '@mui/material'
import { Form ,Button} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
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
} from 'mdb-react-ui-kit'
import { CustomerIdContext } from './App'




function Login() {

  // const getLocalItems=()=>{
  //   const items1= localStorage.getItem('user')
  //   console.log(items1);
  //   if(items1){
  //     return JSON.parse(localStorage.getItem('user'))
  //   }else{
  //   return []
  //   }
  // }
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [passwordIncorrect,setPasswordIncorrect]= useState(false)
    const [CustomerId,setCustomerId]=useContext(CustomerIdContext)
    const [items,setItems]= useState([])
    const [data,setData]= useState([])


    const navigate=useNavigate()
    useEffect(() => {
        var items1= JSON.parse(localStorage.getItem('user'))
        
         if(items1){
         setItems(items1)
         navigate("/home")}
        } ,[data])
        

        console.log(items);
    const submit=()=>{
        axios.post('http://localhost:5000/api/login',{email,password}).then((res)=>{
          setData(res.data)
            const isError=res.data.isError
            const userId=res.data.userId
            console.log(userId)
          
            if(isError){
                setPasswordIncorrect(true)
            }
            else{
                localStorage.setItem("user",JSON.stringify(res.data))
               navigate('/')
            }
        })
    }
 
  return (
    <div>
     
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Hello</h2>
      <div className='alertbox'> {passwordIncorrect? <Alert severity="error">Incorrect Password or Email</Alert>:""}</div> 
         
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' onChange={(e)=>{setEmail(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'  onChange={(e)=>{setPassword(e.target.value);console.log(e.target.value);}}/>
          {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' /> */}
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={submit}>Login</MDBBtn>
          <div className='loginlink'>Don't have an account?<Link to={'/signup'}>Create an Account</Link></div>
        </MDBCardBody>
        
      </MDBCard>
    </MDBContainer>

 

</div>

  )
}

export default Login