import { Fragment, useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
    const {addItemToCart} = useContext(CartContext);
    const handleProductClick = (e, product) => addItemToCart(product);
    const { name, price, imageUrl } = product;
    return (
        <Fragment>
            <div className='product-card-container'>
                <img src={imageUrl} alt={name} />
                <div className="footer">
                    <span className='name'>{name}</span>
                    <span className='price'>{price}</span>
                </div>
                <Button buttonType="inverse" onClick={e => handleProductClick(e, product)}>Add to cart</Button>
            </div>
        </Fragment>
    );
}

export default ProductCard;