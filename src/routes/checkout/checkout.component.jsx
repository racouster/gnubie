import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import Button from "../../components/button/button.component";

import "./checkout.styles.scss";

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();
    const goToShopHandler = () => {
        navigate('/checkout');
    };
    return (
        <div className="checkout-container">
            <h1>
                Checkout
            </h1>
            <header className="checkout-header">
                <div className="header-column">
                    <span>Product</span>
                </div>
                <div className="header-column">
                    <span>Description</span>
                </div>
                <div className="header-column">
                    <span>Quantity</span>
                </div>
                <div className="header-column">
                    <span>Price</span>
                </div>
                <div className="header-column">
                    <span>Remove</span>
                </div>
            </header>

            <div className="checkout">
                {
                    cartItems ?
                        (cartItems.map(checkoutItem => <CheckoutItem key={checkoutItem.id} item={checkoutItem} />))
                        : (<Button className="nav-link" onClick={goToShopHandler}>Shop</Button>)
                }
            </div>
            <div className="checkout-total">
                <span>Total: {cartTotal}</span>
            </div>
        </div>
    );
};
export default Checkout;