import {useEffect, useState} from "react";
import axios from "axios";
import Alert from "../components/Alert";

function ProductList() {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8082/api/v1/products/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProducts(response.data);
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            Hi
        </>
    );
}

export default ProductList;