import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ImageSlider({ src, slideProducts }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slideProducts || slideProducts.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideProducts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slideProducts]);

    if (!slideProducts || slideProducts.length === 0) {
        return null;
    }

    const current = slideProducts[currentIndex];

    return (
        <Link to={`/product/${current.id}`}>
            <div>
                <img
                    src={current.imageUrl || src}
                    alt={current.name}
                    key={current.id}
                    loading={"lazy"}
                    className="rounded-xl border-r-2 mx-auto border-gray-500 dark:border-gray-200 shadow-lg p-4
                   h-[22rem] w-11/12 max-w-md object-contain bg-white
                   transition-transform duration-1500 hover:scale-105 animate-fade-in"
                />
            </div>
        </Link>


    );
}

export default ImageSlider;
