import React from 'react'
import storeItems from'../data/storeItems.json'
import { useShoppingCart } from '../context/ShoppingCartContext';

function CartItem({id,quantity}) {
  const {removeFromCart} = useShoppingCart();
const item = storeItems.find((i) => i.id === id)
if (item === null) return null;
  return (
    <div className='cart-item'>
      <img src={item.imgUrl} alt='cart-img' />
      <div className="item-info">
        {item.name}
        {quantity > 1 && (<span> x {quantity}</span>)}
      </div>
      <div className="price">
        {item.price}
      </div>
      <div className="total">
        {item.price * quantity}
        <button onClick={() => removeFromCart(id) }>X</button>
      </div>
    </div>
  )
}

export default CartItem;
