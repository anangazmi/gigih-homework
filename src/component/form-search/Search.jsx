import React from 'react';

export default function SearchForm(props) {
  const { onSubmit, onChange } = props;

  return (
    <form className="form-search" onSubmit={onSubmit}>
      <input
        className="input-search"
        onChange={onChange}
        type="text"
        name="search"
        placeholder="Search for a song"
      />
      <input className="input-submit" type="submit" value="Search" />
    </form>
  );
}
