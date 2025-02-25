import React, { useState, useEffect } from 'react';
import './RecentIdentifications.css';

function RecentIdentifications() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedResults = JSON.parse(localStorage.getItem('plantIdentifications')) || [];
            setHistory(savedResults);
        };

        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const clearHistory = () => {
        localStorage.removeItem('plantIdentifications');
        setHistory([]);
    };

    if (history.length === 0) return null;

    return (
        <div className="history-section">
            <div className="history-header">
                <h2 className="text-center mb-4">Recent Identifications</h2>
                <button 
                    className="clear-history-btn" 
                    onClick={clearHistory}
                    title="Clear History"
                >
                    Clear All History
                </button>
            </div>
            <div className="history-grid">
                {history.map((item) => (
                    <div key={item.id} className="history-card">
                        <div className="history-image">
                            <img src={item.imageUrl} alt="Plant" />
                        </div>
                        <div className="history-content">
                            <p className="history-date">
                                {new Date(item.timestamp).toLocaleDateString()}
                            </p>
                            <p className="history-result">{item.result}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentIdentifications;