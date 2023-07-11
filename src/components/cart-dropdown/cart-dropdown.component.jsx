import { useContext } from 'react';
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import Button from "../../components/button/button.component";

import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
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
                <Link className="button-link" to="/checkout">
                    <Button onClick={() => setIsCartOpen(false)}>Checkout</Button>
                </Link>
        </div>
    );
};

export default CartDropDown;