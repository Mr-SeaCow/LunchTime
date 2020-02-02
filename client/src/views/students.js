import _ from 'lodash'
import React, { Component } from 'react'
import { Loader, Image,Card, Modal, TextArea, Segment, Table, Grid, Button, Input, Form, Message, Icon, Header } from 'semantic-ui-react'
import axios from 'axios'
const buttonSize = 'large'

const grades = { 1: ['1', '2', '3', '4', '5'], 2: ['6', '7', '8', '9', '10', '11', '12'] }
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default class TableExampleSortable extends Component {
    constructor() {
        super()
        this.state = {
            column: null,
            baseData: null,
            filteredData: null,
            direction: null,
            activeFilter: '',
            activeName: 'FirstName',
            studentInfo: null,
            /*MODULE INFO*/
            accountData: null,
            filteredAccountData: null,
            selectedAccount: null,
            activeFilterAcc: '',
            /*FORM INFO!*/
            studentId: '',
            linkedAccount: null,
            firstName: '',
            lastName: '',
            emailAddress: '',
            gradeNumber: '',
            allowChargingLunch: false,
            hotLunchOnly: false,
            isActive: true,
            allergies: '',
            firstNameError: false,
            lastNameError: false,
            emailAddressError: false,
            gradeNumberError: false,
            allergiesError: false,
            complete: false,

        }
    }

    handleSort = (clickedColumn) => () => {
        const { column, filteredData, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                filteredData: _.sortBy(filteredData, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            filteredData: filteredData.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    search(e) {
        const { baseData, activeFilter } = this.state
        let input = e.target.value.toLowerCase()
        if (input !== activeFilter) {
            this.setState({
                filteredData: _.filter(baseData, function (student) { return student.FirstName.toLowerCase().includes(input) > 0 || student.LastName.toLowerCase().includes(input) }),
                activeFilter: input
            })
        } else {
            this.setState({
                filteredData: baseData,
                activeFilter: ''
            })
        }
    }

    searchAccount(e) {
        const { accountData, activeFilterAcc, filteredAccountData } = this.state
        let input = e.target.value.toLowerCase()
        if (input !== activeFilterAcc) {
    
            this.setState({
                filteredAccountData: _.filter(accountData, function (account) { 
                    let foundEmail = false;
                    if (account.EmailAddress) {
                        foundEmail = account.EmailAddress.includes(input) > 0;
                    }
                    return account.AccountName.toLowerCase().includes(input) > 0 || foundEmail ||String(account.AccountID).includes(input) > 0}),
                activeFilterAcc: input
            })
        } else {
            this.setState({
                filteredAccountData: accountData,
                activeFilterAcc: ''
            })
        }
    }


    refreshState() {
        this.getDataStudents().then((studData) => {
            this.getDataAccounts().then(accData => {
                this.setState({
                    baseData: studData.data.recordset,
                    filteredData: studData.data.recordset,
                    direction: null,
                    column: null,
                    accountData: accData.data.recordset,
                    filteredAccountData: accData.data.recordset
                })})
        })

    }

    getDataStudents() {
        return axios.get(`http://localhost:3001/getStudents`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    }

    getDataAccounts() {
        return axios.get(`http://localhost:3001/getAccounts`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cancel = () => this.setState({open: false, filteredAccountData: this.state.accountData, selectedAccount: null, activeFilterAcc: '' })

    confirm =() =>{
        document.getElementById('form-input-control-linkedAccount').value = this.state.selectedAccount.AccountName;
        this.setState({open: false, linkedAccount: this.state.selectedAccount, filteredAccountData: this.state.accountData, selectedAccount: null, activeFilterAcc: ''})}

    selectStudent(studentInfo) {
        const {StudentID, AccountID, FirstName, LastName, GradeNumber, AllowChargingLunch, HotLunchOnly, Allergies, IsActive} = studentInfo
        this.setState({
            studentId: StudentID,
            linkedAccount: null,
            firstName: FirstName,
            lastName: LastName,
            //emailAddress: '',
            gradeNumber: GradeNumber,
            allowChargingLunch: AllowChargingLunch,
            hotLunchOnly: HotLunchOnly,
            isActive: IsActive,
            allergies: Allergies,
        })
        document.getElementById('form-input-control-firstName').value = FirstName;
        document.getElementById('form-input-control-lastName').value = LastName;
        document.getElementById('form-input-control-gradeNumber').value = GradeNumber;
        console.log(AccountID)
        console.log('test', this.getAccount(AccountID))
       document.getElementById('form-input-control-linkedAccount').value = this.getAccount(AccountID).AccountName;

    }

    getAccount(AccountID){ 
        return _.filter(this.state.accountData, (account) => {return account.AccountID === AccountID})[0]
    }

    selectAccount(Account) {
        this.setState({
            selectedAccount: Account
        })
    }

    render() {
        if (this.state.baseData === null) {
            this.refreshState()
            return (
                <Segment>
                    <Loader active />

                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
            );
        }

        const { column, direction, filteredAccountData, filteredData, open, closeOnEscape, closeOnDimmerClick } = this.state
        return (
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Input className='searchStudents studentsView' icon='users' iconPosition='left' placeholder='Search students....' fluid onChange={this.search.bind(this)} />
                        <div className="studentTable studentsView">
                            <Table striped sortable compact selectable singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell
                                            width='3'
                                            sorted={column === 'GradeNumber' ? direction : null}
                                            onClick={this.handleSort('GradeNumber')}
                                            textAlign='center'
                                        >
                                            Grade
              </Table.HeaderCell>
                                        <Table.HeaderCell
                                            width='7'
                                            sorted={column === 'FirstName' ? direction : null}
                                            onClick={this.handleSort('FirstName')}
                                            textAlign='center'
                                        >
                                            First
              </Table.HeaderCell>
                                        <Table.HeaderCell
                                            width='7'
                                            sorted={column === 'LastName' ? direction : null}
                                            onClick={this.handleSort('LastName')}
                                            textAlign='center'
                                        >
                                            Last
              </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {_.map(filteredData, ({ StudentID, AccountID, FirstName, LastName, GradeNumber, AllowChargingLunch, HotLunchOnly, Allergies, IsActive }) => (
                                        <Table.Row key={StudentID} onClick={() => { this.selectStudent({StudentID, AccountID, FirstName, LastName, GradeNumber, AllowChargingLunch, HotLunchOnly, Allergies, IsActive}) }}>
                                            <Table.Cell textAlign='center' >{GradeNumber}</Table.Cell>
                                            <Table.Cell >{FirstName}</Table.Cell>
                                            <Table.Cell >{LastName}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </Grid.Column>
                    <Grid.Column className="student edit">
                        <Form success>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-firstName'
                                    control={Input}
                                    label='First name'
                                    placeholder='First name'
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                />
                                <Form.Field
                                    id='form-input-control-lastName'
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field
                                    id='form-input-control-gradeNumber'
                                    control={Input}
                                    label='Grade'
                                    placeholder='Grade'
                                    onChange={(e) => this.setState({ gradeNumber: e.target.value })}
                                />
                                {/* <Form.Field
                                    id='form-input-control-linkedAccount'
                                    control={Input}
                                    label='Linked Account'
                                    placeholder='Click to add account'
                                    onClick={(e) => this.setState({
                                        closeOnEscape: false,
                                        closeOnDimmerClick: false,
                                        open: true
                                    })}
                                    icon={<Icon name='add' />}
                                    onChange={(e) => {
                                        if (e.target.value === '') {
                                            this.setState({ linkedAccount: '' })
                                        } else {
                                            e.targetvalue = this.state.linkedAccount.AccountName
                                        }
                                    }}
                            ></Form.Field> */}
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Checkbox
                                    label='Charge Hot Lunch'
                                />
                                 <Form.Checkbox
                                    label='Hot Lunch Only'
                                />
                                 <Form.Checkbox
                                    label='IsActive'
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>

                            </Form.Group>
                        </Form>
                        <Modal
                            id='test'
                            open={open}
                            closeOnEscape={closeOnEscape}
                            closeOnDimmerClick={closeOnDimmerClick}
                            onClose={this.close}
                        >
                            <Modal.Header>Delete Your Account</Modal.Header>
                            <Modal.Content>
                                <Input className='searchAccounts accountView' icon='users' iconPosition='left' placeholder='Search Accounts....' fluid onChange={this.searchAccount.bind(this)} />
                                <div className="accountTable accountView">
                                    <Table striped compact selectable celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell
                                                    width='3'
                                                    textAlign='center'
                                                > Account Id </Table.HeaderCell>
                                                <Table.HeaderCell
                                                    width='7'
                                                    textAlign='center'
                                                >Acccount Name</Table.HeaderCell>
                                                <Table.HeaderCell
                                                    width='7'
                                                    textAlign='center'
                                                >Email Address</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {_.map(filteredAccountData, ({ AccountID, AccountName, EmailAddress }) => (
                                                <Table.Row key={AccountID} onClick={() => { this.selectAccount({AccountID, AccountName, EmailAddress}) }}>
                                                    <Table.Cell textAlign='center' >{AccountID}</Table.Cell>
                                                    <Table.Cell >{AccountName}</Table.Cell>
                                                    <Table.Cell >{EmailAddress !== null ? EmailAddress : 'None'}</Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>
                            <Card>
                                <Card.Content header={this.state.selectedAccount !== null ? this.state.selectedAccount.AccountName : 'No Student Selected'}/>
                                <Card.Content description={this.state.selectedAccount !== null ? (this.state.selectedAccount.EmailAddress !== null ? this.state.selectedAccount.EmailAddress : 'No Email Address') : 'No Email Address'}/>

                        
                            </Card>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.cancel} negative>
                                    No
                            </Button>
                                <Button
                                    onClick={this.confirm}
                                    positive
                                    labelPosition='right'
                                    icon='checkmark'
                                    content='Yes'
                                />
                            </Modal.Actions>
                        </Modal>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}