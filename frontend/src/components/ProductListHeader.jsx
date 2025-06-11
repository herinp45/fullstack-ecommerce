import ImageSlider from "./ImageSlider";

function ProductListHeader({slideProducts}) {
    const src =
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80";

    return (
        <div className=" bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200 py-10 px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">

                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        <span className="text-blue-500">Product</span> List
                    </h1>
                    <div className="h-1 w-1/4 bg-blue-500 rounded-full mx-auto lg:mx-0 my-4
                    backdrop-blur-2xl bg-gradient-to-r from-blue-500 to-purple-500" />
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                        praesentium cumque iure dicta incidunt est ipsam, officia dolor
                        fugit natus?
                    </p>
                </div>

                <ImageSlider src={src} slideProducts={slideProducts}/>
            </div>
        </div>
    );
}

export default ProductListHeader;
