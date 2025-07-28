import ProductListHeader from "../components/Product/ProductListHeader";
import ProductGrid from "../components/Product/ProductGrid";
import {useCallback, useState} from "react";

function ProductList() {
    const [headerProducts, setHeaderProducts] = useState([]);
    const onDataLoaded = useCallback((products) => {
        setHeaderProducts(products);
    }, []);
    return (
        <>
            <ProductListHeader slideProducts={headerProducts.length >= 5 ? headerProducts.slice(1, 5) : []}/>
            <ProductGrid onDataLoaded={onDataLoaded} />
        </>
    );
}
export default ProductList;
