import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ item }) => { 
    const { addItemToCart, removeItemsFromCart } = useContext(CartContext);
    const handleAddClick = (item) => { 
        addItemToCart(item);
    }
    const handleReduceClick = (item, count) => { 
        removeItemsFromCart(item, count);
    }
    const handleRemoveClick = (item) => { 
        removeItemsFromCart(item, item.quantity);
    }
    return (
        <div className="checkout-item">
            <img src={item.imageUrl} alt={item.name} />
            <span className="checkout-name">{item.name}</span>
            <span className="checkout-quantity">
                <button onClick={()=> handleReduceClick(item, 1)}>{"<"}</button>
                {item.quantity}
                <button onClick={()=> handleAddClick(item)}>{">"}</button>
            </span>
            <span className="checkout-price">{item.price}</span>
            <button onClick={() => handleRemoveClick(item)}>X</button>
        </div>
    )    
};

export default CheckoutItem;