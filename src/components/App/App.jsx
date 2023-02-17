import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import s from './app.module.css';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContact) {
      alert(`${name} is already in contact`);
      setContacts(contacts);
    } else {
      setContacts([
        {
          id: nanoid(),
          name,
          number,
        },
        ...contacts,
      ]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts
      .map(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) && contact
      )
      .filter(contact => contact !== false);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filtredContacts = getFiltredContacts();

  return (
    <div className={s.form}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filtredContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
