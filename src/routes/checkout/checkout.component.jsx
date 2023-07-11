import { Link } from "react-router-dom";
import { useContext, Fragment } from "react";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return (
        <Fragment>
            <header>
                <h1>
                    Checkout
                </h1>
            </header>
            <div className="checkout-container">
                <div className="checkout">
                    {
                        cartItems ?
                        (cartItems.map(checkoutItem => <CheckoutItem item={checkoutItem} />))
                        : (<Link className="nav-link" to="/shop" />)
                    }
                </div>
                <div className="checkout-total">
                    <span>Total: { cartTotal }</span>
                </div>
            </div>
        </Fragment>
    );
};
export default Checkout;