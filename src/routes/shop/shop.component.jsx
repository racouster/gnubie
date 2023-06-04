
import { Fragment, useContext } from "react";

import { ProductsContext } from "../../contexts/product.context";

import "./shop.styles.scss";
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () => {
    const { products } = useContext(ProductsContext);

    return (
        <Fragment>
            <div className="products-container">
                {products && products?.map(product => (
                    <ProductCard key={product.id} product={product} ></ProductCard>
                ))}
            </div>
        </Fragment>);
};

export default Shop;