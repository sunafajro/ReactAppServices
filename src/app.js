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
    counts: {
      start: 0,
      end: 0,
      total: 0
    },
    formElements: {},
    filteredData: [],
    inProgress: false,
    isFetchingData: false,
    showCreateButton: false,
    currentPage: 1,
    error: false
  };
  /* делаем дефолтную копию пустого фильтра */
  emptyFilter = { ...this.state.filter };

  componentDidMount = () => {
    this.getInitialData();
  }

  /* получаем первоначальные данны */
  getInitialData = () => {
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
        counts: json.dataRange,
        showCreateButton: json.showCreateButton
      });
    })
    .catch(err => {
      this.setState({ error: true });
    });
  }

  /* метод увеличивает счетчик текущей страницы и вызывает метод обновления данных */
  nextPage = () => {
    const currentPage = this.state.currentPage + 1;
    this.applyFilter(currentPage, { ...this.state.filter });
  }

  /* метод уменьшает счетчик текущей страницы и вызывает метод обновления данных */
  previousPage = () => {
    const currentPage = this.state.currentPage - 1;
    this.applyFilter(currentPage, { ...this.state.filter });
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
  applyFilter = (num = 1, filters = { ...this.emptyFilter }) => {
    this.setState({ isFetchingData: true });

    const Filter = {
      page: num,
      filters: {
        id: filters.id !== '' ? filters.id : '0',
        city: filters.city_id !== '' ? filters.city_id : '0',
        type: filters.type_id !== '' ? filters.type_id : '0',
        lang: filters.language_id !== '' ? filters.language_id : '0',
        age: filters.eduage_id !== '' ? filters.eduage_id : '0',
        form: filters.eduform_id !== '' ? filters.eduform_id : '0'
      }
    };

    fetch('/service/getservices',
    { 
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Filter})
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        data: json.tableData,
        filteredData: json.tableData,
        isFetchingData: false,
        counts: json.dataRange,
        currentPage: num
      });
    })
    .catch(err => {
      this.setState({ error: true });
    });
  }

  /* обработчик кнопок Применить и Сбросить */
  handleBtnClick = (action = 'reset') => {
    /* проверяем что фильтр задан */
    let filterNotEmpty = false;
    Object.keys(this.state.filter).forEach(item => {
      if (this.state.filter[item] !== '') {
        filterNotEmpty = true;
      }
    });
    if (filterNotEmpty) {
      /* метод сбрасывает значения фильтров и перезапрашивает исходные данные */
      if (action === 'reset') {
        this.resetFilter();
        /* применяем фильтр */
        this.applyFilter(1, { ...this.emptyFilter });
      } else {
        /* применяем фильтр */
        this.applyFilter(1, { ...this.state.filter });
      }
    } 
  }

  resetFilter = () => {
    this.setState({
      filter: { ...this.emptyFilter }
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
            <Filter click={this.handleBtnClick} />
          </div>
          <div id="content" className="col-sm-10">
            { this.state.isFetchingData ?
              <div className="alert alert-warning"><b>Подождите.</b> Идет загрузка данных...</div>
              :
              <Table
                data={ this.state.filteredData }
                header={ this.state.header }
                counts={ this.state.counts }
                next={ this.nextPage }
                previous={ this.previousPage }
                page={ this.state.currentPage }
              />
            }
          </div>
          <Modal filters={ this.state.filters } update={ this.updateData } />
          </div>
      }
      </div>
    );
  }
}

export default App;
