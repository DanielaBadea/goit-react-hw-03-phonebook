import React, { Component } from 'react';
import styles from './FilterContacts.module.css';
import PropTypes from 'prop-types';

class Filter extends Component{
    render(){
        const {filter, onAddFilter} = this.props;
        return(
            <div className={styles.containerFilter}>
                <h3 className={styles.titleFilter}>Find contacts by name:</h3>
                <input
                className={styles.filterInput}
                 type = "text"
                 name = "filter"
                 value={filter}
                 placeholder="Contacts"
                 onChange={onAddFilter}
                required
                 />
            </div>
        )
    }
}
Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onAddFilter: PropTypes.func.isRequired,
}
export default Filter;