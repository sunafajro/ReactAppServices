import React from "react";
import PropTypes from 'prop-types';
import Input from "./input";
import Select from './select';
import DatePicker from 'react-bootstrap-date-picker';

class Modal extends React.Component {
  constructor(props) {
      super(props)
        this.state = {
          rawDate: '',
          data: {
            date: '',
            name: '',
            city_id: '',
            type_id: '',
            language_id: '',
            eduage_id: '',
            eduform_id: '',
            timenorm_id: '',
            studnorm_id: ''
          },
          validation: {
            date: 'form-group',
            name: 'form-group',
            city_id: 'form-group',
            type_id: 'form-group',
            language_id: 'form-group',
            eduage_id: 'form-group',
            eduform_id: 'form-group',
            timenorm_id: 'form-group',
            studnorm_id: 'form-group',
          },
          serverError: false,
          clientError: false,
          error: ''
        };
        this.initialState = { ...this.state };
    }

  updateState = (id, value) => {
    let data = { ...this.state.data };
    let validation = { ...this.state.validation };
    data[id] = value;
    validation[id] = ((value !== '' && value !== 'all') ? 'form-group has-success' : 'form-group has-error');

    this.setState({
      data,
      validation
    });
  };

  /* валидируем поля формы */
  fieldsValidation = () => {
    let isValid = true;
    let validation = { ...this.state.validation };
    /* создаем массив из ключей объекта state */
    let arr = Object.keys(this.state.data);
    /* проходим по массиву */
    arr.map(item => {
      if(this.state.data[item] !== '' && this.state.data[item] !== 'all') {
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
    const CalcService = {
      name: this.state.data.name,
      calc_city: this.state.data.city_id,
      calc_servicetype: this.state.data.type_id,
      calc_lang: this.state.data.language_id,
      calc_eduage: this.state.data.eduage_id,
      calc_eduform: this.state.data.eduform_id,
      calc_timenorm: this.state.data.timenorm_id,
      calc_studnorm: this.state.data.studnorm_id,
      date: this.state.data.date
    };
    fetch('/service/create', {
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({CalcService})
    })
    .then(response => response.json())
    .then(json => {
      if(json.code === 200) {
        /* передаем услугу в родительское состояние */
        this.props.update(json.service);
        /* сбрасываем состояние на дефолтное */
        this.setState(this.initialState);
      } else {
        this.setState({ serverError: true });
      }
    })
    .catch(err => {
      this.setState({
        clientError: true,
        error: err
      });
    });
  }

  /* метод обработки отправки формы */
  handleSubmition = () => {
    if(this.fieldsValidation()) {
      this.sendData();
    } else {
      return false;
    }
  }

  /* метод обрабатывает изменения в поле даты */
  handleDate = (value, formattedValue) => {
    let data = { ...this.state.data };
    data.date = formattedValue;

    this.setState({
      rawDate: value,
      data
    });
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
              <div className={ this.state.validation.date }>
                <DatePicker 
                  value={ this.state.rawDate }
                  onChange={ this.handleDate }
                  dateFormat='DD/MM/YYYY'
                  dayLabels={ ['вс','пн','вт','ср','чт','пт','сб'] }
                  weekStartsOn={1}
                />
              </div>
              <Input
                options={{ 
                  placeholder: 'Введите название...', 
                  term: this.state.data.name, 
                  name: 'name',
                  validation: this.state.validation.name
                  }}
                update={ this.updateState }
              />
              <Select
                options={{ 
                  term: this.state.data.type_id,
                  name: 'type_id',
                  validation: this.state.validation.type_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.types }
                
              />
              <Select
                options={{ 
                  term: this.state.data.eduage_id,
                  name: 'eduage_id',
                  validation: this.state.validation.eduage_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.eduages }
              />
              <Select
                options={{
                  term: this.state.data.language_id,
                  name: 'language_id',
                  validation: this.state.validation.language_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.languages }
              />
              <Select
                options={{
                  term: this.state.data.eduform_id,
                  name: 'eduform_id',
                  validation: this.state.validation.eduform_id
                }}
                update={this.updateState}
                filter={this.props.filters.eduforms}
              />
              <Select
                options={{
                  term: this.state.data.timenorm_id,
                  name: 'timenorm_id',
                  validation: this.state.validation.timenorm_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.timenorms }
              />
              <Select
                options={{
                  term: this.state.data.city_id,
                  name: 'city_id',
                  validation: this.state.validation.city_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.cities }
              />
              <Select
                options={{
                  term: this.state.data.studnorm_id,
                  name: 'studnorm_id',
                  validation: this.state.validation.studnorm_id
                }}
                update={ this.updateState }
                filter={ this.props.filters.studnorms }
              />
              { this.state.serverError ?
                <div className="alert alert-danger"><b>Ошибка сервера!</b> Неудалось добавить услугу.</div>
                : ''
              }
              { this.state.clientError ?
                <div className="alert alert-danger"><b>Ошибка приложения!</b> Неудалось добавить услугу.</div>
                : ''
              }
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
  update: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired
}

export default Modal;