import axios from "axios";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import CartItemCard from "../components/CartItemCard";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8082/api/v1/cart", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json"
                    }
                })
                setCartItems(response.data || []);
            }
            catch (error) {
                console.error("Error fetching cart items:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCartItems();}
         , [] );
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <CartItemCard key={item.id} item={item} />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
}

export default Cart;