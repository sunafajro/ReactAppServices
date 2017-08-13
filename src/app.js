import React from 'react';
import Table from './table';
import Input from './input';
import Select from './select';
import Modal from './modal';
import Filter from './filter';

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
    showCreateButton: false,
    error: false
  };

  emtyFilter = { ...this.state.filter };

  componentDidMount = () => {
    this.setState({ inProgress: true });
    fetch('/service/getservices',
    { 
      method: 'POST',
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
        inProgress: false,
        showCreateButton: json.showCreateButton
      });
    })
    .catch(err => {
      this.setState({ error: true });
    });
  }

  /** 
   * метод обновляет значения фильтров
   * @param {string} key
   * @param {number} value
   */
  updateFilter = (key, value) => {    
    let filter = { ...this.state.filter };
    filter[key] = value;

    this.setState({
      filter
    });    
  }

  /* метод применяет фильтрацию на данные таблицы */
  applyFilter = () => {
    let filteredData = [ ...this.state.data ];
    let filter = { ...this.state.filter };

    ['id', 'city_id', 'type_id', 'language_id', 'eduage_id', 'eduform_id'].forEach(item => {
      let filterValue = filter[item];
      if (filterValue) {
        filteredData = filteredData.filter(row => {
          return row[item].includes(filter[item] !== 'all' ? filter[item] : '' );
        });
      }
    });

    this.setState({
      filteredData
    }); 
  }

  /* метод сбрасывает значения фильтров */
  resetFilter = () => {
    this.setState({
      filter: { ...this.emtyFilter },
      filteredData: [ ...this.state.data ]
    });
  }

  /** 
   * метод принимает объект с новой услугой и пропихивает ее в исходный массив услуг
   * @param {object} service
   */
  updateData = (service) => {
    let data = [ ...this.state.data ];
    let id = service.id;
    data.push(service);
    this.setState({ data });
    this.updateFilter('id', id);
    this.applyFilter();
    this.hideModal();
  }

  /* метод открывает модальное окно */
  showModal = () => {
    $('#service-modal').modal('show');
  }

  /* метод закрывает модальное окно */
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
            { this.state.showCreateButton ?
              <h4>Действия</h4>
              :
              '' 
            }
            { this.state.showCreateButton ? 
              <button className="btn btn-success btn-sm btn-block" onClick={ this.showModal }><i className="fa fa-plus" aria-hidden="true"></i> Добавить</button>
              :
              ''
            }
            <h4>Фильтры</h4>
            <Input
              options={{
              placeholder: 'Введите id...',
              term: this.state.filter.id,
              name: 'id',
              validation: 'form-group'
              }}
              update={ this.updateFilter }
            />
            <Select
              options={{
                term: this.state.filter.city_id,
                name: 'city_id',
                validation: 'form-group'
              }}
              update={ this.updateFilter }
              filter={ this.state.filters.cities }
            />
            <Select
              options={{
                term: this.state.filter.type_id,
                name: 'type_id',
                validation: 'form-group'
              }}
              update={ this.updateFilter }
              filter={ this.state.filters.types }
            />
            <Select
              options={{
                term: this.state.filter.language_id,
                name: 'language_id',
                validation: 'form-group'
              }}
              update={ this.updateFilter }
              filter={ this.state.filters.languages }
            />
            <Select
              options={{
                term: this.state.filter.eduage_id,
                name: 'eduage_id',
                validation: 'form-group'
              }}
              update={ this.updateFilter }
              filter={ this.state.filters.eduages }
            />
            <Select
              options={{
                term: this.state.filter.eduform_id,
                name: 'eduform_id',
                validation: 'form-group'
              }}
              update={ this.updateFilter }
              filter={ this.state.filters.eduforms }
            />
            <Filter apply={this.applyFilter} reset={this.resetFilter} />
          </div>
          <div id="content" className="col-sm-10">
              <Table data={ this.state.filteredData } header={ this.state.header } />
          </div>
          <Modal filters={ this.state.filters } update={ this.updateData } />
          </div>
      }
      </div>
    );
  }
}

export default App;
