import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import ReactTable from 'react-table';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import { getFamily } from '../Api/ResidenceApi'

class Family extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      data: [],
      image: '',
      pagesize: 20,
      totalpage: 0,
      page: 1,
      name: '',
      filterurl: '',
      sorturl: '',
    }
    this.getdata=this.getdata.bind(this)
    this.getfamily=this.getfamily.bind(this)
    this.column = [
      // {
      //   sortable: false,
      //   Header: () => {
      //     return (<input type='checkbox'
      //       checked={this.state.selectAll === 1}
      //       ref={input => {
      //         if (input) {
      //           input.indeterminate = this.state.selectAll === 2;
      //         }
      //       }}
      //       onChange={() => this.toggleSelectAll()}
      //     />)
      //   },
      //   Cell: ({ original }) => {
      //     return (<input type='checkbox'
      //       checked={this.state.selected[original.firstName] === true}
      //       onChange={() => this.toggleRow(original.firstName)}
      //     />)
      //   }
      // },


      {
        filterable: true,
        Header: 'Name',
        accessor: 'name',
        Cell: (row) => {
          return (<Link to={`family/${row.original.id}`}>{row.value}</Link>)
        }
      },
      {
        filterable: true,
        Header: 'Main person',
        accessor: 'mainPerson.fullName',
        Cell: (row) => {
          return (<Link to={`users/${row.original.mainPersonId}`}>{row.value}</Link>)
        }
      },
      {
        filterable: true,
        Header: 'Mobile number',
        accessor: 'mainPerson.telephone'
      },
      {
        filterable: true,
        Header: 'Owner/Renter',
        accessor: 'mainPerson.personStatus'
      },
      {
        filterable: true,
        Header: 'Main unit',
        accessor: 'families_units[0].unit.officialId',
        Cell:row=>{
          return(
            <Link to={`units-profile/${row.original.mainPersonId}`}>{row.value}</Link>
          )
        }
      },
      {
        filterable: true,
        Header: 'Building',
        accessor: 'families_units[0].unit.building.name'
      },
      {
        filterable: true,
        Header: 'Shares',
        accessor: 'families_units[0].unit.shares'
      },
      {
        sortable: false,
        Header: '',
        minWidth: 40,
        style: { 'overflow': 'visible','padding':'0px' },
        accessor: 'id',
        Cell: row => {
          return (
            <Dropdown
              icon={<Faellips />}
              list={[<Link to={`users/${row.original.mainPersonId}`}>Go to main person's profile</Link>,
              // <Button color='link'>{row.original.status === '1' ? <p>Mark as Inactive</p> : <p>mark as Active</p>}</Button>
              //   , <Button color='link'>Send notification</Button>,
              //   <Button color='link'>Help</Button>
              ]} />
          )
        }
      }

    ]
  }

  getdata (status) {
    
    let url = `list?page=${this.state.page}&limit=${this.state.pagesize}&${this.state.filterurl}status=${status}&${this.state.sorturl}`
    getFamily(url)
      .then((result) => {
        
        (!result.error) ?
          this.setState({ data: result.response.data.data, image: result.response.data.imagePath, totalpage: Math.ceil(result.response.data.totalRecords / this.state.pagesize) })
          : this.setState({ apierror: true })
      })
  }

  getfamily(row,index){
    let obj={}
    obj[index[0]]={}
    if(row[index[0]]===false){obj[index[0]]=false}
    else{
      let url=`getResidents/${this.state.data[index].id}?&showAllRecords=1&doNotShowMainPerson=1`
      getFamily(url)
      .then((result) => {
          console.log(result.response.data)
          this.setState({ familydata: result.response.data.data.users})
         
      })
    }
    this.setState({expanded:obj})
  }

  componentWillMount() {
    this.getdata(true);
  }
  handelchange = (e, id, status) => {
    console.log('handelchange')
    let obj = {};
    obj[id] = e
    this.setState(obj, () => { this.getdata(status) })
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
    this.handelchange(url, 'filterurl', status)

  }

  Sort(e, status) {
    console.log(e)
    let id = ''
    if (e[0].id === 'fullName') { id = 'name' }
    else { id = e[0].id }
    let url = `field=${id}&sort=${e[0].desc ? 'desc' : 'asc'}`
    this.handelchange(url, 'sorturl', status)

  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      let status = (this.state.activeTab !== '1') ? true : false;
      this.getdata(status)
      this.setState({ activeTab: tab, page: 1, sorturl: '', filterurl: '' })
    }  
  }

  render() {
    return (
      <div className='table-sc'>
        <h3 className='header'>Families</h3>
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
                  data={this.state.data}
                  columns={this.column}
                  onFilteredChange={(e) => this.filter(e,true)}
                  onSortedChange={e => { this.Sort(e,true) }}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  expanded={this.state.expanded}
                  onExpandedChange={(row,index,event)=>this.getfamily(row,index,event)}
                  SubComponent={(row)=>{return(
                    <ReactTable
                    
                    minRows={0}
                    data={this.state.familydata}
                    showPagination={false}
                    columns={[
                      {
                        
                        accessor:'fullName'
                      },
                      {
                        
                        accessor:'email'
                      },
                      {
                      
                        accessor:'telephone'
                      }
                    ]}
                    
                    />
                  )}}
                  onPageSizeChange={(p) => {
                    this.handelchange(p, 'pagesize', true)
                  }}
                  onPageChange={(index) => {
                    this.handelchange(index + 1, 'page', true)
                  }}
                  className='-striped -highlight'
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
                  onFilteredChange={(e) => this.filter(e,false)}
                  onSortedChange={e => { this.Sort(e,false) }}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  expanded={this.state.expanded}
                  onExpandedChange={(row,index,event)=>this.getfamily(row,index,event)}
                  SubComponent={(row)=>{return(
                    <ReactTable                   
                    minRows={0}
                    data={this.state.familydata}
                    showPagination={false}
                    columns={[
                      {
                        
                        accessor:'fullName'
                      },
                      {
                        
                        accessor:'email'
                      },
                      {
                      
                        accessor:'telephone'
                      }
                    ]}
                    
                    />
                  )}}
                  onPageSizeChange={(p) => {
                    this.handelchange(p, 'pagesize', false)
                  }}
                  onPageChange={(index) => {
                    this.handelchange(index + 1, 'page', false)
                  }}
                  className='-striped -highlight'
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default Family