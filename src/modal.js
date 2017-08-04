import React from "react";
import Input from "./input";
import Select from './select';

class Modal extends React.Component {
  constructor(props) {
      super(props)
        this.state = {
            name: '',
            city_id: '',
            type_id: '',
            language_id: '',
            eduage_id: '',
            eduform_id: '',
            timenorm_id: '',
            studnorm_id: ''
        };
    }

  updateState = (id, value) => {
    this.setState({
      [id]: value
    });
  };

  render = () => {
    return (
      <div
        className="modal fade service-modal"
        id="service-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="service-modal-label"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="service-modal-label">
                Добавить новую услугу
              </h4>
            </div>
            <div className="modal-body">
              <Input
                placeholder="Введите название..."
                term={this.state.name}
                name='name'
                update={this.updateState}
              />
              <Select
                term={this.state.type_id}
                update={this.updateState}
                name="type_id"
                options={this.props.filters.types}
              />
              <Select
                term={this.state.eduage_id}
                update={this.updateState}
                name="eduage_id"
                options={this.props.filters.eduages}
              />
              <Select
                term={this.state.language_id}
                update={this.updateState}
                name="language_id"
                options={this.props.filters.languages}
              />
              <Select
                term={this.state.eduform_id}
                update={this.updateState}
                name="eduform_id"
                options={this.props.filters.eduforms}
              />
              <Select
                term={this.state.timenorm_id}
                update={this.updateState}
                name="timenorm_id"
                options={this.props.filters.timenorms}
              />
              <Select
                term={this.state.city_id}
                update={this.updateState}
                name="city_id"
                options={this.props.filters.cities}
              />
              <Select
                term={this.state.studnorm_id}
                update={this.updateState}
                name="studnorm_id"
                options={this.props.filters.studnorms}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={this.sendData}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Modal;