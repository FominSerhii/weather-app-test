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
            <label htmlFor="city-search" className="visually-hidden">
                City names, separated by commas
            </label>
            <input
                id="city-search"
                type="text"
                className="city-search"
                placeholder="Search City.."
                name="query"
                autoComplete="off"
                enterKeyHint="search"
                aria-describedby="city-search-hint"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <p id="city-search-hint" className="search-hint">
                Separate multiple cities with commas
            </p>
        </div>
    );
};