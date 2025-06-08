import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import ProductCard from "../components/ProductCard";
import ProductListHeader from "../components/ProductListHeader";

function ProductList() {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        try {
            const token = localStorage.getItem("authToken");
            console.log(token);
            const response = await axios.get("http://localhost:8082/api/v1/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProducts(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <ProductListHeader slideProducts={products.slice(1, 5)}/>
        <div className="w-full overflow-hidden min-h-screen mx-auto px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900">

            <ul className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10 mb-10">
                {products.map((product) => (
                    <li key={product.id}>
                        <ProductCard
                            name={product.name}
                            description={product.description}
                            img={product.img}
                            price={product.price}
                        />
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default ProductList;
