"use client";

import React from 'react';

interface PopUpProps {
    message: string;
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 p-6 rounded-md shadow-md max-w-sm">
                <h2 className="text-xl text-white font-bold mb-2">Notice</h2>
                <p className="text-white mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopUp;
