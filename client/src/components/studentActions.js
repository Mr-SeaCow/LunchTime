

import React, { Component } from 'react'
import { Modal, Button, Header, Tab } from 'semantic-ui-react'
import FoodPurchase from './foodPurchase'

const panes = [
    { menuItem: 'Purchase', render: () => <Tab.Pane className='studentActionBody' attached={false}><FoodPurchase/></Tab.Pane> },
    { menuItem: 'Transactions', render: () => <Tab.Pane className='studentActionBody' attached={false}>pane2</Tab.Pane> },
    { menuItem: 'Accounts', render: () => <Tab.Pane className='studentActionBody' attached={false}>pane2</Tab.Pane> }
]



export default class StudentActionModal extends Component {

    state = {
        studentInfo: null
    }
    componentDidUpdate(prevProps) {
        if (prevProps.studentInfo !== this.props.studentInfo || this.props.studentInfo !== this.state.studentInfo) {
            this.setState({studentInfo: this.props.studentInfo})
        }
    }
    


    render() {
        const HeaderValue = this.state.studentInfo === null ? 'Loading' :
         `${this.state.studentInfo.LastName}, ${this.state.studentInfo.FirstName}`
        return (
            <Modal
                open={this.props.open}
                size='large'
            >
                <Header>{HeaderValue}</Header>
                <Modal.Content>

                <Tab menu={{ secondary: true, pointing: true }}  panes={panes} renderActiveOnly={true} />
  
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.props.handleClose}>Close</Button>
                    <Button color='green' onClick={this.props.handleClose}>Process Transaction</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}