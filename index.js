import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/app';

const tableHeader = window.tableHeader;
const tableData = window.tableData;

ReactDOM.render(
  <App data={ tableData } header={ tableHeader } />,
  document.getElementById('react-root')
);