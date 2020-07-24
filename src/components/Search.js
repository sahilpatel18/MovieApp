import React from "react";

export default ({ value, onChange }) => {
  return (
    <input
      data-cy='movie-find-searchbar'
      type='text'
      name='query'
      className='form-control my-3'
      placeholder='Search...'
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
