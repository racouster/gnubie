import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }
    
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove, count) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );
    
    if (existingCartItem) {
        return cartItems.flatMap(cartItem =>
            cartItem.id === productToRemove.id
                ? cartItem.quantity - count === 0 ? [] : { ...cartItem, quantity: cartItem.quantity - count }
                : cartItem
        )
    }
    
    return cartItems;
};

export const CartContext = createContext({
    cartItems: [],
    isCartOpen: false,
    setCartItems: (products) => null,
    addCartItem: (product) => null,
    cartCount: 0,
    cartTotal: 0
});

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => { 
        const { quantity, total } = cartItems.reduce((totals, cartItem) => {
            return {
                quantity: totals.quantity + cartItem.quantity,
                total: totals.total + cartItem.quantity * cartItem.price
            }
        }, { quantity: 0, total: 0 });
        
        setCartCount(quantity);
        setCartTotal(total);
    }, [cartItems]);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));
    const removeItemsFromCart = (product, count) => setCartItems(removeCartItem(cartItems, product, count));
    const cartState = { cartItems, isCartOpen, cartCount, cartTotal, addItemToCart, removeItemsFromCart, setCartItems, setIsCartOpen};
    return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
};
