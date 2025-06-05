import {useEffect, useState} from "react";
import axios from "axios";
import Alert from "../components/Alert";

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
        <>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}-{product.price}</li>
                ))}
            </ul>
        </>
    );
}

export default ProductList;