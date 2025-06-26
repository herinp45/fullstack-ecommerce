import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function AddToCartControls({ id }) {
    const { cartItems, addCartItem , updateCartItemQuantity, removeCartItem} = useCart();

    const existingCartItem = cartItems.find(item => item.product.id === id);

    const [quantity, setQuantity] = useState(existingCartItem?.quantity || 0);

    useEffect(() => {
        if (existingCartItem) {
            setQuantity(existingCartItem.quantity);
        }
    }, [existingCartItem]);

    const handleAddToCart = () => {
        addCartItem(existingCartItem ? existingCartItem.id : id);
        setQuantity(1);
    };

    const decreaseQty = () => {
        if (quantity === 1) removeCartItem(existingCartItem.id); // Remove item if quantity is 1 and decrease is clicked
        if (existingCartItem) {
            updateCartItemQuantity(existingCartItem.id, quantity - 1);
            setQuantity(prev => Math.max(prev - 1, 0));
        }

    };

    const increaseQty = () => {
        setQuantity(prev => prev + 1);
        if (existingCartItem) {
            updateCartItemQuantity(existingCartItem.id, quantity + 1);
        }
        else {
            addCartItem(id);
        }
    };

    return (
        <div className="flex flex-col justify-center sm:flex-row items-center gap-3 mt-5">
            {quantity > 0 ?
                (<div className="flex w-10 h-10 items-center justify-center text-gray-800 dark:text-white">
                <button
                    className="px-3 py-1 text-red-400 font-semibold rounded-r transition hover:text-red-500"
                    onClick={decreaseQty}
                >
                    −
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                    className="px-3 py-1 text-blue-400 font-semibold rounded-r transition hover:text-blue-500"
                    onClick={increaseQty}
                >
                    +
                </button>
            </div>):

                (<button
                onClick={handleAddToCart}
                className="text-white bg-blue-500 border-0 py-2 px-6 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Add to Cart
            </button>)
}
        </div>
    );
}

export default AddToCartControls;
