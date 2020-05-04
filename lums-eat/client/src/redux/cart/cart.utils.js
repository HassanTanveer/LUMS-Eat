export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.ItemID === cartItemToAdd.ItemID
  );

  var z

  cartItems.map(cartItem =>
    cartItem.RestaurantID  ? ( z=2 )
      : z=1
  );

  
    if(z==1){
      return [...cartItems, { ...cartItemToAdd, quantity: 1}];
    
    }
    
    
  
 

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.ItemID === cartItemToAdd.ItemID
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  var a

  cartItems.map(cartItem =>
    cartItem.RestaurantID === cartItemToAdd.RestaurantID
      ? ( a=2 )
      : a=1
  );

 


  
  if(a==2){
  
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }

   

  else{
    return [...cartItems];
  }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.ItemID === cartItemToRemove.ItemID
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.ItemID !== cartItemToRemove.ItemID);
  }

  return cartItems.map(cartItem =>
    cartItem.ItemID === cartItemToRemove.ItemID
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
