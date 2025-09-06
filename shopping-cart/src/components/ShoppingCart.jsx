import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import storeItems from "../data/storeItems.json";

function ShoppingCart({ isOpen }) {
  const { cartItems, closeCart } = useShoppingCart();

  // نجمع الإجمالي كله مرة واحدة
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <div>
      <div className={`offcanvas ${isOpen ? "show" : ""}`}>
        <div className="offcanvas-header">
          <h4>Shopping Cart</h4>
          <button onClick={closeCart}>X</button>
        </div>
        <div className="offcanvas-body">
          <div className="prices-info">
            <p>Price</p>
            <p>Total</p>
          </div>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>

        {/* Footer */}
        {/* <div className="offcanvas-footer">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
        </div>
      </div>
    </div> */}
    <div className="offcanvas-footer">
  <span className="total-label">Total:</span>
  <span className="total-value">
    {cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0)} $
  </span>
</div>
</div>
</div>
  )
}  

export default ShoppingCart;

{/* // function ShoppingCart({isOpen}) {
//   const {cartItems,closeCart} = useShoppingCart();
//   return (
//     <div >
//     <div  className={`offcanvas ${isOpen ? "show" : ""}`}>
//       <div className="offcanvas-header">
//         <h4>Shopping Cart</h4>
//          <button onClick={closeCart}>X</button>
//       </div>
//       <div className="offcanvas-body">
//         <div className="prices-info">
//           <p>price</p>
//           <p>total</p>
//         </div>
//          {cartItems.map((item) =>{
//            return  <CartItem key={item.id} {...item}/>
//          })}
//       </div>
//       <div className="oofcanvas-footer">
//        {cartItems.reduce((total, cartItem) => {
//                 const item = storeItems.find((i) => i.id === cartItem.id);
//                 return <div className="total">
//                 {total + (item?.price || 0) * cartItem.quantity}
//                 </div> 
//               }, 0)}
//       </div>
       
//     </div>
//     </div>
//   )
// }

// export default ShoppingCart

 */}
