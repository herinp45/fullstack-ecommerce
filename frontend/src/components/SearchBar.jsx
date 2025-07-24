import {useEffect, useRef, useState} from "react";
import axios from "../api/axios";
import {Link, useNavigate} from "react-router-dom";

function SearchBar() {

    // State to manage search bar visibility and search term
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchDivRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Get the query from the URL
    const navigate = useNavigate();

    // Handle search submission
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        try {
            const query = searchTerm.trim();
            if (!query) return;
            console.log("Navigating to search:", query);
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
        catch (err) {
            console.error("Search error:", err);
        }
    };

    useEffect(() => {
        const timmer = setTimeout(async () => {
            if (searchTerm.length > 0) {
                const response = await axios.get("/api/v1/products", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json"
                    },
                    params: {
                        search: searchTerm
                    }
                });
                setSearchResults(response.data.products);
            }
        }, 500);
        return () => clearTimeout(timmer);
    }, [searchTerm]);

    // State to manage search bar visibility
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchDivRef.current && !searchDivRef.current.contains(e.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // SVG for the search icon
    const searchSvg = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
        </svg>
    );

    // Handle search term change
    return (
        <div className="relative md:mt-2" ref={searchDivRef}>
            <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="text-gray-800 dark:text-white hover:text-blue-600
                            hover:dark:text-blue-400"
            >
                {searchSvg}
            </button>
            {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
                    >
                    <form onSubmit={handleSubmitSearch}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                                        bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md
                                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>

                    {/* Placeholder for search results */}
                    <div className="mt-2 max-h-60 overflow-y-auto">
                        {
                            searchResults.length > 0 ? (
                                <ul>
                                    {searchResults.map((product) => (
                                        <li key={product.id} className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <Link to={`/product/${product.id}`} className="text-gray-800 dark:text-white">
                                                {product.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) :  searchTerm.trim() ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No results found.</p>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">Start typing to search...</p>
                            )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchBar;