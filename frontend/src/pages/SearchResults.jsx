import { useLocation } from "react-router-dom";
import ProductGrid from "../components/Product/ProductGrid";


function SearchResults() {

    // Get the search query from the URL
    const query = new URLSearchParams(useLocation().search).get("q");

    return (
        <>
            <div className="text-xl px-4 py-2 font-semibold dark:text-white">
                Search Results for: "{query}"
            </div>
            <ProductGrid searchTerm={query} />
        </>
    );
}

export default SearchResults;


