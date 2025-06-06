function ProductCard({ img, description, name, price }) {
    return (
        <div className="group rounded-2xl shadow-md overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out">
            <img
                src={"https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"}
                alt={name}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-72"
            />

            <div className="p-4 sm:p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">${price}</p>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mt-1">{name}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>

                <button
                    className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-semibold transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
