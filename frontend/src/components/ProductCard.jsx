

function ProductCard({img, description, name, price}) {

    return (
        <>
            <a href="#" className="group flex flex-col border-r-2 w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=2574&auto=format&fit=crop"
                    alt={name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
               />
                <div className="p-6 border border-gray-100 bg-white">
                    <p className="text-gray-600 text-base">${price}</p>
                    <h1 className="text-xl font-bold">
                        {name}
                    </h1>
                    <p className="line-clamp-3 text-gray-700">
                        {description}
                    </p>
                    <button className="w-full mt-7 px-6 py-2 font-semibold text-base tracking-wide
                        transition-colors duration-300 transform bg-blue-600 rounded-lg
                        hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
                        Add to Cart
                    </button>
                </div>

            </a>
        </>
    );
}

export default ProductCard;