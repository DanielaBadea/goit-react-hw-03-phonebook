import React, { Component } from "react";
// import styles from './App.module.css'
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./FilterContacts/FilterContacts";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
});
export class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ],
      filter: ''
    }
  }
componentDidMount(){
  const storedContacts = localStorage.getItem('dataContacts');
  if (storedContacts) {
    this.setState(JSON.parse(storedContacts));
  }

}
// componentDidUpdate(){
//   localStorage.setItem('dataContacts', JSON.stringify(this.state) );
// }
componentDidUpdate(prevProps, prevState) {
  console.log("Prev State:", prevState);
  // Comparăm starea anterioară (prevState.contacts) cu starea curentă (this.state.contacts).
  //  Dacă aceste două stări sunt diferite, înseamnă că s-a produs o schimbare în contacte și trebuie să actualizăm datele din localStorage.
  // Dacă starea anterioară și starea curentă sunt identice, nu este necesar să actualizăm datele din localStorage, 
  // deoarece nu s-a produs nicio schimbare în contacte. Aceasta ajută la evitarea suprascrisurilor inutile în localStorage și optimizează performanța aplicației.
  if (prevState.contacts !== this.state.contacts) {
    localStorage.setItem('dataContacts', JSON.stringify(this.state));
  }
}
  hendleAddContacts = (newContact) => {
    const existingContact = this.state.contacts.filter(contact => contact.name === newContact.name);
    console.log(existingContact);
    console.log('New contact:', newContact);

    if (existingContact.length > 0) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts!`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact]
      }));
    }
  };
  
  hendleToggleContacts = (id) => {
    this.setState((prevState)=>( {
      contacts : prevState.contacts.map((contact)=> contact.id ===id ? {...contact} : contact)
    })
  )}

  // handleRenderContacts = () => {
  //   return this.state.contacts.map(contact => (
  //     <li key={contact.id} className={styles.itemContact}>{`${contact.name}: ${contact.number}`} </li>
  //   ))
  // }

  handleAddFilter = (ev) => {
    this.setState( {filter: ev.target.value})
  }
  handleFilteredContacts = () => {
    const {contacts, filter} =this.state
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  };
  handleDeletedContacts = (id) =>{
    this.setState((prevState => ({
      contacts : prevState.contacts.filter((contact) => contact.id !==id)
    })))
  }
    render() {
      const {filter} = this.state;
      return(
        <>
        <Section title="PhoneBook">
        <ContactForm onAddContacts = {this.hendleAddContacts}/>
        <Filter filter = {filter} onAddFilter = {this.handleAddFilter}/>
        <ContactList contacts ={this.handleFilteredContacts()}  onDeleteContacts ={this.handleDeletedContacts}/>
        </Section>
        </>
      )
    }
  }
