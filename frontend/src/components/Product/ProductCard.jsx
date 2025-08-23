import { Link } from "react-router-dom";
import AddToCartControls from "../Cart/AddToCartControls";

function ProductCard({ id, img, description, name, price }) {
    const src =
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80";

    return (
        <div
            className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800
                shadow-md hover:shadow-lg dark:hover:shadow-white/10
                transition duration-300 ease-in-out flex flex-col"
        >
            <Link to={`/product/${id}`} className="block w-full flex-1">
                <div
                    className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded
                    group-hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                    <img
                        src={img || src}
                        alt={name}
                        className="object-contain w-full h-full"
                    />
                </div>
            </Link>

            <div className="p-4 sm:p-6 flex flex-col flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    ${price}
                </p>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mt-1">
                    {name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {description}
                </p>

                {/* pushes button to bottom */}
                <div className="mt-6 mb-2">
                    <AddToCartControls id={id} />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
