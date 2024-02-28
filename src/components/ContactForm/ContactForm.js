import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit, checkNewContact }) => {
  const [{ name, number }, setState] = useState(INITIAL_STATE);

  const onSubmitForm = e => {
    e.preventDefault();
    const newContact = {
      name,
      number,
      id: String(nanoid(4)),
    };
    if (checkNewContact(newContact)) {
      return;
    }
    onSubmit(newContact);
    setState(INITIAL_STATE);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form className={css.form} onSubmit={onSubmitForm}>
      <label className={css.label}>
        Name
        <input
          onChange={onChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          onChange={onChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add new contact</button>
    </form>
  );
};

export default ContactForm;
