import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ProductDetailPage() {

    const {id} = useParams();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`http://localhost:8082/api/v1/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json"
                    }
                });
                setProduct(response.data);
            }
            catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
        fetchProductDetails();
    }, [id]);


    const name = product.name || "Product Name";
    const description = product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididun" +
        "t ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat.";
    const img = product.img || "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80";
    const price = product.price || "$99.99";
    const itemsInCart = product.item || 1; // Example value, this could be fetched from a state or context

  return (

      <div className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 min-h-screen
      flex items-center justify-center">

          <div className="container h-3/4 w-3/4 px-5 py-24 mx-auto">
              <div className="lg:w-4/5 h-full mx-auto flex flex-wrap">
                  <img alt={name} src={img}
                       className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg shadow-lg "/>

                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {name}
                      </h2>
                      <p className="leading-relaxed">{description}</p>
                      <div className="h-0.5 opacity-60 w-full backdrop-blur-2xl bg-gradient-to-r from-blue-500 to-purple-500 my-4
                      bg-blue-500 rounded-full mx-auto lg:mx-0"/>
                      <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                                ${price}
                            </span>
                            <button
                                className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                            >
                                Add to Cart
                            </button>
                      </div>


                  </div>
              </div>

          </div>
      </div>
  );
}

export default ProductDetailPage;