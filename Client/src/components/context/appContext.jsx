import { createContext, useEffect, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.purchased_item_id === productToAdd.purchased_item_id);
  if (existingCartItem) return [...cartItems.filter((cartItem) => cartItem.purchased_item_id !== productToAdd.purchased_item_id), productToAdd]
  
  return [...cartItems, productToAdd]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.purchased_item_id === cartItemToRemove.purchased_item_id);
  if (existingCartItem)  return cartItems.filter((cartItem) => cartItem.purchased_item_id !== cartItemToRemove.purchased_item_id)
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState(0);
  const [searchedServices, setSearchedServices] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // about us menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // reset password
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  // change password
  const [isPasswordWindowOpen, setIsPasswordWindowOpen] = useState(false);
  const [passwordChangeEffect, setPasswordChangeEffect] = useState(false);
  const [userInfo, setUserInfo] = useState(null);



  useEffect(() => {
    const newCartTotal = cartItems.length
    const cartTotalValue = cartItems.reduce((total, cartItem) => total + +cartItem.price, 0)
    setCartCount(newCartTotal);
    setCartTotalValue(cartTotalValue)

  }, [cartItems]);


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemsFromCart = () => {
    setCartItems([])

  }

  const value = { isCartOpen, setIsCartOpen, 
    addItemToCart, removeItemFromCart, 
    clearItemsFromCart, cartItems, 
    cartCount, cartTotalValue,
    isPasswordResetOpen, setIsPasswordResetOpen,
    emailSent, setEmailSent,
    isPasswordWindowOpen, setIsPasswordWindowOpen,
    passwordChangeEffect, setPasswordChangeEffect,
    userInfo, setUserInfo,
    searchedServices, setSearchedServices,
    isMenuOpen, setIsMenuOpen,
    isMobileMenuOpen, setIsMobileMenuOpen
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}