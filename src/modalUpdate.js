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
          id: '',
          data: {
            date: '',
            name: '',
            city_id: '',
            studnorm_id: ''
          },
          validation: {
            date: 'form-group',
            name: 'form-group',
            city_id: 'form-group',
            studnorm_id: 'form-group',
          },
          serverError: false,
          errorCode: '',
          errorMessage: '',
          clientError: false,
          error: ''
        };
        this.initialState = { ...this.state };
    }

    componentWillReceiveProps = (nextProps) => {
      let data = {
        name: nextProps.data.name,
        city_id: nextProps.data.city_id,
        studnorm_id: nextProps.data.studnorm_id,
        date: nextProps.data.date,
      };

      this.setState({
        id: nextProps.data.id,
        data: data,
        rawDate: nextProps.data.date !== '' ? new Date(nextProps.data.date).toISOString() : ''
      });
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
    fetch('/service/update', {
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.data.name,
        calc_city: this.state.data.city_id,
        calc_studnorm: this.state.data.studnorm_id,
        date: this.state.data.date
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.code === 200) {
        /* передаем услугу в родительское состояние */
        this.props.showAlert(json.code, json.message);
        this.props.update(json.id, '#update-service-modal');
        /* сбрасываем состояние на дефолтное */
        this.setState(this.initialState);
      } else {
        this.setState({
          serverError: true,
          errorCode: json.code,
          errorMessage: json.message
        });
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
        id="update-service-modal"
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
                Обновить услугу #{ this.state.id }
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
                <div className="alert alert-danger"><b>{ this.state.errorCode }</b> { this.state.errorMessage }</div>
                : ''
              }
              { this.state.clientError ?
                <div className="alert alert-danger"><b>Ошибка приложения!</b> Неудалось добавить услугу.</div>
                : ''
              }
              <div className="form-group text-right">
                <button className="btn btn-primary" onClick={this.handleSubmition}>
                  Обновить
                </button>
              </div>
              { this.props.history.length > 0 ?
                this.props.history.map(item => 
                  <div className="well small" key={ item.id } style={{ padding: '10px', marginBottom: '10px' }}>
                    Дата изменения: { item.date }<br />
                    Предыдущее значение: { item.value } р.<br />
                    Кем изменено: { item.user }
                  </div>
                )
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
}

/* проверяем props */
Modal.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  showAlert: PropTypes.func.isRequired
}

export default Modal;