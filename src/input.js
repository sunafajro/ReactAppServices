import React from 'react';

export default ({ term, update, name, placeholder }) => {

  const dataSearch = e => {
    const value = e.target.value;
    update(name, value);
  };

  return (
    <div className="form-group">
    <input
      type="text"
      className="form-control input-sm"
      placeholder={ placeholder }
      onChange={ dataSearch }
      value={ term }
    />
    </div>
  );
};