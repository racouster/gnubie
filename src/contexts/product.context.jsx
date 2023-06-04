import { createContext, useState, useEffect } from "react";
// TODO: API Service? Just use context?
import SHOP_DATA from "../shop-data.json";

export const ProductsContext = createContext({
    products: null,
    setProducts: () => null
});

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const productsState = { products, setProducts };
    
    useEffect(() => {
        setProducts(SHOP_DATA);
    }, []);

    return <ProductsContext.Provider value={productsState}>{children}</ProductsContext.Provider>
};