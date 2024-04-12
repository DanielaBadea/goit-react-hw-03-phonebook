import React, { Component } from 'react';
import styles from'./ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class ContactForm extends Component {
    constructor (props){
        super(props);
        this.state = {
          name: '',
          number: ''
        }
      }
      handleSubmit = (ev) => {
        ev.preventDefault();
        const newName = ev.target.elements.name.value;
        const newNumber = ev.target.elements.number.value;
        console.log(newName);
        // Verificare pentru valori nenule
        if(newName.trim() !== "" && newNumber.trim() !== ""){
         const newContact = {
           id : nanoid(),
           name : newName,
           number: newNumber
         };
      // Apelul funcției de adăugare a contactului
        this.props.onAddContacts(newContact);
      // Ștergerea valorilor din câmpurile de introducere
        this.setState({
            name: '',
            number:''
        },
        () => {
          // Funcția de callback care este apelată după actualizarea cu succes a stării
           // Funcția de callback care este apelată după actualizarea cu succes a stării
           console.log("Values cleared:", this.state.name, this.state.number);
           //Accesam valorile actualizate din argumentul funcției de callback
           console.log("Values cleared:", newName, newNumber);
      })
        };
       }
      render(){
        return(
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.labelName}> Name:
        <input
        className={styles.formInput}
          type="text"
          name="name"
          placeholder='Name'
          pattern="^[a-zA-Z]+(([' \-][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={(ev) => this.setState({name: ev.target.value})}
          required
        />
          </label>
          <label className={styles.labelPhone}> Number:
          <input
           className={styles.formInput}
            type="tel"
            name="number"
            placeholder='Phone number'
            pattern= "\+?\d{1,4}?[[\-.\s]]?\(?\d{1,3}?\)?[[\-.\s]]?\d{1,4}[[\-.\s]]?\d{1,4}[[\-.\s]]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={(ev) => this.setState({number: ev.target.value})}
            required
          />
          </label>
        <button type="submit" className={styles.btnSubmit}>Add contact</button>
        </form>
        )
      }
}
ContactForm.protoType = {
   onAddContacts: PropTypes.func.isRequired,
};
export default ContactForm;