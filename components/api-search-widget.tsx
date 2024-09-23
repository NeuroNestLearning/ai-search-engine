'use client';

import React, { useState } from 'react';

const ApiSearchWidget = () => {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [references, setReferences] = useState([]);
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setAnswer('');
        setReferences([]);
        setRelatedQuestions([]);

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error('Search request failed');
            }

            const data = await response.json();
            setAnswer(data.answer);
            setReferences(data.references);
            setRelatedQuestions(data.relatedQuestions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ask about NeuroNest..."
                    />
                    <button
                        type="submit"
                        className="absolute h-full right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}

            {answer && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2 text-black">Answer</h2>
                    <p className="text-gray-700">{answer}</p>
                </div>
            )}

            {references.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2 text-black">Citations</h2>
                    <ul className="list flex flex-col gap-2">
                        {references.map((reference, index) => (
                            <div key={index} className="text-sm text-gray-600 flex flex-col">
                                <span>{reference?.chunkInfo?.content} </span>
                                <span><strong>Source: </strong>{reference?.chunkInfo?.documentMetadata.title} </span>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {relatedQuestions.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2 text-black">Related Questions</h2>
                    <ul className="space-y-2">
                        {relatedQuestions.map((question, index) => (
                            <li
                                key={index}
                                className="cursor-pointer text-blue-600 hover:underline"
                                onClick={() => setQuery(question)}
                            >
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ApiSearchWidget;