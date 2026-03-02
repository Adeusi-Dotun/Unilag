import React from 'react'
import './Cart.css'
import { IoCartOutline } from "react-icons/io5";








const Cart = () => {
  return (
    <div className='Cart container'>
      <div className="cart-box">
            <IoCartOutline  size={70}/>
            <h2>Your cart is empty</h2>
            <p>You have not added any item to your cart</p>
      </div>
      <button className="shopping">SHOP NOW</button>
    </div>
  )
}

export default Cart
