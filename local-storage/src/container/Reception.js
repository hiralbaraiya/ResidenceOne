import React, { Component } from 'react';
import Axios from 'axios';
import { TabContent, TabPane, Nav, Input, NavItem, NavLink, Row, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import classnames from 'classnames';
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import ReactTable from "react-table";
import Select from '../components/Select';
import 'react-table/react-table.css';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import Table from '../components/Table'
import IoMail from 'react-icons/lib/io/email';
import FaCake from 'react-icons/lib/fa/birthday-cake'
import IoAndroidPhonePortrait from 'react-icons/lib/io/android-phone-portrait';
import Inputfield from '../components/Inputfield';
import SignatureCanvas from 'react-signature-canvas'
import { getResidentList, updateReception } from '../Api/ResidenceApi';

class Reception extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      originals: '',
      email: '',
      telephone: '',
      DOB: '',
      data: [],
      image: '',
      trimmedDataURL: '',
      pagesize: 20,
      totalpage: 0,
      page: 1,
      modal: false,
      name: '',
      editmodel: false,
      filterurl: '',
      sorturl: '',
    }
    this.addpacket = this.addpacket.bind(this)
    this.column = [
      {
        Header: 'Name',
        accessor: 'fullName',
        filterable: true,
        Cell: (row) => {
          return (
            <Button
              onClick={() => { this.setState({ editmodel: true }) }}
              color='link' style={{ 'width': '80px', 'height': '20px', 'fontSize': '12px' }}>{row.value}</Button>
          )
        }
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
        accessor: 'family.families_units[0].unit.officialId',
        filterable: true,
      },
      {
        Header: 'Building',
        accessor: 'family.families_units[0].unit.building.name',
        filterable: true
      },
      {
        accessor: 'id',
        Cell: (row) => {
          return (

            <Button className='recover packet' onClick={() => this.toggle(row.original)}
              style={{ 'width': '80px', 'fontSize': '12px' }}
            >
              Receive</Button>
          )
        }
      },
      {
        Header: 'Telephone',
        accessor: 'telephone',
        filterable: true,
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
    this.colum = [
      {
        Header: 'Number',
        accessor: 'tempIdNumber',
        filterable: true,
      },
      {
        Header: 'Status',
        accessor: 'emailSent',
        Cell: (row) => {
          return (
            <div className='icons'>
              {row.value === false ? <IoMail style={{ 'fill': 'red' }} className='iconr' /> : <IoMail style={{ 'fill': 'green' }} className='iconr' />}
              {row.original.smsSent === false ? <IoAndroidPhonePortrait style={{ 'fill': 'red' }} className='iconr' /> : <IoAndroidPhonePortrait style={{ 'fill': 'green' }} className='iconr' />}
            </div>
          )
        },
      },
      {
        Header: 'DateIn',
        accessor: 'dateTimeReceived',
        filterable: true,
        Cell: (row) => {
          var date = new Date(row.value)
          return (
            <p>{
              `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>)
        }
      },
      {
        Header: 'TimeIn',
        accessor: 'dateTimeReceived',
        Cell: (row) => {
          var date = new Date(row.value)
          return (
            <p>{
              `${date.getHours()}:${date.getMinutes()}`
            }</p>)
        }
      },
      {
        Header: 'Name',
        accessor: 'user.fullName',
        filterable: true,
        Cell: (row) => {
          return (
            <Button
              onClick={() => { this.setState({ editmodel: true }) }}
              color='link' style={{ 'width': '80px', 'height': '20px', 'fontSize': '1px' }}>{row.value}</Button>
          )
        }
      },
      {
        accessor: 'id',
        Cell: (row) => {
          return (

            <div className='packet'>  <Button className='recover' onClick={() => { this.setState({ recover: true, originals: row.original }) }}
              style={{ 'width': '80px', 'fontSize': '12px' }}
            >
              Recover</Button>
            </div>)
        }
      },
    ]
    this.col = [
      {
        Header: 'Number',
        accessor: 'tempIdNumber'
      },
      {
        Header: 'DateIn',
        accessor: 'dateTimeReceived',
        filterable: true,
        Cell: (row) => {
          var date = new Date(row.value)
          return (
            <p>{
              `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>)
        }
      },
      {
        Header: 'TimeIn',
        accessor: 'dateTimeReceived',
        Cell: (row) => {
          var date = new Date(row.value)
          return (
            <p>{
              `${date.getHours()}:${date.getMinutes()}`
            }</p>)
        }
      },
      {
        Header: 'Date Out',
        accessor: 'dateTimeRecovered',
        filterable: true,
        Cell: (row) => {
          var date = new Date(row.value)
          return (
            <p>{
              `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>)
        }
      },
      {
        Header: 'Time Out',
        accessor: 'dateTimeRecovered',
        Cell: (row) => {
          var date = new Date(row.value)
          return (
            <p>{
              `${date.getHours()}:${date.getMinutes()}`
            }</p>)
        }
      },
      {
        Header: 'Name',
        accessor: 'user.fullName',
        filterable: true,
        Cell: (row) => {
          return (
            <Button
              onClick={() => { this.setState({ editmodel: true, id: row.original.id }) }}
              color='link' style={{ 'width': '80px', 'height': '20px', 'fontSize': '12px' }}>{row.value}</Button>
          )
        }
      },
      {
        Header: 'Main Unit Id',
        accessor: 'user.family.families_units[0].unit.officialId'
      }
    ]
  }

  componentWillMount() {

    getResidentList(`lastpacket-in`)
      .then((result) => {
        if(!result.error){
        let date = new Date();
        let y = date.getFullYear();
        let m = `${date.getMonth() + 1}`.padStart(2, '0')
        let d = `${date.getDate()}`.padStart(2, '0')
        let last = 'P' + y + m + d + '-'
        let num
        if (result.response.data.data.maxTempIdNumber === null) {
          num = '0001'
        }
        else {
          num = parseInt(result.response.data.data.maxTempIdNumber.slice(10))
          if (num === 9999) {
            num = '0001'
          }
          else {
            num = num + 1 + ''
            num = num.padStart(4, '0')
          }
        }
        last = last + num
        this.setState({ last: last })
      }
      else{
        this.setState({apiError:true})
      }
    })
     
    this.getdata(true)
  }

  adduser() {
    let token = localStorage.getItem('token');
    Axios.post(
      `http://localhost:8080/api/pool/editPoolUserDetail/${this.state.id}`,
      ({ emailData: this.state.email, telephoneData: this.state.telephone, dateOfBirthData: this.state.DOB }),
      { headers: { 'token': token } }
    )
      .then((res) => {
        console.log(res)
        this.setState({ editmodel: false })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  handelchange = (e, id, status) => {
    console.log('handelchange')
    let obj = {};
    obj[id] = e
    this.setState(obj, () => { this.getdata(status) })
  }

  getdata = (status) => {
    getResidentList(`reception-users-list?page=${this.state.page}&limit=${this.state.pagesize}&${this.state.filterurl}status=${status}&${this.state.sorturl}`)
      .then((result) => {
        (!result.error) ?
          this.setState({ data: result.response.data.data, image: result.response.data.imagePath, totalpage: Math.ceil(result.response.data.totalRecords / this.state.pagesize) })
          : this.setState({ apiError: true })
      })
  }

  addpacket() {
    let FormData = {
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
    updateReception(`add-packet`, FormData)
      .then((res) => this.setState({ modal: false }))

  }

  recoverPacket() {
    let FormData = {
      dateTimeRecovered: new Date(),
      id: this.state.originals.id,
      noteAfterRecovery: '',
      receivedById: '19f0c1f2-98c7-46ad-87d0-4e6a73128500',
      recoveredBySign: this.state.trimmedDataURL
    }
    updateReception(`update-recovered-date`, FormData)
      .then((res) => this.setState({ recover: false }))
  }

  getpacket() {
    getResidentList(`packets-List?page=1&limit=20&dateTimeRecovered=true`)
      .then((result) => {
        (!result.error) ?
        this.setState({ outpackets: result.response.data.data })
        :this.setState({apiError:true})
      })
  }

  getlist() {
    getResidentList(`packets-List?page=1&limit=20&dateTimeRecovered=false`)
      .then((result) => {
        (!result.error) ?
        this.setState({ packets: result.response.data.data })
        :this.setState({apiError:true})
      })
  }

  toggle(original) {
    this.setState({ modal: !this.state.modal, original: original })
  }

  setdata(e, id) {
    let obj = {};
    obj[id] = e
    this.setState(obj)
  }

  render() {
    let { tempIdNumber, packet_type, numberOfItems } = this.state.originals
    return (
      <div className='table-sc'>
        <h3 className='header'>Reception</h3>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.setState({ activeTab: '1' }); }}
            >
              Residents
                </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.setState({ activeTab: '2' }, () => { this.getlist() }); }}
            >
              Packets in
                </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.setState({ activeTab: '3' }, () => { this.getpacket() }); }}
            >
              Packets out
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
          <Modal style={{ 'minHeight': '500px' }} isOpen={this.state.recover} toggle={() => this.setState({ recover: false })} backdrop={true} >

            <ModalHeader style={{ 'minHeight': '60px' }} toggle={() => this.setState({ recover: false })}>Packet recovery
          </ModalHeader>
            <ModalBody>
              <div className='recepmodel  col-sm-10' >
                <Label className='packet'>Packet number</Label>
                <h1>{tempIdNumber}</h1>
                <Label className='packet'>Packet type</Label>
                <Label className='packet'>{packet_type ? packet_type.name : ''}</Label>
                <br></br>
                <Label className='packet'>Number of packets</Label>
                <Label className='packet'>{numberOfItems}</Label>
                <br></br>
                <Label className='packet'>recipient</Label>
                <Label className='packet'>Signture</Label>
                <SignatureCanvas penColor='green'
                  canvasProps={{ height: 200, className: 'sigCanvas col-sm-12' }}
                  onEnd={(e) => {
                    this.setState({
                      trimmedDataURL: this.sigCanvas.getTrimmedCanvas()
                        .toDataURL('image/png')
                    })
                  }}

                  ref={(ref) => { this.sigCanvas = ref }} />
                <div className='packet'><Button className='clear' onClick={() => { this.sigCanvas.clear() }}>clear</Button></div>
                <Label className='packet'>Note after recovery</Label>
                <Inputfield></Inputfield>
                <div className='packet'><Button className='recover col-sm-7' onClick={() => this.recoverPacket()}>Packet Recovered</Button></div>
              </div>
            </ModalBody>
          </Modal>
          <Modal style={{ 'minHeight': '500px' }} className='model' isOpen={this.state.editmodel} toggle={() => { this.setState({ editmodel: false }) }} backdrop={true} >

            <ModalHeader style={{ 'minHeight': '60px' }} toggle={() => { this.setState({ editmodel: false }) }}>Add User</ModalHeader>
            <ModalBody>

              <Inputfield type='number' placeholder='Mobile number'
                exp={/^$|^[6-9]\d{9}$/}
                onChange={(e, id) => this.setdata(e, id)}
              />
              <br></br>
              <Inputfield type='email' placeholder='Email address'
                onChange={(e, id) => this.setdata(e, id)}
                exp={/^$|^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}
              />

              <br></br>
              <Label><b>Select date of birth</b></Label>
              <br></br>
              <DateRangePicker
                singleDatePicker
                drops='up'
                onApply={(e, p) => { this.setdata(moment(p.startDate).format('L'), "DOB") }}
              >
                <Input value={this.state.DOB} name='DOB' />
              </DateRangePicker>
            </ModalBody>
            <ModalFooter>
              <Button style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291' }}
                onClick={() => this.adduser()}>Submit</Button>
              <Button style={{ 'backgroundColor': '#fc8675', 'border': '1px solid #fb5a43' }} >Cancel</Button>
            </ModalFooter>
          </Modal>
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
                <ReactTable

                  data={this.state.packets}
                  columns={this.colum}


                  showPagination={false}
                  className='-striped -highlight'
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <ReactTable

                  data={this.state.outpackets}
                  columns={this.col}


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