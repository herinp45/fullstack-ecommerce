import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import ProductCard from "../components/ProductCard";
import ProductListHeader from "../components/ProductListHeader";
import Spinner from "../components/Spinner";

function ProductList() {

    // State variables to manage products, loading state, and alerts
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    // State variables for pagination and search
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("pizaa");


    // Function to fetch products from the API
    async function getProducts() {
        setAlertMessage("");
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const response = await axios.get("http://localhost:8082/api/v1/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    page: page,
                    size: size,
                    search: searchTerm,
                },
            });

            setProducts(response.data);
            // setAlertType("success");
            // setAlertMessage("Products loaded successfully!");
        }
        catch (err) {
            console.log(err);
            if (err.response?.data?.error) {
                const errorObj = err.response.data.error;
                // If errorObj is a string, wrap it in an array
                const msgs = typeof errorObj === "string" ? [errorObj] : Object.values(errorObj);
                setAlertMessage(msgs);
            }
            else {
                setAlertMessage("Failed to load products. Please try again later.");
            }
            setAlertType("error");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="w-full max-w-2xl mx-auto bg-gray-200 dark:bg-gray-900">
                {alertMessage && <Alert type={alertType} message={alertMessage} onClose={() => {
                    setAlertMessage("");
                    setAlertType("error");
                }}/>}
            </div>
            <ProductListHeader slideProducts={products.length >= 5 ? products.slice(1, 5) : []} />
            <div className="w-full overflow-hidden min-h-screen mx-auto px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900">
                {loading ? <Spinner/> :
                    <ul
                    className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10 mb-10">
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
                </ul>}
        </div>
        </>
    );
}

export default ProductList;
