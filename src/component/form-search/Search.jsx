import React from 'react';

export default function SearchForm(props) {
  const { onSubmit, onChange } = props;

  return (
    <form className="form-search" onSubmit={onSubmit}>
      <input
        className="text-black mb-2 p-3 rounded-l-full focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        onChange={onChange}
        type="text"
        name="search"
        placeholder="Search for a song"
      />
      <input
        className="mb-2 p-3 bg-green-600 rounded-r-full"
        type="submit"
        value="Search"
      />
    </form>
  );
}
