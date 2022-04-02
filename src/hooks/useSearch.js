import { useState } from "react";

export default function useSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [token, setToken] = useAuth();

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  return [searchKey, searchResults, setSearchResults, handleSearch];
}
