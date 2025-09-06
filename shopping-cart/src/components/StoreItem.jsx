import React from 'react'
import { useShoppingCart}  from '../context/ShoppingCartContext';

function StoreItem({id,name,price,imgUrl}) {
  const {getItemsQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart();
   const quantity = getItemsQuantity(id);
  return (
    <div className="store-item-card">
     <img src={imgUrl} alt={name}/>
            <h3>{name}</h3>
            <p>${price}</p>
            {
              quantity === 0 ? (<button onClick={()=>increaseCartQuantity(id)}className='btn-add'>Add to Cart</button>) : (
              <div className="update-quantity">
                <div className='update'>
                <button onClick={() => decreaseCartQuantity(id)}> - </button>
                <p>{`${quantity}  in the cart`}</p>
                <button onClick={() => increaseCartQuantity(id)}> + </button>
                </div>
               <div className='remove'>
                 <button  onClick ={() => removeFromCart(id)} className='btn-remove'>Remove</button>
               </div>
              </div>
              
            )
              
            }
            
    </div>
  )
}

export default StoreItem
