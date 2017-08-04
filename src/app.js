import React from 'react';
import Table from './table';
import Input from './input';
import Select from './select';
import Modal from './modal';

export default class App extends React.Component {

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
            placeholder="Введите id..."
            term={ this.state.filter.id }
            name="id"
            update={ this.updateState }
          />
          <Select
            term={ this.state.filter.city_id }
            update={ this.updateState }
            name="city_id"
            options={ this.props.filters.cities }
          />
          <Select
            term={ this.state.filter.type_id }
            update={ this.updateState }
            name="type_id"
            options={ this.props.filters.types }
          />
          <Select
            term={ this.state.filter.language_id }
            update={ this.updateState }
            name="language_id"
            options={ this.props.filters.languages }
          />
          <Select
            term={ this.state.filter.eduage_id }
            update={ this.updateState }
            name="eduage_id"
            options={ this.props.filters.eduages }
          />
          <Select
            term={ this.state.filter.eduform_id }
            update={ this.updateState }
            name="eduform_id"
            options={ this.props.filters.eduforms }
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