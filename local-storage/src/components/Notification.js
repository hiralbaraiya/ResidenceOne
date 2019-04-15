import React, { Component } from 'react';
import Texteditor from './Texteditor';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';

class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = { text: null, default: [] }
    }
    componentWillMount() {
        console.log('notification')
        let token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/api/notification/notificationTypes/list`,
            { headers: { 'token': token } })
            .then((res) => {
                console.log('notification',res)
                let response = []
                res.data.data.map((key) => {
                    let obj = {
                        value: key.name,
                        label: key.name
                    }
                    response.push(obj);
                    return null
                })

                this.setState({ default: response }, () => { console.log(this.state) })

            })
    }

    render() {
        return (
            <div>
                <Modal style={{ 'minHeight': '500px' }} className='model' isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} >

                    <ModalHeader style={{ 'minHeight': '60px' }} toggle={this.props.toggle}>Add User</ModalHeader>
                    <ModalBody >
                        <input type='checkbox' />
                        <AsyncSelect
                            isClearable
                            
                            defaultOptions={this.state.default}
                        />
                        <Texteditor
                            onChange={(value) => { this.setState({ text: value }) }}
                        />

                    </ModalBody>


                </Modal>


            </div>
        )
    }
}

export default Notification;