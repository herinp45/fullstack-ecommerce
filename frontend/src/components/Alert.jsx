import React from 'react';


function Alert({ message = "", type = "error", onClose}) {
    if (!message.length) return null;

    const colors = {
        success: "bg-green-100 text-green-700 border-green-400",
        error: "bg-red-100 text-red-700 border-red-400",
    };

    return (
        <div className={`flex gap-3 px-2 py-3 m-3 border rounded-xl ${colors[type] || colors.error}`}>
            <button
                onClick={onClose}
                className="font-bold  text-lg justify-items-center text-gray-600 hover:text-black"
                aria-label="Close"
            >
                &times;
            </button>
            <div className="mt-1 w-full flex flex-col justify-items-center">
                <div className="text-base font-semibold mb-1 capitalize">{type}</div>
                <div>{message}</div>
            </div>
        </div>
    );
}

export default Alert;
