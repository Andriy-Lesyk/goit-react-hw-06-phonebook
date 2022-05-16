import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  },
  reducers: {
    add(state, action) {
      return {
        contacts: [...state.contacts, action.payload],
      };
    },
    delet(state, action) {
      return {
        contacts: state.contacts.filter(
          state => state.id !== action.payload.map(cont => cont.id)
        ),
      };
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    inputFilter(state, actions) {
      return {
        filter: actions.payload,
      };
    },
  },
});

export const { inputFilter } = filterSlice.actions;
export const { add } = contactsSlice.actions;
export const { delet } = contactsSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
