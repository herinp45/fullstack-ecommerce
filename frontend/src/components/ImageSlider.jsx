import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ImageSlider({ src, slideProducts }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slideProducts || slideProducts.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideProducts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slideProducts]);

    // Guard: If no products, render nothing
    if (!slideProducts || slideProducts.length === 0) {
        return null;
    }

    const current = slideProducts[currentIndex];

    return (
        <Link to={`/products/${current.id}`}>
            <img
                src={src}
                alt={current.name}
                className="rounded-xl border-r-2 border-gray-500 dark:border-gray-200 shadow-lg p-4 h-[25rem] w-3/4 max-w-md object-cover
                    transition-transform duration-300 hover:scale-105"
            />
        </Link>
    );
}

export default ImageSlider;
