import {useEffect, useState} from "react";
import axios from "axios";
import Alert from "../components/Alert";
import ProductCard from "../components/ProductCard";

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
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getProducts();
    }, []);


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>

            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    );
}

export default ProductList;