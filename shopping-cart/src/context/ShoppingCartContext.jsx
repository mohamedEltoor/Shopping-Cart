// import { createContext, useState, useContext, useEffect } from "react";
// import ShoppingCart from "../components/ShoppingCart";
// const ShoppingCartContext = createContext({});

// const initialCartItems = localStorage.getItem("shopping-cart") ?
// JSON.parse(localStorage.getItem("shopping-cart")) : [] ;

// const ShoppingCartProvider = ({ children }) => {
//   const [isOpen,setIsOpen] = useState(false);
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   useEffect(() =>{
// localStorage.setItem("shopping-cart" , JSON.stringify(cartItems));
//   },[cartItems])
  
//   const openCart = () => {
//     setIsOpen(true);
//   }
//   const closeCart = () => {
//     setIsOpen(false);
//   }
//   const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity , 0)

//   // ترجع الكمية الخاصة بمنتج معين
//   const getItemsQuantity = (id) => {
//     return cartItems.find((item) => item.id === id)?.quantity || 0;
//   };

//   // تزود الكمية أو تضيف المنتج لو مش موجود
//   const increaseCartQuantity = (id) => {
//     setCartItems((currItems) => {
//       if (currItems.find((item) => item.id === id) == null) {
//         // المنتج مش موجود → أضيفه
//         return [...currItems, { id, quantity: 1 }];
//       } else {
//         // المنتج موجود → زوّد كميته
//         return currItems.map((item) => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity + 1 };
//           } else {
//             return item;
//           }
//         });
//       }
//     });
//   };

//   // تقلل الكمية أو تحذف المنتج لو وصلت 0
//   const decreaseCartQuantity = (id) => {
//     setCartItems((currItems) => {
//       if (currItems.find((item) => item.id === id)?.quantity === 1) {
//         return currItems.filter((item) => item.id !== id);
//       } else {
//         return currItems.map((item) => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity - 1 };
//           } else {
//             return item;
//           }
//         });
//       }
//     });
//   };

//   // تحذف المنتج بالكامل
//   const removeFromCart = (id) => {
//     setCartItems((currItems) => currItems.filter((item) => item.id !== id));
//   };

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//          cartItems,
//          getItemsQuantity,
//         increaseCartQuantity,
//         decreaseCartQuantity,
//         removeFromCart,
//         openCart,
//         closeCart,
//         cartQuantity
//       }}
//     >
//       {children}
//       <ShoppingCart isOpen={isOpen}/>
//     </ShoppingCartContext.Provider>
//   );
// };

// export default ShoppingCartProvider;

// export const useShoppingCart = () => {
//   return useContext(ShoppingCartContext);
// };


import { createContext, useState, useContext, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShoppingCartContext = createContext({});

const ShoppingCartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // قراءة البيانات من localStorage مرة واحدة فقط
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("shopping-cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing shopping-cart from localStorage", error);
      return [];
    }
  });

  // تحديث localStorage مع أي تغيير في cartItems
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  // ترجع الكمية الخاصة بمنتج معين
  const getItemsQuantity = (id) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  // تزود الكمية أو تضيف المنتج لو مش موجود
  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (!currItems.find((item) => item.id === id)) {
        return [...currItems, { id, quantity: 1 }];
      }
      return currItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  // تقلل الكمية أو تحذف المنتج لو وصلت 0
  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);
      if (existingItem?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      }
      return currItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // تحذف المنتج بالكامل
  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;

export const useShoppingCart = () => useContext(ShoppingCartContext);

