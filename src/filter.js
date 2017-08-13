import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="form-group">
        <button onClick={ this.props.apply } className="btn btn-info btn-sm" style={{ width: '49%'}}>
          <i className="fa fa-filter" aria-hidden="true"></i> Применить
        </button>
        <button onClick={ this.props.reset } className="btn btn-warning btn-sm pull-right" style={{ width: '49%'}}>
          <i className="fa fa-eraser" aria-hidden="true"></i> Сброс
        </button>
      </div>
    );	                
  }
}

/* проверяем props */
Filter.propTypes = {
  apply: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default Filter;