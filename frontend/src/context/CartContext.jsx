import {createContext, useEffect, useState} from "react";
import axios from "axios";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8082/api/v1/cart", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                setCartItems(response.data || []);
            }
            catch (error) {
                setError("Failed to fetch cart items. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        };
        
        const addCartItem = async (cartId) => {
            try {
                const response = await axios.post("http://localhost:8082/api/v1/cart/add", { cartId }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                })
                setCartItems((prevItems) => [...prevItems, response.data]);
            }
            catch (error) {
                setError("Failed to add item to cart. Please try again later.");
            }
        }

        const removeCartItem = async (cartId) => {
            try {
                await axios.delete(`http://localhost:8082/api/v1/cart/${cartId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                setCartItems((prevItems) => prevItems.filter(item => item.cartId !== cartId));
            }
            catch (error) {
                setError("Failed to remove item from cart. Please try again later.");
            }
        }

        const updateCartItemQuantity = async (cartId, quantity) => {
            try {
                const response = await axios.patch(`http://localhost:8082/api/v1/cart/${cartId}`, { quantity }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                setCartItems((prevItems) => prevItems.map(item => item.cartId === cartId ? response.data : item));
            }
            catch (error) {
                setError("Failed to update item quantity. Please try again later.");
            }
        }

    useEffect(() => {
        fetchCartItems();
    }
    , []);
    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            error,
            addCartItem,
            removeCartItem,
            updateCartItemQuantity
        }}>
            {children}
        </CartContext.Provider>
    );

}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}



