import React from 'react';

// eslint-disable-next-line react/prop-types
const Select = ({ options, value, setValue }) => {
  return (
    <select value={value} onChange={({ target }) => setValue(target.value)}>
      <option value="" disabled>
        Select
      </option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
