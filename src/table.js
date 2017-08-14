import React from "react";
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-sm-4">
            { this.props.page > 1 ?
              <button className="btn btn-default btn-sm" onClick={ this.props.previous }><i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Предыдущий</button>
              : ''
            }
          </div>
          <div className="col-sm-4 text-center" style={{ paddingTop: '5px' }}>Показаны записи с <b>{ this.props.counts.start }</b> по <b>{ this.props.counts.end }</b> из <b>{ this.props.counts.total }</b></div>
          <div className="col-sm-4 text-right">
            { this.props.page < Math.round(this.props.counts.total / 20) ?
              <button className="btn btn-default btn-sm" onClick={ this.props.next }>Следующий <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
              : ''
            }
          </div>
        </div>
        <table className="table table-hover table-stripped table-bordered small">
          <thead>
            <tr>
              {this.props.header.map(
                item =>
                  item.show
                    ? <th key={item.id}>
                        {item.title}
                      </th>
                    : ""
              )}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(item =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nomination}</td>
                <td>{item.type}</td>
                <td>{item.lesson_1}</td>
                <td>{item.lesson_5}</td>
                <td>{item.lesson_8}</td>
                <td>{item.duration}</td>
                <td>{item.until}</td>
                {item.actions
                  ? <td className="text-center">
                      <button
                        className="btn btn-warning btn-xs"
                        style={{ marginRight: "2px" }}
                      >
                        <i className="fa fa-pencil" />
                      </button>
                      <button className="btn btn-danger btn-xs">
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  : ""}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

/* проверяем props */
Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  counts: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
}

export default Table;
