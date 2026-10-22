import React, { FunctionComponent, KeyboardEvent, useState } from 'react';

type Props = { onSearch: (query: string) => void };

export const SearchBar: FunctionComponent<Props> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (!query.trim()) return;
        onSearch(query);
        setQuery('');
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="city-search"
                placeholder="Search City.."
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};