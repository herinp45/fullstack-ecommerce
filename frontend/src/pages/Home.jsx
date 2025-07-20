import React from "react";


function Home() {
    return (
        <div className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="container h-3/4 w-3/4 px-5 py-24 mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Store</h1>
                <p className="text-lg text-center">Explore our wide range of products and find what you love!</p>
            </div>
        </div>
    );
}

export default Home;