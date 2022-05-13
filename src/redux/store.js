import {
  configureStore,
  //createAction,
  //createReducer,
  createSlice,
} from '@reduxjs/toolkit';




/*export const add = createAction('contacts/add');
export const delet = createAction('contacts/delet');
export const inputFilter = createAction('filter/inputFilter');

const contactsReducer = createReducer(
  [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  {
    [add]: (state, action) => {
      return {
        contacts: [...state.contacts, ...action.payload],
      };
    },
    [delet]: (state, action) => {
      return {
        contacts: state.contacts.filter(action.payload),
      };
    },
  }
);*/

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  reducers: {
    add(state, action) {
      return {
        contacts: [...state, ...action.payload],
      }; 
    }, 
    delet(state, action) {
      return {
        contacts: state.filter(action.payload),
      };
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    inputFilter(_, actions) {
      return {
        filter: actions.payload,
      };
    },
  },
});

export const { inputFilter } = filterSlice.actions;
export const { add } = contactsSlice.actions;
export const { delet } = contactsSlice.actions;

/*const filterReducer = createReducer('', {
  [inputFilter]: (state, actions) => {
    return {
      filter: actions.payload,
    };
  },
});*/

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});
  