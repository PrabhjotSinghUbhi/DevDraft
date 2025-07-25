import React from 'react'

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
