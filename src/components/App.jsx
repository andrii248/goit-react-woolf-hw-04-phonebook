import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? contactsList
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = newContact => {
    setContacts([...contacts, newContact]);
  };

  const checkNewContact = newContact => {
    if (
      contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase()
      )
    ) {
      alert(newContact.name + 'is already available in your Contact List');
      return true;
    }
    return false;
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const dltContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const normalizeFilter = filter.toLocaleLowerCase();

  const availableContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizeFilter)
  );

  return (
    <div className="main">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmit} checkNewContact={checkNewContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onChangeFilter} />
      <ContactList
        availableContacts={availableContacts}
        dltContact={dltContact}
      />
    </div>
  );
};

export default App;
