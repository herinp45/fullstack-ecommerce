

function ProductCard({img, description, name, price}) {

    return (
        <>
            <a href="#" className="flex flex-col border-r-2 w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=2574&auto=format&fit=crop"
                    alt={name}
                    className="h-1/2 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
               />


            </a>
        </>
    );
}

export default ProductCard;