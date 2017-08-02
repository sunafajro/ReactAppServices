import React from 'react';

export default ({ term, update }) => {

  const dataSearch = e => {
    const value = e.target.value;

    update('id', value);
    
  };

  return (
    <div className="form-group">
    <input
      type="text"
      className="form-control input-sm"
      placeholder="Найти по id..."
      onChange={ dataSearch }
      value={ term }
    />
    </div>
  );
};