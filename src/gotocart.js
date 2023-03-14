import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CustomerIdContext } from './App'
import {Card,Button} from 'react-bootstrap'

function Gotocart() {
 const[data,setData]=useState([])  

//  const[ProductId,setProductId]=useState("")
 const[ProductName,setProductName]=useState("")
 const[Price,setPrice]=useState("")
 const[_id,setId]=useState("")
 const[login,setLogin]=useState("")
 const[Product,setProduct]=useState([])
 const[NoOfProduct,setNoOfProduct]=useState("")
 
 useEffect(() => {
  const totalPrice=Product.reduce((accumulator,product)=>accumulator+product.Price,0)
  setPrice(totalPrice)
  const _id=JSON.parse(localStorage.getItem("cart"))
 
  console.log(_id)
  
  axios.post('http://localhost:5000/api/addtocart',{_id}).then((res)=>{
  setProduct(res.data.cartData.cart)
  

 }
  )
})
 
  const removeFromCart=(id)=>{
    const ProductId=Product[id]._id
    const _id=JSON.parse(localStorage.getItem("cart"))
     axios.post('http://localhost:5000/api/delcart',{_id,ProductId})
  }
const quantityInc=(id)=>{
  
    
}
const quantityDec=()=>{
  setNoOfProduct(NoOfProduct-1)
  if(NoOfProduct<1){
    setNoOfProduct(0)
  }
  
}


   


 
  return (
    <div className='d-flex mt-2 ml-5'>
     { Product.map((datas,id)=><>
      <Card style={{ width: '18rem',  marginRight:"20px", border:"1px solid grey"}}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{datas.ProductName}</Card.Title>
        <Card.Text>
        {datas.Price}
        </Card.Text>
        <div className='d-flex'>
        <Button className='mr-1' onClick={()=>quantityInc(datas._id)}>+</Button>
        <Button className='mr-1' variant="primary" onClick={()=> {
                                 removeFromCart(id)}}><div style={{border:"1px solid white"}}><div className='bg-grey'>{NoOfProduct}</div>{}</div>Remove from cart</Button>
        <Button className='mr-1' onClick={()=>quantityDec(id)}>-</Button>
       
        </div>
      
      </Card.Body>
    </Card>
         </>)}
         <div>Total Price:{Price}</div>
    </div>
  )
}

export default Gotocart