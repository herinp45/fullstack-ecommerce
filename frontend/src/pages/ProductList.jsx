import ProductListHeader from "../components/Product/ProductListHeader";
import ProductGrid from "../components/Product/ProductGrid";
import { useState } from "react";

function ProductList() {
    const [headerProducts, setHeaderProducts] = useState([]);
    return (
        <>
            <ProductListHeader slideProducts={headerProducts.length >= 5 ? headerProducts.slice(1, 5) : []}/>
            <ProductGrid onDataLoaded={(products) => {setHeaderProducts(products)}} />
        </>
    );
}
export default ProductList;
