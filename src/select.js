import React from "react";

export default ({ term, update }) => {

  const dataSearch = e => {
    const value = e.target.value;

    update('city', value);
    
  };

  return (
    <div className="form-group">
      <select className="form-control input-sm" onChange={dataSearch} value={ term }>
        <option value="all" disabled="true">-все города-</option>
        <option value="1">Чебоксары</option>
        <option value="2">Новочебоксарск</option>
        <option value="3">общешкольные</option>
        <option value="4">Кугеси</option>
        <option value="5">Казань</option>
        <option value="6">Канаш</option>        
      </select>
    </div>
  );
};
