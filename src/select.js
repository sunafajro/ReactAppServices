import React from "react";

export default ({ term, update, name, options }) => {

  const dataSearch = e => {
    const value = e.target.value;
    update(name, value);    
  };

  return (
    <div className="form-group">
      <select className="form-control input-sm" onChange={dataSearch} value={ term }>
        { options.map(item =>
            <option key={ item.key } value={ item.key }>{ item.value }</option>
        ) }               
      </select>
    </div>
  );
};
