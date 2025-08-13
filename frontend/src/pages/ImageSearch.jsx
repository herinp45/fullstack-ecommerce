import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";


function ImageSearch() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");
    const [searchResults, setSearchResults] = useState([]);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleImageSearch() {
        if (!file) {
            setAlertMessage("Please select an image file.");
            setAlertType("error");
            return;
        }

        setLoading(true);
        setAlertMessage("");

        const formData = new FormData();
        formData.append("image", file);

        try {
            // const token = localStorage.getItem("authToken");
            const response = await axios.post("/api/v1/products/image-search", formData, {
                headers: {
                    // Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setSearchResults(response.data.results || []);
            setAlertMessage("Search completed successfully.");
            setAlertType("success");
        } catch (error) {
            setAlertMessage(error.message || "An error occurred during the search.");
            setAlertType("error");
        } finally {
            setLoading(false);
        }
    }

  return (

    <div className="flex flex-col items-center justify-center h-screen">
        {alertMessage && (<Alert type={alertType} message={alertMessage} />)}
      <input type={"file"} accept="image/*"
             onChange={handleFileChange} className="mb-4" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleImageSearch}>Search</button>
        <div className="mt-8 text-gray-600">
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    {searchResults.map((url, i) => (
                        <div key={i} className="mb-4">
                            {url}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default ImageSearch;