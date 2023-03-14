import React, { useState,useEffect, useContext } from 'react'
import {Nav,Navbar,NavDropdown,Container,Form,Button,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import bg from './bg.jpg'
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CustomerIdContext } from './App'
import Createcart from './gotocart'


function Navigation() {

  const [productdata,setProductdata]=useState([])
  
  const[ProductId,setProductId]=useContext(CustomerIdContext)
  const[_id,setId]=useState("")
  const[cart,setCart]=useState([])
  const [Quantity, setQuantity]=useState(1)

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem("user"))
    console.log(user.userId)
    setId(user.userId)
    

  })
  axios.get('http://localhost:5000/api/getproduct').then((res)=>{
    setProductdata(res.data)
 
    })
  
      const submit=(id)=>{
        const ProductId=productdata[id]._id
        setProductId(ProductId)  
        localStorage.setItem("cart",JSON.stringify(_id))
      
        axios.post('http://localhost:5000/api/createcart',{ProductId,_id,Quantity}).then((res)=>{

       setCart(res.data);
       localStorage.setItem("cartItemss",JSON.stringify(res.data))
        })
     
      }
console.log(cart)
  return (
    <div>
<Navbar collapseOnSelect expand="lg" variant="dark" className='gradient-custom-4 '>
      <Container className='container'>
        <Navbar.Brand href='/home' className='text-white'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bg-white'
         />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto">
            <Nav.Link href='/home' className='text-white' >Home</Nav.Link>
            <Nav.Link href='/home' className='text-white'>Dashboard</Nav.Link>
            <NavDropdown title="Signup/Login" id="collasible-nav-dropdown"  >
              <NavDropdown.Item href='/signup'>Signup</NavDropdown.Item>
              <NavDropdown.Item href='/login'>
                Login
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href='/gotocart'><ShoppingCartIcon/></Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

     <div className=' bg-image' style={{ backgroundImage: `url(${bg})`, height:"600px", display:"flex" }}>
     {productdata.map((prod,id)=>
     <Card style={{ width: '18rem', height:"18rem"}}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title> <h1>{prod.ProductName}</h1>  </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" onClick={()=>{
                                
                                             submit(id)
                                            }}>Add to Cart</Button>
      </Card.Body>
    </Card>
     )}
     
     </div>
   <>
  
   </>
    </div>
  )
}

export default Navigation