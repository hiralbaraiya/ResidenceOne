import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Axios from 'axios';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import Model from '../components/Model';
import { Link } from 'react-router-dom';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
       selectAll: 0,
      activeTab: '1',
      data: [],
      image: '',
      pagesize: 20,
      totalpage: 0,
      page: 1,
      name: '',
      filterurl: '',
      sorturl: '',
      modal: false
    };

    this.toggleRow = this.toggleRow.bind(this);

    this.column = [
      {
        sortable:false,
        Header: () => {
          return (<input type='checkbox'
            checked={this.state.selectAll === 1}
            ref={input => {
              if (input) {
                input.indeterminate = this.state.selectAll === 2;
              }
            }}
            onChange={() => this.toggleSelectAll()}
          />)
        },
        Cell: ({original}) => {
          return (<input type='checkbox'
            checked={this.state.selected[original.firstName] === true}
            onChange={() => this.toggleRow(original.firstName)}
          />)
        }
      },
      {
        filterable: true,
        Header: 'Name',
        accessor: 'fullName',
        Cell: (row) => {
          return (<Link to={`users/${row.original.id}`}>{row.value}</Link>)
        }
      },
      {
        sortable: false,
        Header: 'profile picture',
        accessor: 'picture',
        Cell: row => {
          return (
            <img className='image' src={`${this.state.image}${row.value}`} alt="user" height="15" width="15"></img>
          )
        }
      },
      {
        sortable: false,
        Header: 'status',
        accessor: 'status'
      },
      // {
      //   sortable: false,
      //   Header: 'main unit id',
      // },
      {
        filterable: true,
        Header: 'Position',
        accessor: 'personStatus'
      },
      // {
      //   sortable: false,
      //   Header: 'bulding'
      // },
      // {
      //   sortable: false,
      //   Header: 'Type of unit'
      // },
      // {
      //   sortable: false,
      //   Header: 'Entry'
      // },
      {
        filterable: true,
        Header: 'Email',
        accessor: 'email'
      },
      // {
      //   sortable: false,
      //   Header: 'Date of birth',
      // },
      {
        filterable: true,
        Header: 'Mobile number',
        accessor: 'telephone'
      },
      {
        sortable: false,
        Header: '',
        minWidth: 40,
        style: { 'overflow': 'visible' },
        accessor: 'id',
        Cell: row => {
          return (
            <Dropdown
              icon={<Faellips />}
              list={[<Button color='link' onClick={() => this.markhandicap(row.value, row.original.isHandicapped, row.index)}>{row.original.isHandicapped === 1 ? <p>Mark as Not Handicapped</p> : <p>mark as Handicapped</p>}</Button>,
              <Button color='link' onClick={() => this.edit(row.value, row.original.status, row.index)}>{row.original.status === '1' ? <p>Mark as Inactive</p> : <p>mark as Active</p>}</Button>
              ]} />
          )
        }
      }
    ]
  }

  toggleRow(firstName) {
		const newSelected = {...this.state.selected};
		newSelected[firstName] = !this.state.selected[firstName];
		this.setState({
			selected: newSelected,
			selectAll: 2
		});
	}

	toggleSelectAll() {
		let newSelected = {};

		if (this.state.selectAll === 0) {
			this.state.data.forEach(x => {
				newSelected[x.firstName] = true;
			});
		}

		this.setState({
			selected: newSelected,
			selectAll: this.state.selectAll === 0 ? 1 : 0
		});
	}

  edit(id, status, index) {
    console.log(status)
    if (window.confirm("Are you sure you want to change user status from active to inactive?")) {
      let token = localStorage.getItem('token');
      Axios.get(`http://localhost:8080/api/user/updateStatus/${id}/${status==='1'?0:1}`, { headers: { 'token': token } })
        .then((response) => {
          console.log(response)
          this.getdata(status==='1'?true:false)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
  markhandicap(id, status, index) {
    console.log('adduser')
    if (window.confirm("Are you sure you want to change handicapped status forMARTIN ?")) {
      let token = localStorage.getItem('token');
      Axios.post(`http://localhost:8080/api/user//updateisHandicapped/${status === 1 ? 0 : 1}`,
        { 'userId': id }, { headers: { 'token': token } })

        .then((response) => {
          console.log(response)
          let obj = { ...this.state.data }
          obj[index].isHandicapped = status === 1 ? 0 : 1
          this.setState({ obj })
        })
        .catch((e) => {
          console.log(e)
        })
    }
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
      this.getdata(status, '')
      this.setState({ activeTab: tab, page: 1, sorturl: '', filterurl: '' })
    }
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
        console.log(url)
      })
      :
      console.log(null)
    this.setState({ filterurl: url }, () => { this.getdata(status) })
  }

  Sort(e, status) {
    console.log(e)
    let id = ''
    if (e[0].id === 'fullName') { id = 'name' }
    else { id = e[0].id }
    let url = `field=${id}&sort=${e[0].desc ? 'desc' : 'asc'}`
    this.setState({ sorturl: url }, () => { this.getdata(status) })
  }

  togglemodal() {
    this.setState({ modal: !this.state.modal });
  }

  setdata(e, id) {
    let obj = {};
    obj[id] = e
    this.setState(obj)
  }

  render() {
    console.log('prop:', this.props)
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
          <Dropdown className='drop'
            style={{ margin: 0 }}
            icon={<Faellips />}
            list={[<Button color='link' onClick={() => this.togglemodal()}>Add new user</Button>,
              'Send notification',
              'Pre-prepared notification',
              'Help']} />
          <Model modal={this.state.modal} toggle={() => { this.togglemodal() }}
            setdata={(e, id) => { this.setdata(e, id) }}
          />
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ReactTable
                  manual
                  onFilteredChange={(e) => this.filter(e, true)}
                  onSortedChange={e => { this.Sort(e, true) }}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  onPageSizeChange={(p) => {
                    this.setState({ pagesize: p }, () => { this.getdata(false) })
                  }}
                  onPageChange={(index) => { this.setState({ page: index + 1 }, () => { this.getdata(true, '') }) }}
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
                  onFilteredChange={(e) => this.filter(e, false)}
                  onSortedChange={e => { this.Sort(e, false) }}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  onPageSizeChange={(p) => {
                    this.setState({ pagesize: p }, () => { this.getdata(false) })
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