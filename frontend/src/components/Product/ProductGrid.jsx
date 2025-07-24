import { useEffect, useState } from "react";
import axios from "../../api/axios"; // Adjust the import path as necessary
import Alert from "../Alert";
import ProductCard from "./ProductCard";
import Spinner from "../Spinner";

function ProductGrid({ searchTerm, onDataLoaded }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setAlertMessage("");
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                const response = await axios.get("/api/v1/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    params: {
                        page,
                        size,
                        search: searchTerm || "",
                    },
                });

                setProducts(response.data.products);
                // Call the onDataLoaded callback if provided
                onDataLoaded?.(response.data.products);
                setTotalPages(response.data.totalPages);
            }
            catch (err) {
                const errorMsg = err.response?.data?.error;
                const msgs = typeof errorMsg === "string" ? [errorMsg] : Object.values(errorMsg || {});
                setAlertMessage(msgs.length > 0 ? msgs : "Failed to load products.");
                setAlertType("error");
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, size, searchTerm, onDataLoaded]);

    return (
        <>
            {alertMessage && (
                <div className="max-w-2xl mx-auto">
                    <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage("")} />
                </div>
            )}

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <ul className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10 mb-10">
                        {products.map((product) => (
                            <li key={product.id}>
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    img={product.imageUrl}
                                    price={product.price}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center justify-center gap-3 px-4 py-4">
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
            )}
        </>
    );
}

export default ProductGrid;
