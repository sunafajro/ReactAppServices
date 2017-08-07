import React from "react";
import PropTypes from 'prop-types';
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
            studnorm_id: '',
            validation: {
              name: 'form-group',
              city_id: 'form-group',
              type_id: 'form-group',
              language_id: 'form-group',
              eduage_id: 'form-group',
              eduform_id: 'form-group',
              timenorm_id: 'form-group',
              studnorm_id: 'form-group',
            }
        };
    }

  updateState = (id, value) => {
    let validation = { ...this.state.validation };
    validation[id] = ((value !== '' && value !== 'all') ? 'form-group has-success' : 'form-group has-error');

    this.setState({
      [id]: value,
      validation
    });
  };

  /* валидируем поля формы */
  fieldsValidation = () => {
    let isValid = true;
    let validation = { ...this.state.validation };
    /* создаем массив из ключей объекта state */
    let arr = Object.keys(this.state);
    /* отбраысваем последний ключ */
    arr.pop();
    /* проходим по массиву */
    arr.map(item => {
      if(this.state[item] !== '' && this.state[item] !== 'all') {
        validation[item] = 'form-group has-success';
      } else {
        validation[item] = 'form-group has-error';
        isValid = false;
      }
    });
    this.setState({ validation });
    return isValid;
  }

  /* если валидация прошла отсылаем данные на сервер */
  sendData = () => {

  }

  /* метод обработки отправки формы */
  handleSubmition = () => {
    if(this.fieldsValidation()) {
      this.sendData();
    } else {
      return false;
    }
  }

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
                options={{ 
                  placeholder: 'Введите название...', 
                  term: this.state.name, 
                  name: 'name',
                  validation: this.state.validation.name
                  }}
                update={ this.updateState }
              />
              <Select
                options={{ 
                  term: this.state.type_id,
                  name: 'type_id',
                  validation: this.state.validation.type_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.types }
                
              />
              <Select
                options={{ 
                  term: this.state.eduage_id,
                  name: 'eduage_id',
                  validation: this.state.validation.eduage_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.eduages }
              />
              <Select
                options={{
                  term: this.state.language_id,
                  name: 'language_id',
                  validation: this.state.validation.language_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.languages }
              />
              <Select
                options={{
                  term: this.state.eduform_id,
                  name: 'eduform_id',
                  validation: this.state.validation.eduform_id
                }}
                update={this.updateState}
                filter={this.props.filters.eduforms}
              />
              <Select
                options={{
                  term: this.state.timenorm_id,
                  name: 'timenorm_id',
                  validation: this.state.validation.timenorm_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.timenorms }
              />
              <Select
                options={{
                  term: this.state.city_id,
                  name: 'city_id',
                  validation: this.state.validation.city_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.cities }
              />
              <Select
                options={{
                  term: this.state.studnorm_id,
                  name: 'studnorm_id',
                  validation: this.state.validation.studnorm_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.studnorms }
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={this.handleSubmition}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

/* проверяем props */
Modal.propTypes = {
  filters: PropTypes.object.isRequired,
}

export default Modal;