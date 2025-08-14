import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "axios";

function ImageSearch() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");
    const [searchResults, setSearchResults] = useState([]);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleImageSearch() {
        setSearchResults([]); // Clear previous results
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
            const response = await axios.post("http://127.0.0.1:5000/api/v1/search-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSearchResults(response.data.results || []);
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
            <div className="w-full max-w-4xl mt-8">
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {searchResults.map((url, i) => (
                            <div
                                key={i}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                            >
                                <img
                                    src={url}
                                    alt={`Result ${i + 1}`}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {url}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                        No results yet. Upload an image to start searching.
                    </p>
                )}
            </div>

        </div>
    );
}

export default ImageSearch;
