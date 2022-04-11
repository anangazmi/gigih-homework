import { useState } from 'react';

export default function useSearch() {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  return [searchKey, searchResults, setSearchResults, handleSearch];
}
