import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Row,Col} from 'reactstrap';
import { getUnitList } from '../Api/ResidenceApi';

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
              Header:'Unit id',
              accessor:'officialId'
          },
          {
            Header:'Section',
            accessor:'section.name'
        },
        {
            Header:'Building',
            accessor:'building.name'
        },
        {
            Header:'Entry',
            accessor:'entry'
        },
        {
            Header:'Level',
            accessor:'level'
        },
        {
            Header:'Location',
            accessor:'location'
        },
        {
            Header:'Shares',
            accessor:'shares'
        },
        {
            Header:'Unit type',
            accessor:'unit_type.type'
        },
        {
            Header:'Format',
            accessor:'unit_type_format'
        },
        {
            Header:'Surface Area',
            accessor:'surfaceArea'
        },
      ]

    }
    getdata = () => {
        console.log('cont', this.container)
        let url = `list?page=${this.state.page}&limit=${this.state.pagesize}`
        getUnitList(url)
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
        <h3 className='header'>Units</h3>
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