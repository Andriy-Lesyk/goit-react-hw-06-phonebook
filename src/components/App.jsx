import React, {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuId } from 'uuid';
import Form from './Forms/Forms';
import Filter from './Filter/Filter';
import Contact from './Contacts/Contacts';
import {add, delet, inputFilter} from '../redux/store'

export default function App() {


  const dispatch = useDispatch;
  const contactsSelect = useSelector(state => state.contacts)
  const filterSelect = useSelector(state => state.filter)


  
  const formSubmitHandler = (name, number) => {
    const id = uuId();

    const contCheck = contactsSelect.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    )
    
    contCheck
      ? alert(`${name} is olready in contacts`)
      :  dispatch(add([...contactsSelect, { id, name, number }]))
      
  };
 
  const deleteContact = id => {
    dispatch(delet(()=>(contact => contact.id !== id)));
  };
 
  const changeFilter = 
     dispatch(inputFilter(e => e.currentTarget.value));
  ;
  

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contactsSelect));
  }, [contactsSelect]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <Filter filter={filterSelect} onChange={changeFilter} />
      <h2>Contacts</h2>
      <Contact
        onDelete={deleteContact}
        contacts={
          filterSelect === ''
            ? contactsSelect
            : contactsSelect.filter(cont =>
                cont.name.toLowerCase().includes(filterSelect.toLowerCase())
              )
        }
      />
    </div>
  );
}
