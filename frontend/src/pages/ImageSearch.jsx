import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "axios";
import ProductCard from "../components/Product/ProductCard";

function ImageSearch() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");
    const [searchResult, setSearchResult] = useState(null);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleImageSearch() {
        setSearchResult(null); // Clear previous results
        if (!file) {
            setAlertMessage("Please select an image file.");
            setAlertType("error");
            return;
        }

        setLoading(true);
        setAlertMessage("");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/v1/search-image",
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSearchResult(response.data.results || null);
            setAlertMessage("Search completed successfully.");
            setAlertType("success");
        } catch (error) {
            setAlertMessage(error.message || "An error occurred during the search.");
            setAlertType("error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-10 px-4">
            {/* Alert Messages */}
            {alertMessage && (
                <Alert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setAlertMessage("")}
                />
            )}
            {/* Card Section */}
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Image Search
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        onClick={handleImageSearch}
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <Spinner />
            )}

            {/* Results Section Below Card */}
            {searchResult && searchResult.length > 0 ? (
                searchResult.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        img={product.imageUrl}
                        price={product.price}
                        description={product.description}
                    />
                ))
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                    No results yet. Upload an image to start searching.
                </p>
            )}

        </div>
    );
}

export default ImageSearch;
