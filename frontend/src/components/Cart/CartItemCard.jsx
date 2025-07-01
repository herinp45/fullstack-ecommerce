import {useCart} from "../../context/CartContext";

function CartItemCard({item}) {
    const  { removeCartItem, updateCartItemQuantity} = useCart();

    function handleRemove() {
        removeCartItem(item.id);
    }
    return (
        <li
            key={item.id}
            className="flex flex-col sm:flex-row items-center dark:bg-gray-800 bg-white p-4 gap-4 rounded-xl shadow-md
              transition-all duration-300 max-w-screen-xl mx-auto hover:shadow-lg md:hover:scale-105"
        >
            {/* Product Image */}
            <img
                src={item.product.imageUrl || "https://via.placeholder.com/150"}
                loading="lazy"
                alt={item.product.name}
                className="w-24 h-24 object-contain rounded-lg border dark:border-gray-700"
            />

            {/* Product Info */}
            <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {item.product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">${item.product.price}</p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center justify-center sm:justify-end gap-4">
                <button
                    className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 text-xl font-bold px-2"
                    onClick={ () =>  item.quantity === 1 ? handleRemove() : updateCartItemQuantity(item.id, item.quantity - 1) }
                >
                    −
                </button>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {item.quantity}
                </span>
                <button
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 text-xl font-bold px-2"
                    onClick={ () =>  updateCartItemQuantity(item.id, item.quantity + 1)}
                >
                    +
                </button>
            </div>
        </li>

    )
}

export default CartItemCard;