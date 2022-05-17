import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Contacts, Contac, Btn } from './Contacts.styles';
import { delet } from '../../redux/store';

function Contact() {
  const dispatch = useDispatch();
  const contactsSelect = useSelector(state => state.contacts.contacts);
  const filterSelect = useSelector(state => state.filter);

  const deleteContact = id => {
    dispatch(delet(contactsSelect.find(cont => cont.id === id)));
  };
  let contacts =
    filterSelect === ''
      ? contactsSelect
      : contactsSelect.filter(cont =>
          cont.name.toLowerCase().includes(filterSelect.filter.toLowerCase())
        );
 
       
  return (
    <div>
      <Contacts>
        {contacts.map(({ name, number, id }) => (
          <Contac key={id}>
            <span>
              {name} : {number}
            </span>
            <Btn onClick={() => dispatch(delet(id))}>Delete</Btn>
          </Contac>
        ))}
      </Contacts>
    </div>
  );
}

export default Contact;
