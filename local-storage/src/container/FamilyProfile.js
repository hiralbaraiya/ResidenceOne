import React, { Component } from 'react';
import { Label, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames';
import ReactTable from "react-table";
import { getFamily ,getPurchase } from '../Api/ResidenceApi';
import FaWheelChair from 'react-icons/lib/fa/wheelchair';
import Dropzone from 'react-dropzone'

class FamilyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      active: '1',
      url: 'getResidents',
    }
    this.column = [{
      Header: 'Name',
      accessor: 'fullName',
      // filterable: true
    },
    {
      Header: 'Profile picture',
      accessor: 'picture',
      Cell: row => {
        return (
          <img className='image' src={`http://localhost:8080/images/lacadenelle13008fr/users/${row.value}`} alt="user" height="15" width="15" onError={(e) => e.target.src = `http://localhost:8080/images/lacadenelle13008fr/users/default-user.png`}></img>
        )
      }
    },
    {
      Header: 'Status',
      width: 50,
      accessor: 'isHandicapped',
      Cell: (row) => {
        return (row.value === 1 ? <div className='icons'><FaWheelChair style={{ 'fill': 'red' }} className='iconr' /></div> : <></>)
      }
    },
    {
      Header: 'Date of birth',
      accessor: 'dateOfBirth'
    },
    {
      Header: 'Email',
      accessor: 'email',

    },
    {
      Header: 'Mobile number',
      accessor: 'telephone'
    },
    {
      Header: 'Active on'
    }
    ]
    this.col = [
      {
        Header: 'Unit id',
        accessor:'unit.officialId'
      },
      {
        Header: 'Building',
        accessor:'unit.building.name'
      },
      {
        Header: 'Entry',
        accessor:'unit.entry'
      },
      {
        Header: 'Shares',
        accessor:'unit.shares'
      },
      {
        Header: 'Unit type',
        accessor:'unit.unit_type_format'
      }
    ]
  }

  componentWillMount() {
    getFamily(`getResidents/${this.props.match.params.id}?page=1&limit=20&status=active`)
      .then((result) => {
        if (!result.error) {
          this.setState({ data: result.response.data.data })
        }
        else {

          this.setState({ apierror: true })
        }
      })
  }

  getdata = (tab) => {
    getFamily(`getResidents/${this.props.match.params.id}?page=1&limit=20&${this.state.url}&status=${tab === '1' ? 'active' : 'inactive'}`)
      .then((result) => {
        if (!result.error) {
          this.setState({ data: result.response.data.data })
        }
        else {
          this.setState({ apierror: true })
        }
      })
  }

  Toggle = (tab) => {
    this.setState({ active: tab }, () => { this.getdata(tab) })
  }

  toggle = (tab, url) => {
    this.setState({ activeTab: tab, active: "1", url: url }, () => { this.getdata('1') })
  }

  render() {
    let { name, mainPerson, users, lastMarkedActive } = this.state.data ? this.state.data : ''
    let { fullName, personStatus } = this.state.data ? mainPerson : ''
    let date = new Date(lastMarkedActive)
    return (
      <div className='familyprofile'>
        <h3 className='header'>Family:{name}</h3>
        <Label>Person responsible:{fullName}</Label>
        <span className={`dot`}></span><Label style={{ 'float': 'right' }}>{personStatus}</Label>
        <br></br><Label style={{ float: 'right' }}>Last marked active on:{this.state.data ? `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` : ''}</Label><br></br><br></br>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1', ''); }}
            >
              Residents
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2', 'personStatus=NR-EXTEND'); }}
            >
              Extended members
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3', 'personStatus=NR-FP'); }}
            >
              Personnel
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4', 'personStatus=NR-TEMP'); }}
            >
              Temporary resident
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Documents
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => {
                this.setState({ activeTab: '6' }, () => {
                  getFamily(`unitList/${this.props.match.params.id}?page=1&limit=20&`)
                    .then((result) => {
                      if (!result.error) {
                        this.setState({ units: result.response.data.data ,shares:result.response.data.totalShares})
                      }
                      else {
                        this.setState({ apierror: true })
                      }
                    })
                })
              }}
            >
              Units
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '7' })}
              onClick={() => { this.toggle('7'); }}
            >
              Vehicles
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '8' })}
              onClick={() => { this.toggle('8'); }}
            >
              Packets
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '9' })}
              onClick={() => {
                this.setState({ activeTab: '9' }, () => {
                  getPurchase(`list/${this.props.match.params.id}?page=1&limit=20&`)
                    .then((result) => {
                      if (!result.error) {
                        this.setState({ purchase: result.response.data.data ,shares:result.response.data.totalShares})
                      }
                      else {
                        this.setState({ apierror: true })
                      }
                    })
                })
              }}
            >
              Purchases
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={(this.state.activeTab == '1' || this.state.activeTab == '2' || this.state.activeTab == '3' || this.state.activeTab == '4') || this.state.activeTab == '7' ? this.state.activeTab : ''}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.active === '1' })}
                  onClick={() => { this.Toggle('1') }}
                >
                  Active
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.active === '2' })}
                  onClick={() => { this.Toggle('2') }}
                >
                  Inactive
            </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.active}>
              <TabPane tabId={this.state.active}>
                {this.state.data ? users.length === 0 ? <p>no rows found</p> :
                  <div>
                    <ReactTable
                      data={users}
                      minRows={0}
                      showPagination={false}
                      columns={this.column}
                    />
                  </div>
                  : 'no state'}
              </TabPane>
            </TabContent>
          </TabPane>
          <TabPane tabId='5'>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <p>Drag 'n' drop some files here</p>
                    <p><button>or select files to upload</button></p>
                    <input {...getInputProps()} />

                  </div>
                </section>
              )}
            </Dropzone>
          </TabPane>
          <TabPane tabId='6'>
          Total shares:{this.state.shares?this.state.shares:0}
          Total units:{this.state.units?this.state.units.length:10}
          {this.state.data ? users.length === 0 ? <p>There are no Units registered for this residence yet</p> :
            <ReactTable
              data={this.state.units}
              minRows={0}
              showPagination={false}
              columns={this.col}
            />:''}
          </TabPane>
          <TabPane tabId='9'>
          {this.state.purchase ? this.state.purchase.length === 0 ? <p>There are no Units registered for this residence yet</p> :
            <ReactTable
              data={this.state.purchase}
              minRows={0}
              showPagination={false}
              columns={[
                {
                  Header:'Date',
                  accessor:'createdAt'
                },
                {
                  Header:'Code',
                  accessor:'purchase_type.shortName'
                },
                {
                  Header:'Type',
                  accessor:'purchase_type.name'
                },
                {
                  Header:'Quantity',
                  accessor:'nbItems'
                },
                {
                  Header:'Paid',
                  accessor:'totalPrice'
                }
              ]}
            />:''}
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default FamilyProfile;