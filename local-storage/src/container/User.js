import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Axios from 'axios';


export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      data: [] ,
      pagesize:20
    };
    this.column = [
        {
          Header: 'Name',
          accessor: 'fullName'
        },
        {
          Header:'profile picture',
          accessor:'picture'
        },
        {
          Header:'status',
          accessor:'status'
        },
        {
          Header:'main unit id'
        },
        {
          Header: 'Position',
          accessor: 'personStatus'
        },
        {
          Header:'bulding'
        },
        {
          Header:'Type of unit'
        },
        {
          Header:'Entry'
        },
        {
          Header:'Email',
          accesor:'email'
        },
        {
          Header:'Date of birth',
        },
        {
          Header: 'Mobile number',
          accessor: 'telephone'
        },
       
    ]
  }
  getdata=(status)=>{
    let token = localStorage.getItem('token');
    console.log(token)
    Axios.get(`http://localhost:3000/api/user/list?page=1&limit=${this.state.pagesize}&status=${status}&`, { headers: { 'token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ data: response.data.data })
      })
      .catch((e) => {
        console.log(e)
      })
  }
  componentDidUpdate(prevprops,prevstate){
    if(this.state.pagesize!==prevprops.pagesize){
      this.getdata(true);
    }
  }
  componentWillMount() {
   this.getdata(true);
  }
  toggle=(tab)=> {
    if (this.state.activeTab !== tab) {
        let status=(this.state.activeTab!=='1')?true:false;
       this.getdata(status)
       this.setState({activeTab: tab })
    }
  }
  render() {
      let styleobj={background:'gray'}
    return (
      <div className='user'>
        <h3 >User</h3>
        <hr></hr>
        <Nav tabs style={styleobj}>
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
        onPageSizeChange={(p)=>{
          this.setState({pagesize:p})
        }}
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
        onPageSizeChange={(p)=>{
          this.setState({pagesize:p})
        }}
        className='-striped -highlight'
          data={this.state.data}
          columns={this.column}
        />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
