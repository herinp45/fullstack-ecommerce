
function ImageSlider({src, slideProducts}) {
    return (
        <>
            <img
                src={src}
                alt="Gundam featured product"
                className="rounded-xl border-r-2 border-gray-500 dark:border-gray-200 shadow-lg p-4 h-[25rem] w-3/4 max-w-md object-cover
                         transition-transform duration-300 hover:scale-105"
            />
        </>
    );
}

export default ImageSlider;