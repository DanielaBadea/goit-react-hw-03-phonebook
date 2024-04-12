import React, { Component } from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

class ContactList extends Component{

render(){
    const {contacts, onDeleteContacts} = this.props;
    return (
        <div className={styles.containerContacts}>
        <h3 className={styles.titleContact}>Contact List:</h3>
        <ul className={styles.itemsContact}>
          {contacts.map(contact => (
            <li key={contact.id} className={styles.itemContact}>
              {`${contact.name}: ${contact.number}`}
              <div className={styles.containerBtnDel}>
              <button className={styles.btnDelete} onClick={() => { onDeleteContacts(contact.id)}}>Delete</button>
              </div>
              
            </li>
          ))}
        </ul>
      </div>
    )
};
}
ContactList.propTypes = {
  contacts : PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
  })
  ).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
}
export default ContactList;