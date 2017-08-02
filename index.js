import React from 'react';
import ReactDOM from 'react-dom';

const tableHeader = window.tableHeader;
const tableData = window.tableData;

class Service extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-stripped table-bordered small">
          <thead>
              <tr>
                { this.props.header.map(item => 
                  item.show ?
                    <th key={ item.id }>{ item.title }</th>
                    : '' 
                  )
                }            
              </tr>
          </thead>
          <tbody>
          { this.props.data.map(item => 
            <tr key={item.id}>
              <td>{ item.id }</td>
              <td>{ item.nomination }</td>
              <td>{ item.type }</td>
              <td>{ item.lesson_1 }</td>
              <td>{ item.lesson_5 }</td>
              <td>{ item.lesson_8 }</td>
              <td>{ item.duration }</td>
              <td>{ item.until }</td>
              {
              item.actions ?
                <td>
                  <button
                    className="btn btn-warning btn-xs"
                    style={{marginRight: '2px'}}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-xs"
                  >
                      <i className="fa fa-trash"></i>
                  </button>
                </td>
                : ''
              }
            </tr>)
            }
            </tbody>
          </table>
        </div>
    );
  }
}

ReactDOM.render(
  <Service data={ tableData } header={ tableHeader } />,
  document.getElementById('react-root')
);