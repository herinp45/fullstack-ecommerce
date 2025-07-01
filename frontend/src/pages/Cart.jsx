import Spinner from "../components/Spinner";
import CartItemCard from "../components/Cart/CartItemCard";
import {useCart} from "../context/CartContext";
import OrderSummary from "../components/Cart/OrderSummary";

function Cart() {
    const {cartItems, loading, subTotal}  = useCart();
    console.log("Current cart items:", cartItems);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-center min-h-screen px-4 py-8 dark:bg-gray-900 bg-gray-100">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        Your Cart
                    </h1>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="space-y-4 w-full max-w-2xl">
                                {cartItems.map((item) => (
                                    <CartItemCard key={item.id} item={item} />
                                ))}
                            </ul>

                            <OrderSummary cartItems={cartItems} subTotal={subTotal} />
                        </>
                    )}
                </div>
            )}
        </>
    );


}

export default Cart;
