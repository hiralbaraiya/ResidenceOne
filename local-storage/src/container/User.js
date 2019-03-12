import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Axios from 'axios';


export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      data: [],
      image: '',
      pagesize: 20,
      totalpage: 0,
      page: 1
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
        accessor: 'fullName'
      },
      {
        Header: 'profile picture',
        accessor: 'picture',
        Cell: row => {
          return (
            <img src={`${this.state.image}${row.value}`} alt="user" height="15" width="15"></img>
          )
        }
      },
      {
        Header: 'status',
        accessor: 'status'
      },
      {
        Header: 'main unit id'
      },
      {
        Header: 'Position',
        accessor: 'personStatus'
      },
      {
        Header: 'bulding'
      },
      {
        Header: 'Type of unit'
      },
      {
        Header: 'Entry'
      },
      {
        Header: 'Email',
        accesor: 'email'
      },
      {
        Header: 'Date of birth',
      },
      {
        Header: 'Mobile number',
        accessor: 'telephone'
      },

    ]
  }
  getdata = (status) => {
    let token = localStorage.getItem('token');
    Axios.get(`http://localhost:8080/api/user/list?page=${this.state.page}&limit=${this.state.pagesize}&status=${status}&`,
      { headers: { 'token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ data: response.data.data, image: response.data.imagePath, totalpage: Math.ceil(response.data.totalRecords / this.state.pagesize) })
      })
      .catch((e) => {
        console.log(e)
      })
  }
  componentDidUpdate(prevprops, prevstate) {
    if (this.state.pagesize !== prevstate.pagesize) {
      let status = (this.state.activeTab === '1') ? true : false;
      this.getdata(status);
    }
  }
  componentWillMount() {

    this.getdata(true);
  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      let status = (this.state.activeTab !== '1') ? true : false;
      this.getdata(status)
      this.setState({ activeTab: tab, page: 1 })
    }
  }
  filter(e){
    let data=this.state.data.filter((id)=>{
      return id.fullName.toLowerCase().includes(e[0]?e[0].value:'')
    })
  }
  render() {
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
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ReactTable
                  manual
                  onFilteredChange={ e=>{this.filter(e)}}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  onPageSizeChange={(p) => {
                    this.setState({ pagesize: p })
                  }}
                  onPageChange={(index) => { this.setState({ page: index + 1 }, () => { this.getdata(true) }) }}
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
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  onPageSizeChange={(p) => {
                    this.setState({ pagesize: p })
                  }}
                  onPageChange={(index) => { this.setState({ page: index + 1 }, () => { this.getdata(false) }) }}
                  className='-striped -highlight'
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent></div>

    );
  }
}
