import React from 'react';
import PropTypes from 'prop-types';
import Table from './table';
import Input from './input';
import Select from './select';
import Modal from './modal';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      filter: {
          id: '',
          city_id: '',
          type_id: '',
          language_id: '',
          eduage_id: '',
          eduform_id: ''
      },
      formElements: {},
      header: this.props.header,
      filteredData: [],
      error: false
    };

  }

  componentDidMount = () => {
    this.setState({ filteredData: this.state.data });
  }

  updateState = (key, value) => {
    let filteredItems = this.state.data;
    let newFilter = {...this.state.filter};

    newFilter[key] = value;

    ['id', 'city_id', 'type_id', 'language_id', 'eduage_id', 'eduform_id'].forEach(item => {
      let filterValue = newFilter[item];
      if (filterValue) {
        filteredItems = filteredItems.filter(row => {
          return row[item].includes(newFilter[item] !== 'all' ? newFilter[item] : '' );
        });
      }
    });

    this.setState({
      filter: newFilter,
      filteredData: filteredItems
    });
    
  }

  showModal = () => {
    // fetch('http://localhost:8000/service/create',
    // { 
    //   include: 'credentials'
    // })
    // .then((response) => response.json())
    // .then(json => {
    //   this.setState({ formElements: JSON.parse(json) });
    // })
    // .catch(err => {
    //   this.setState({ error: true });
    // });

    $('#service-modal').modal('show');
  }

  render() {
    return (
      <div>
        <div id="sidebar" className="col-sm-2">
          <h4>Действия</h4>
          <button className="btn btn-success btn-sm btn-block" onClick={this.showModal}><i className="fa fa-plus" aria-hidden="true"></i> Добавить</button>
          <h4>Фильтры</h4>
          <Input
            options={{
            placeholder: 'Введите id...',
            term: this.state.filter.id,
            name: 'id',
            validation: 'form-group'
            }}
            update={ this.updateState }
          />
          <Select
            options={{
              term: this.state.filter.city_id,
              name: 'city_id',
              validation: 'form-group'
            }}
            update={ this.updateState }
            filter={ this.props.filters.cities }
          />
          <Select
            options={{
              term: this.state.filter.type_id,
              name: 'type_id',
              validation: 'form-group'
            }}
            update={ this.updateState }
            filter={ this.props.filters.types }
          />
          <Select
            options={{
              term: this.state.filter.language_id,
              name: 'language_id',
              validation: 'form-group'
            }}
            update={ this.updateState }
            filter={ this.props.filters.languages }
          />
          <Select
            options={{
              term: this.state.filter.eduage_id,
              name: 'eduage_id',
              validation: 'form-group'
            }}
            update={ this.updateState }
            filter={ this.props.filters.eduages }
          />
          <Select
            options={{
              term: this.state.filter.eduform_id,
              name: 'eduform_id',
              validation: 'form-group'
            }}
            update={ this.updateState }
            filter={ this.props.filters.eduforms }
          />
        </div>
        <div id="content" className="col-sm-10">
          <Table data={ this.state.filteredData } header={ this.state.header } />
        </div>
        <Modal filters={ this.props.filters } />
      </div>
    );
  }
}

/* проверяем props */
App.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired
}

export default App;
