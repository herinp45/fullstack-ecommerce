import {Link} from "react-router-dom";

function ProductCard({ id, img, description, name, price }) {
    const src = "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80";
    return (
        <div className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800
                shadow-md hover:shadow-lg dark:hover:shadow-white/10
                transition duration-300 ease-in-out">
            <Link to={`/product/${id}`} className="block max-w-sm mx-auto">
                <img
                    src={img || src}
                    alt={name}
                    className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105 md:h-56"
                />
            </Link>
            <div className="p-4 sm:p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">${price}</p>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mt-1">{name}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
                {/*<button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-semibold transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">*/}
                {/*    Add to Cart*/}
                {/*</button>*/}
                <div className="flex items-center justify-center mt-4 text-gray-800 dark:text-white">
                    <button
                        className="px-3 py-1 bg-red-500 font-semibold rounded-l transition hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400">
                        −
                    </button>
                    <span className="px-4 py-1">1</span>
                    <button
                        className="px-3 py-1 bg-blue-500  font-semibold rounded-r transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ">
                        +
                    </button>
                </div>


            </div>

        </div>

    );
}

export default ProductCard;
