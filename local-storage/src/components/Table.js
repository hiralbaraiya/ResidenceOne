import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      image: '',
      pagesize: 20,
      totalpage: 0,
      page: 1,
      name: '',
      filterurl: '',
      sorturl: '',
    }
  }

  getdata = (status) => {
    this.props.getdata(status)
  }

  filter(e, status) {
    console.log(e)
    let url = ''
    let id = ''
    e ?
      e.map((list) => {
        if (list.id === 'fullName') { id = 'name' }
        else { id = list.id }
        url = `${url}${id}=${list.value}&`
        return null
      })
      :
      console.log(null)
    this.props.handelchange(url, 'filterurl', status)

  }

  Sort(e, status) {
    console.log(e)
    let id = ''
    if (e[0].id === 'fullName') { id = 'name' }
    else { id = e[0].id }
    let url = `field=${id}&sort=${e[0].desc ? 'desc' : 'asc'}`
    this.props.handelchange(url, 'sorturl', status)

  }

  render() {
    return (
      <ReactTable
        manual
        data={this.props.data}
        columns={this.props.column}
        onFilteredChange={(e) => this.filter(e, this.props.status)}
        onSortedChange={e => { this.Sort(e, this.props.status) }}
        pages={this.props.totalpage}
        page={this.props.page - 1}
        
        onPageSizeChange={(p) => {
          this.props.handelchange(p,'pagesize', this.props.status)
        }}
        onPageChange={(index) => {
          this.props.handelchange(index+1,'page', this.props.status)
        }}
        className='-striped -highlight'
      />
    )
  }
}

export default Table;