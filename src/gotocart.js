import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomerIdContext } from './App'
import {Card,Button,Modal} from 'react-bootstrap'
import Login from './login'

function Gotocart() {
 const navigate=useNavigate() 
 const[data,setData]=useState([])  

 const[ProductId,setProductId]=useState("")
 const[ProductAdd,setProductAdd]=useState([])
 const[Price,setPrice]=useState("")
 const[cartTotal,setCartTotal]=useState("")
 const[user,setUser]=useState("")
 
 const[Product,setProduct]=useState([])
 const[NoOfProduct,setNoOfProduct]=useState([])
//  const [Quantity, setQuantity]=useState("")

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);

 
 useEffect(() => {
  const user=JSON.parse(localStorage.getItem("user"))
  const _id={_id :user.userId}

  
   axios.post('http://localhost:5000/api/gotocart',_id).then((res)=>{
    setProduct(res.data.cartData.cart);
    setUser(res.data.cartData._id);
 })
 setCartTotal(Product.reduce((total, item)=>total+(item.product.Price*item.count),0))
 localStorage.setItem("cartToatal",JSON.stringify(cartTotal))

 })
  console.log(Product);



  const removeFromCart=(id)=>{
    
  const cartItemId=Product[id]._id
  
  axios.post('http://localhost:5000/api/delcart',{user,cartItemId})
  }
const quantityInc=(id)=>{
  let count=Product[id].count+1
  const cartItemId=Product[id]._id
  console.log(count)
  axios.post('http://localhost:5000/api/updatecount',{count,user,cartItemId})
 
 }



const quantityDec=(id)=>{

  let count=Product[id].count-1
  const cartItemId=Product[id]._id
  console.log(count)
  axios.post('http://localhost:5000/api/updatecount',{count,user,cartItemId})
}

const buynow=()=>{
 setShow(true)
}

 
  return (
    <div className='d-flex mt-2 ml-5'>
     { Product.map((datas,id)=><>
      <Card style={{ width: '18rem',  marginRight:"20px", border:"1px solid grey"}}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{datas.product.ProductName}</Card.Title>
        <Card.Text>
        {datas.Price}
        </Card.Text>
        <div className='d-flex'>
        <Button className='mr-1' onClick={()=>quantityInc(id)}>+</Button>
        <Button className='mr-1' variant="primary" onClick={()=> {
                                 removeFromCart(id)}}><div style={{border:"1px solid white"}}><div className='bg-grey'>{datas.count}</div>{}</div>Remove from cart</Button>
        <Button className='mr-1' onClick={()=>quantityDec(id)}>-</Button>
       
        </div>
      
      </Card.Body>
    </Card>
         </>)}
         <div>Total Price:{cartTotal}</div>
        
         <Button variant="primary" onClick={buynow}>
       Buy Now
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" >Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Gotocart