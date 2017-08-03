import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/app';

const tableHeader = window.tableHeader;
const tableData = window.tableData;
const dataFilters = window.dataFilters; 

ReactDOM.render(
  <App data={ tableData } header={ tableHeader } filters={ dataFilters } />,
  document.getElementById('react-root')
);