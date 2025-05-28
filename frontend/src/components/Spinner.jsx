import { useEffect, useState } from "react";

const tailwindColors = [
    "text-purple-500",
    "text-pink-500",
    "text-teal-400",
    "text-cyan-400",
    "text-blue-400",
    "text-yellow-400",
    "text-rose-400",
    "text-green-400",
    "text-red-500",
    "text-orange-400",
];

function Spinner() {
    const [color, setColor] = useState("text-purple-500");

    useEffect(() => {
        const interval = setInterval(() => {
            const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
            setColor(randomColor);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen dark:bg-gray-900 bg-gray-100">
            <div className={`spinner ${color}`}></div>
        </div>
    );
}
export default Spinner;