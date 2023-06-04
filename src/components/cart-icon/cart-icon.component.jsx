import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg"

import "./cart-icon.styles.scss";

const CartIcon = () => {
    return (
        <div className="cart-icon-container">
            <ShoppingBagIcon className="cart-icon" />
            <span className="item-count">0</span>
        </div>
    );
};

export default CartIcon;