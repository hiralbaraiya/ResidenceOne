import React, { Component } from 'react';
import Axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import classnames from 'classnames';
import ReactTable from "react-table";
import Select from '../components/Select';
import 'react-table/react-table.css';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import AsyncSelect from 'react-select'
import Model from '../components/Model';
import moment from 'moment'
import { Link } from 'react-router-dom';
import IoMail from 'react-icons/lib/io/email';
import FaCake from 'react-icons/lib/fa/birthday-cake'
import IoAndroidPhonePortrait from 'react-icons/lib/io/android-phone-portrait';
import Inputfield from '../components/Inputfield';

class Reception extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      data: [],
      image: '',
      pagesize: 20,
      totalpage: 0,
      page: 1,
      modal: false,
      name: '',
      filterurl: '',
      sorturl: '',
    }
    this.addpacket=this.addpacket.bind(this)
    this.column = [
      {
        Header: 'Name',
        accessor: 'fullName'
      },
      {
        Header: 'Profile picture',
        accessor: 'picture',
        Cell: row => {
          return (
            <img className='image' src={`http://localhost:8080/images/lacadenelle13008fr/users/${row.value}`} alt="user" height="15" width="15"></img>
          )
        }
      },
      {
        Header: 'Main unitId',
        accessor: `family.families${''}units.0.isMainUnit`
      },
      {
        Header: 'Building',

      },
      {
        accessor: 'id',
        Cell: (row) => {
          return (

            <Button className='recover' onClick={() => this.toggle(row.original)}>Receive</Button>
          )
        }
      },
      {
        Header: 'Telephone',
        accessor: 'telephone'
      },
      {
        Header: 'Complete',
        accessor: 'id',
        Cell: (row) => {
          return (
            <div className='icons'>{row.original.telephone === null || row.original.telephone === "" ? <IoAndroidPhonePortrait className='iconr' /> : <></>}
              {row.original.email === null || row.original.email === "" ? <IoMail className='iconr' /> : <></>}
              {row.original.dateOfBirth === null || row.original.dateOfBirth === "" ? <FaCake className='iconr' /> : <></>}
            </div>
          )
        }
      }
    ]
    this.colum=[
      {Header:'Number',
      accessor:'tempIdNumber',
      filterable: true,
    },
    {
      Header:'Status',
      accessor:'emailSent',
      filterable: true,
    },
    {
      Header:'DateIn',
      accessor:'dateTimeReceived',
      filterable: true,
      Cell:(row)=>{
        var date=new Date(row.value)
        return(
        <p>{
          `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}</p>)
      }
    },
    {
      Header:'TimeIn',
      accessor:'dateTimeReceived',
      Cell:(row)=>{
        var date=new Date(row.value)
        return(
        <p>{
          `${date.getHours()}:${date.getMinutes()}`
          }</p>)
      }
    },
    {
      Header:'Name',
      accessor:'user.fullName',
      filterable: true,
    },
    ]
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    Axios.get(`http://localhost:8080/api/reception/lastpacket-in`, { headers: { 'token': token } })

      .then((response) => {
        console.log(response, "last")
        let date = new Date();
        console.log(date)
        let y = date.getFullYear();
        let m = `${date.getMonth() + 1}`.padStart(2, '0')
        let d = `${date.getDate()}`.padStart(2, '0')
        let last = 'P' + y + m + d + '-'
        let num
        if (response.data.data.maxTempIdNumber === null) {
          console.log('number null')
          num = '0001'
        }
        else {
          num = parseInt(response.data.data.maxTempIdNumber.slice(10))
          if (num === 9999) {
            console.log('number 9999')
            num = '0001'
          }
          else {
            console.log('last case')
            console.log(num)
            num = num + 1 + ''
            num = num.padStart(4, '0')
            console.log(num)
          }

        }
        last = last + num
        console.log(last, ':last')
        this.setState({ last: last })
      })
      .catch((e) => {
        console.log(e)
      })

    Axios.get(`http://localhost:8080/api/reception/reception-users-list?page=1&limit=20&status=1`,
      { headers: { 'token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ data: response.data.data, totalpage: Math.ceil(response.data.totalRecords / this.state.pagesize) })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  addpacket ()  {
    // let body=new FormData();
    // body.set('recipientId',this.state.original.id)
    // body.set('recipientFamilyId', this.state.original.familyId)
    // body.set('dateTimeReceived', new Date())
    // body.set('receivedById', '19f0c1f2-98c7-46ad-87d0-4e6a73128500')
    // body.set('numberOfItems', 1)
    // body.set('tempIdNumber', this.state.last)
    // body.set('telephone', this.state.original.telephone)
    // body.set('email', this.state.original.email)
    // body.set('currentHost', 'http://localhost:8080')
    // body.set('fullName', this.state.original.fullName)
    // body.set('emailPref', null)
    // body.set('smsPref', null)
    // body.set('langpref', null)
    let FormData={
      recipientId: this.state.original.id,
      recipientFamilyId: this.state.original.familyId,
      dateTimeReceived: new Date(),
      receivedById: '19f0c1f2-98c7-46ad-87d0-4e6a73128500',
      numberOfItems: 1,
      tempIdNumber: this.state.last,
      telephone: this.state.original.telephone,
      email: this.state.original.email,
      currentHost: 'http://localhost:8080',
      fullName: this.state.original.fullName,
      emailPref: null,
      smsPref: null,
      langpref: null
    }
    console.log(FormData)
    let token = localStorage.getItem('token');
    Axios.post(`http://localhost:8080/api/reception/add-packet`,
  (FormData),
      { headers: { 'token': token } })
      .then((res)=>console.log('response:',res))
      .catch((res)=>console.log(res))
  }

getlist(){
  let token = localStorage.getItem('token');
  Axios.get(`http://localhost:8080/api/reception/packets-List?page=1&limit=20&dateTimeRecovered=false`, { headers: { 'token': token } })
.then((response)=>{
  this.setState({packets:response.data.data},()=>{console.log(this.state.packets)})
})
}
  toggle(original) {

    this.setState({ modal: !this.state.modal, original: original })
  }

  render() {
    return (
      <div className='table-sc'>
       <h3 className='header'>Reception</h3>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.setState({activeTab:'1'}); }}
            >
              Residents
                </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.setState({activeTab:'2'},()=>{this.getlist()}); }}
            >
              Packets in
                </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <Dropdown className='drop'
            style={{ margin: 0 }}
            icon={<Faellips />}
            list={['']} />
          <Modal style={{ 'minHeight': '500px' }} isOpen={this.state.modal} toggle={() => this.toggle()} backdrop={true} >

            <ModalHeader style={{ 'minHeight': '60px' }} toggle={() => this.toggle()}>Reception & Notification
</ModalHeader>
            <ModalBody>
              <div className='recepmodel  col-sm-10' >
                <Label className='packet'>Please write this number on the packet or print a label</Label>
                <h1>{this.state.last}</h1>
                <Label className='packet'>What type of packet it is?</Label>
                <Select url={`/reception/packetTypes/list`} key='name' value='name' />
                <Label className='packet'>More than one packet for the same person?</Label>
                <Select />
                <Label className='packet'>Type a note below if needed, It will be transmitted to the recipient</Label>
                <Inputfield></Inputfield>
                <Label className='packet'>Take a picture of the packet, if useful</Label>
                <div className='packet-button'> <Button className="col-sm-7" style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291' }}
                  onClick={() => { }}> Click to take a picture</Button>
                <br></br>  <Button className="col-sm-7" style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291' }}
                    onClick={() => { }}>Print a label</Button>
                <br></br>  <Button className="col-sm-7" style={{ 'backgroundColor': '#fc8675', 'border': '1px solid #fb5a43' }} onClick={() => { this.addpacket() }}>Send notification</Button>
                </div></div>
            </ModalBody>



          </Modal>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ReactTable
                  manual
                  onFilteredChange={(e) => this.filter(e, true)}
                  onSortedChange={e => { this.Sort(e, true) }}
                  pages={this.state.totalpage}
                  page={this.state.page - 1}
                  //   onPageSizeChange={(p) => {
                  //     this.setState({ pagesize: p }, () => { this.getdata(false) })
                  //   }}
                  // onPageChange={(index) => { this.setState({ page: index + 1 }, () => { this.getdata(true, '') }) }}
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
                  
                  data={this.state.packets}
                  columns={this.colum}
                  
                 
                 showPagination={false}
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

export default Reception;