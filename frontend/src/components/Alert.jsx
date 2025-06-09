import React, { useEffect } from "react";

function Alert({ message = "", type = "error", onClose, duration = 5000 }) {

    const colors = {
        success: "bg-green-100 text-green-700 border-green-400",
        error: "bg-red-100 text-red-700 border-red-400",
    };

    useEffect(() => {
        if (!message.length) return ;
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration, message.length]);

    return (
        <div
            className={`
        fixed top-5 z-50 w-full max-w-sm 
        border rounded-xl shadow-lg px-4 py-3 flex items-start gap-3
        transform animate-slide-in
        ${colors[type] || colors.error}
      `}
            role="alert"
        >
            <button
                onClick={onClose}
                className="text-lg font-bold text-gray-600 hover:text-black"
                aria-label="Close"
            >
                &times;
            </button>
            <div className="flex flex-col">
                <p className="text-base font-semibold capitalize">{type}</p>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
}

export default Alert;
