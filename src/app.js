import React from 'react';
import Table from './table';
import Input from './input';
import Select from './select';
import Modal from './modal';

class App extends React.Component {

  state = {
    header: [],
    data: [],
    filters: {
      cities: [],
      types: [],
      eduforms: [],
      eduages: [],
      languages: [],
      studnorms: [],
      timenorms: []
    },
    filter: {
        id: '',
        city_id: '',
        type_id: '',
        language_id: '',
        eduage_id: '',
        eduform_id: ''
    },
    formElements: {},
    filteredData: [],
    inProgress: false,
    error: false
  };

  componentDidMount = () => {
    this.setState({ inProgress: true });
    fetch('/service/getservices',
    { 
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ 
        header: json.tableHeader,
        data: json.tableData,
        filters: json.tableFilters,
        filteredData: json.tableData,
        inProgress: false
      });
    })
    .catch(err => {
      this.setState({ error: true });
    });
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
    $('#service-modal').modal('show');
  }

  hideModal = () => {
    $('#service-modal').modal('hide');
  }

  render() {
    return (
      <div>
        { this.state.inProgress ?
          <div className="alert alert-warning"><b>Подождите.</b> Идет загрузка данных...</div>
          :
          <div>
          <div id="sidebar" className="col-sm-2">
            <h4>Действия</h4>
            <button className="btn btn-success btn-sm btn-block" onClick={ this.showModal }><i className="fa fa-plus" aria-hidden="true"></i> Добавить</button>
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
              filter={ this.state.filters.cities }
            />
            <Select
              options={{
                term: this.state.filter.type_id,
                name: 'type_id',
                validation: 'form-group'
              }}
              update={ this.updateState }
              filter={ this.state.filters.types }
            />
            <Select
              options={{
                term: this.state.filter.language_id,
                name: 'language_id',
                validation: 'form-group'
              }}
              update={ this.updateState }
              filter={ this.state.filters.languages }
            />
            <Select
              options={{
                term: this.state.filter.eduage_id,
                name: 'eduage_id',
                validation: 'form-group'
              }}
              update={ this.updateState }
              filter={ this.state.filters.eduages }
            />
            <Select
              options={{
                term: this.state.filter.eduform_id,
                name: 'eduform_id',
                validation: 'form-group'
              }}
              update={ this.updateState }
              filter={ this.state.filters.eduforms }
            />
          </div>
          <div id="content" className="col-sm-10">
              <Table data={ this.state.filteredData } header={ this.state.header } />
          </div>
          <Modal filters={ this.state.filters } close={ this.hideModal } />
          </div>
      }
      </div>
    );
  }
}

export default App;
