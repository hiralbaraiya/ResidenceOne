import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';
import FaWheelChair from 'react-icons/lib/fa/wheelchair'
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import Model from '../components/Model';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification'
import Table from '../components/Table';
import { getUserList } from '../Api/ResidenceApi';
import { updateUser } from '../Api/ResidenceApi';
import 'react-toastify/dist/ReactToastify.css';

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
      notify: false,
      modal: false
    };

    this.container = {}
    this.toggleRow = this.toggleRow.bind(this);

    this.column = [
      {
        sortable: false,
        width: 40,
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
        Cell: ({ original }) => {
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
        width: 100,
        Cell: row => {
          return (
            <img className='image' src={`${this.state.image}${row.value}`} height="10px" width="10px" onError={(e) => e.target.src = `${this.state.image}default-user.png`}></img>
          )
        }
      },
      {
        sortable: false,
        Header: 'status',
        width: 50,
        accessor: 'isHandicapped',
        Cell: (row) => {
          return (row.value === 1 ? <div className='icons'><FaWheelChair style={{ 'fill': 'red' }} className='iconr' /></div> : <></>)
        }
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
        accessor: 'email',
        Cell: (row) => {
          return (
            <a href={`mailto:${row.value}?subject=Mail from Our Site`}>{row.value}</a>
          )
        }
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
                , row.original.family === null ? '' : <Button color='link'>go to family</Button>
              ]} />
          )
        }
      }
    ]
  }

  toggleRow(firstName) {
    const newSelected = { ...this.state.selected };
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
      getUserList(`updateStatus/${id}/${status === '1' ? 0 : 1}`)
        .then((result) => {
          (!result.error) ?
            this.getdata(status === '1' ? true : false) :
            this.setState({ apierror: true })
        })
    }
  }


  markhandicap(id, status, index) {
    if (window.confirm("Are you sure you want to change handicapped status forMARTIN ?")) {
      updateUser(`updateisHandicapped/${status === 1 ? 0 : 1}`, { 'userId': id })
        .then((response) => {
          let obj = [...this.state.data];
          obj[index].isHandicapped = status === 1 ? 0 : 1
          this.setState({ data: obj })
        })
    }
  }

  getdata = (status) => {
    console.log('cont', this.container)
    let url = `list?page=${this.state.page}&limit=${this.state.pagesize}&${this.state.filterurl}status=${status}&${this.state.sorturl}`
    getUserList(url)
      .then((result) => {
        (!result.error) ?
          this.setState({ data: result.response.data.data, image: result.response.data.imagePath, totalpage: Math.ceil(result.response.data.totalRecords / this.state.pagesize) })
          : this.setState({ apierror: true })
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

  togglemodal() {
    this.setState({ modal: !this.state.modal });
  }

  notify() {
    if (this.state.selectAll === 0) {
      alert('select atleast one')
    }
    else {
      this.setState({ notify: !this.state.notify })
      let string='';
      let data=this.state.selected
      console.log(data)
      Object.keys(data).map((name)=>{
        for(let i=0;i<20;i++){
        if(this.state.data[i].firstName===name){
          string=`${string}${this.state.data[i].email},`
          break;
        }
        }
      })
      this.setState({link:string})
      console.log(string)
    }
    
  }

  handelchange = (e, id, status) => {
    console.log('handelchange')
    let obj = {};
    obj[id] = e
    this.setState(obj, () => { this.getdata(status) })
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
        <h3 className='header'>Users</h3>
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
            <Button color='link' onClick={() => this.notify()}>Send notification</Button>
              ,
             /* 'Pre-prepared notification',
    'Help'*/]} />
          <Model modal={this.state.modal} toggle={() => { this.togglemodal() }}
            setdata={(e, id) => { this.setdata(e, id) }}
          />
          <Notification isOpen={this.state.notify} toggle={() => { this.notify() }} email={this.state.link} />
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Table
                  column={this.column}
                  handelchange={this.handelchange}
                  data={this.state.data}
                  getdata={this.getdata}
                  status={true}
                  totalpage={this.state.totalpage}
                  page={this.state.page}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Table
                  column={this.column}
                  handelchange={this.handelchange}
                  data={this.state.data}
                  getdata={this.getdata}
                  status={false}
                  totalpage={this.state.totalpage}
                  page={this.state.page}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}