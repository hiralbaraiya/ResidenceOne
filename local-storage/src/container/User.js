import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col ,Input} from 'reactstrap';
import classnames from 'classnames';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Axios from 'axios';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import {Dropdown} from '../components/Dropdown'

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      data: [],
      image: '',
      pagesize: 20,
      totalpage: 0,
      page: 1,
      name:'',
      filterurl:'',
      sorturl:''
    };

    this.column = [
      {
        Header: () => {
          return (<input type='checkbox'></input>)
        },
        Cell: () => {
          return (<input type='checkbox'></input>)
        }
      },
      {
        filterable: true,
        Header: 'Name',
        accessor: 'fullName',
      
      },
      {
        sortable:false,
        Header: 'profile picture',
        accessor: 'picture',
        Cell: row => {
          return (
            <img src={`${this.state.image}${row.value}`} alt="user" height="15" width="15"></img>
          )
        }
      },
      {
        sortable:false,
        Header: 'status',
        accessor: 'status'
      },
      {
        sortable:false,
        Header: 'main unit id',
      },
      {
        filterable: true,
        Header: 'Position',
        accessor: 'personStatus'
      },
      {
        sortable:false,
        Header: 'bulding'
      },
      {
        sortable:false,
        Header: 'Type of unit'
      },
      {
        sortable:false,
        Header: 'Entry'
      },
      {
        filterable: true,
        Header: 'Email',
        accessor: 'email'
      },
      {
        sortable:false,
        Header: 'Date of birth',
      },
      {
        filterable: true,
        Header: 'Mobile number',
        accessor: 'telephone'
      },

    ]
  }

  getdata = (status) => {
    let token = localStorage.getItem('token');
    Axios.get(`http://localhost:8080/api/user/list?page=${this.state.page}&limit=${this.state.pagesize}&${this.state.filterurl}status=${status}&${this.state.sorturl}`,
      { headers: { 'token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ data: response.data.data, image: response.data.imagePath, totalpage: Math.ceil(response.data.totalRecords / this.state.pagesize) })
      })
      .catch((e) => {
        console.log(e)
      })
  }
  
  componentWillMount() {
    this.getdata(true);
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      let status = (this.state.activeTab !== '1') ? true : false;
      this.getdata(status,'')
      this.setState({ activeTab: tab, page: 1,sorturl:'',filterurl:'' })
    }
  }

  filter(e,status){
    console.log(e)
    let url=''
    let id=''
    e?
    e.map((list)=>{
     if(list.id==='fullName'){id='name'}
     else{id=list.id}
      url=`${url}${id}=${list.value}&`
      console.log(url)
    })
    :
    console.log(null)
    this.setState({filterurl:url},()=>{this.getdata(status)}) 
  }

 Sort(e,status){
   console.log(e)
   let id=''
   if(e[0].id==='fullName'){id='name'}
   else{id=e[0].id}
   let url=`field=${id}&sort=${e[0].desc?'desc':'asc'}`
   this.setState({sorturl:url},()=>{this.getdata(status)}) 
 }

  render() {
    console.log('prop:',this.props)
    return (
      <div className='table-sc'>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Active
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Inactive
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <Dropdown className='drop' style={{margin:0}} icon={<Faellips/>} list={['Add new user','Send notification','Pre-prepared notification','Help']}/>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ReactTable
                  manual
                  onFilteredChange={(e)=>this.filter(e,true)}
                  onSortedChange={e=>{this.Sort(e,true)}}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  onPageSizeChange={(p) => {
                    this.setState({ pagesize: p },()=>{this.getdata(false)})
                  }}
                  onPageChange={(index) => { this.setState({ page: index + 1 }, () => { this.getdata(true,'') }) }}
                  className='-striped -highlight'
                  data={this.state.data}
                  columns={this.column}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <ReactTable
                  manual
                  data={this.state.data}
                  columns={this.column}
                  onFilteredChange={(e)=>this.filter(e,false)}
                  onSortedChange={e=>{this.Sort(e,false)}}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  onPageSizeChange={(p) => {
                    this.setState({ pagesize: p },()=>{this.getdata(false)})
                  }}
                  onPageChange={(index) => { this.setState({ page: index + 1 }, () => { this.getdata(false) }) }}
                  className='-striped -highlight'
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        </div>
    );
  }
}