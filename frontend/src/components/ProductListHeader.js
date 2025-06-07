function ProductListHeader() {
    const src =
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80";

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">

                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        <span className="text-blue-500">Product</span> List
                    </h1>
                    <div className="h-1 w-16 bg-blue-500 rounded-full mx-auto lg:mx-0 my-4" />
                    <p className="text-gray-400 dark:text-gray-300 mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                        praesentium cumque iure dicta incidunt est ipsam, officia dolor
                        fugit natus?
                    </p>
                </div>

                <img
                    src={src}
                    alt="Gundam featured product"
                    className="rounded-xl border-r-2 opacity-80 shadow-lg p-4 h-[25rem] w-3/4 max-w-md object-cover transition-transform
                    duration-300 hover:scale-105"
                />
            </div>
        </div>
    );
}

export default ProductListHeader;
