import React from 'react';


function Alert({ message = "", type = "error" }) {
    if (!message.length) return null;
    return (
        <div className="px-4 py-2 m-3 mb-14 bg-gray-800 rounded-xl opacity-75">
            <div className="mx-3">
                    <div className=" w-full text-center font-semibold text-emrald-500 dark:text-emerald-600">
                        {type}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                        {message}
                    </p>
            </div>
        </div>
    );
}

export default Alert;
