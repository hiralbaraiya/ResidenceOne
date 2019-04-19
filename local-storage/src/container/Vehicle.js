import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Row,Col} from 'reactstrap';
import { getVehicleList } from '../Api/ResidenceApi';

export default class User extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        image: '',
        pagesize: 20,
        totalpage: 0,
        page: 1,
      };

      this.column=[
          {
              Header:'Number plate',
              accessor:'numberPlate'
          },
          {
            Header:'Brand',
            accessor:'brand'
        },
        {
            Header:'Model',
            accessor:'model'
        },
        {
            Header:'Color',
            accessor:'color'
        },
        {
            Header:'Main driver',
            accessor:'user.fullName'
        },
        {
            Header:'Active on',
            accessor:'lastMarkedActive'
        },
       
      ]

    }
    getdata = () => {
        console.log('cont', this.container)
        let url = `list?page=${this.state.page}&limit=${this.state.pagesize}`
        getVehicleList(url)
          .then((result) => {
            (!result.error) ?
              this.setState({ data: result.response.data.data, image: result.response.data.imagePath, totalpage: Math.ceil(result.response.data.totalRecords / this.state.pagesize) })
              : this.setState({ apierror: true })
          })
      }
    
      componentWillMount() {
        this.getdata();
      }
    
      handelchange = (e, id) => {
        console.log('handelchange')
        let obj = {};
        obj[id] = e
        this.setState(obj, () => { this.getdata() })
      }
    

  render() {
    console.log('prop:', this.props)
    return (
      <div className='table-sc'>
        <h3 className='header'>Vehicles</h3>
        <Row>
              <Col sm="12">
        <ReactTable
        manual
        data={this.state.data}
        columns={this.column}
        pages={this.state.totalpage}
        page={this.state.page - 1}
        
        onPageSizeChange={(p) => {
          this.handelchange(p,'pagesize')
        }}
        onPageChange={(index) => {
          this.handelchange(index+1,'page',)
        }}
        className='-striped -highlight'
      />
       </Col></Row>      
      </div>
    );
  }
    }