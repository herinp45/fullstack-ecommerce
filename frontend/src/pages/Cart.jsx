import axios from "axios";
import {useEffect} from "react";

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
                setCartItems(response.data.items || []);
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
            Hi
        </>
    );
}

export default Cart;