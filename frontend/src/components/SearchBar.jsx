import {useEffect, useRef, useState} from "react";


function SearchBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchDivRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle search submission
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === "") {
            setIsSearchOpen(false);
        }

    }



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
                    <div>
                        {/* Placeholder for search results */}
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Search results will appear here...
                        </p>

                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchBar;