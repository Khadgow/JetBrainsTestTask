import React from 'react';
import './search-panel.css';

const SearchPanel = ({filter}) => {

    return (
        <input type="text"
               className="form-control search-input"
               placeholder="Type to search"
               onChange={filter}/>
    );

};
export default SearchPanel;



