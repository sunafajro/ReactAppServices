import React from "react";
import PropTypes from 'prop-types';

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div style={{ height: '72px' }}>
        { this.props.show ?
          <div className={ this.props.code === 200 ? "alert alert-success" : "alert alert-danger" }>
              { this.props.message}
          </div>
          : ''
        }
        </div>
    );
  }
}

/* проверяем props */
Alert.propTypes = {
    code: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
  }

export default Alert;
