import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import ProductCard from "../components/ProductCard";
import ProductListHeader from "../components/ProductListHeader";
import Spinner from "../components/Spinner";

function ProductList() {
    // State variables
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch products
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
                    page,
                    size,
                    search: searchTerm,
                },
            });

            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.error;
            const msgs = typeof errorMsg === "string" ? [errorMsg] : Object.values(errorMsg || {});
            setAlertMessage(msgs.length > 0 ? msgs : "Failed to load products. Please try again later.");
            setAlertType("error");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, [page, size, searchTerm]);

    return (
        <>
            <div className="w-full max-w-2xl mx-auto bg-gray-200 dark:bg-gray-900">
                {alertMessage && (
                    <Alert
                        type={alertType}
                        message={alertMessage}
                        onClose={() => {
                            setAlertMessage("");
                            setAlertType("error");
                        }}
                    />
                )}
            </div>

            <ProductListHeader slideProducts={products.length >= 5 ? products.slice(1, 5) : []} />

            <div className="w-full overflow-hidden min-h-screen mx-auto px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900">
                {loading ? (
                    <Spinner />
                ) : (
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
                )}
            </div>

            <div className="flex items-center justify-center gap-3 px-4 py-4 bg-gray-300 dark:bg-gray-800">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    &#129172;
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-4 py-2 rounded ${
                            page === i
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    &#129174;
                </button>
            </div>
        </>
    );
}

export default ProductList;
