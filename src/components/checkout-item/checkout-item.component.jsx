import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item: checkoutItem }) => { 
    const { addItemToCart, removeItemsFromCart, clearItemFromCart } = useContext(CartContext);
    const { imageUrl, name, quantity, price } = checkoutItem;
    
    const addItemHandler = () => addItemToCart(checkoutItem);
    const reduceItemHandler = () => removeItemsFromCart(checkoutItem);
    const removeItemHandler = () => clearItemFromCart(checkoutItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div onClick={reduceItemHandler} className="arrow">
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler} >
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="removeButton">
                <div className="remove-button" onClick={removeItemHandler}>
                    &#10005;
                </div>
            </div>
        </div>
    )    
};

export default CheckoutItem;