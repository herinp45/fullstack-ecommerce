import {createContext, useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import {useAuth} from "./AuthContext";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {token} = useAuth();

        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/v1/cart", {
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
        
        const addCartItem = async (productId) => {
            try {
                const response = await axios.post("/api/v1/cart/add",
                    { productId: productId, quantity: 1 }, {
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

        const removeCartItem = async (id) => {
            try {
                await axios.delete(`/api/v1/cart/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
            }
            catch (error) {
                setError("Failed to remove item from cart. Please try again later.");
            }
        }

        const updateCartItemQuantity = async (id, quantity) => {
            try {
                await axios.patch(`/api/v1/cart/${id}`, { quantity }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id === id ? { ...item, quantity } : item
                    )
                );
            }
            catch (error) {
                setError("Failed to update item quantity. Please try again later.");
            }
        }

        const subTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);

    useEffect(() => {
        if (token) {
            fetchCartItems();
        }
    }
    , [token]);
    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            error,
            subTotal,
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



