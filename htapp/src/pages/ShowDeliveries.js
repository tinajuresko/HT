
import React, { useState, useRef, useEffect } from 'react';

import Navbar from '../components/navbar';
import Deliveries from '../components/Deliveries';
import SearchBar from '../components/SearchBar';

import '../css/showdeliveries.css';

const ShowDeliveries = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return(
        <>
            
            <Navbar></Navbar>
            <SearchBar onSearch={setSearchTerm}></SearchBar>
            <Deliveries searchTerm={searchTerm}></Deliveries>
        
        </>
        
    )
};

export default ShowDeliveries;