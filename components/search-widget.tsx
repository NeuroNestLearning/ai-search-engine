'use client';

import React, { useEffect } from 'react';

const SearchWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cloud.google.com/ai/gen-app-builder/client?hl=en_US";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <input
                type="text"
                id="searchWidgetTrigger"
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search here..."
            />
            <button className="absolute right-0 top-1/2 h-full transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Search
            </button>
            <gen-search-widget
                configId="xxxxxxx"
                triggerId="xxxxx">
            </gen-search-widget>
        </div>
    );
};

export default SearchWidget;