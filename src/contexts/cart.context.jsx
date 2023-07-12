import { useEffect, useMemo } from "react";
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

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    return cartItems.map(cartItem => cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
};

const clearCartItem = (cartItems, productToClear) => cartItems.filter(cartItem => cartItem.id !== productToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addCartItem: () => { },
    removeCartItem: () => { },
    clearCartItem: () => { },
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


    const cartState = useMemo(() => {
        const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));
        const removeItemsFromCart = (product) => setCartItems(removeCartItem(cartItems, product));
        const clearItemFromCart = (product) => setCartItems(clearCartItem(cartItems, product));

        return {
            cartItems,
            isCartOpen,
            cartCount,
            cartTotal,
            addItemToCart,
            removeItemsFromCart,
            clearItemFromCart,
            setIsCartOpen
        }
    }, [cartItems, isCartOpen, cartCount, cartTotal, setIsCartOpen])

    return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
};
