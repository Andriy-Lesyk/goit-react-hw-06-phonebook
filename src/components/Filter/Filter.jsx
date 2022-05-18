import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputFilter } from '../../redux/store';
import { Input } from './Filter.styles';

function Filter() {
  const dispatch = useDispatch();
  const filterSelect = useSelector(state => state.filter.filter);
  const changeFilter = e => dispatch(inputFilter(e.currentTarget.value));

  return (
    <div>
      <label htmlFor={'filter'}>Find contacts by name</label>
      <Input
        value={filterSelect}
        onChange={changeFilter}
        type="text"
        name="filter"
      />
    </div>
  );
}

export default Filter;
