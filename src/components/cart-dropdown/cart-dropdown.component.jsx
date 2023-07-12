import { useContext } from 'react';
import { CartContext } from "../../contexts/cart.context";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import Button from "../../components/button/button.component";

import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        isCartOpen &&
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems?.length > 0
                        ? cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
                        ))
                    : <></>
                }
                </div>
                <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
    );
};

export default CartDropDown;