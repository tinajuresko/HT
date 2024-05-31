import React, { useState } from 'react';

import '../css/searchbar.css';

const SearchBar = ({ onSearch }) => {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };
 
  return (
    <>
        <div class="container-search">
            <input type="text-search" placeholder="Search by IDs or status" onChange={handleChange}></input>
            <div class="search"></div>
        </div>
    </>
  );
};

export default SearchBar;
