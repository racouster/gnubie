import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    return (
        <div className="cart-icon-container" onClick={(_) => setIsCartOpen(!isCartOpen)}>
            <ShoppingBagIcon className="cart-icon" />
            <span className="item-count">{cartCount ?? 0}</span>
        </div>
    );
};

export default CartIcon;