import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Tab, Grid, Container, Header } from 'semantic-ui-react'

const foodData = [
    { FoodID: 1, FoodName: 'Pizza', FoodCategory: 'Food', FoodAmount: '$2.00' },
    { FoodID: 2, FoodName: 'Cup of Noodles', FoodCategory: 'Food', FoodAmount: '$1.50' },
    { FoodID: 3, FoodName: 'Hot Pocket', FoodCategory: 'Food', FoodAmount: '$1.00' },
    { FoodID: 4, FoodName: 'Fruit Snacks', FoodCategory: 'Food', FoodAmount: '$0.75' }
]
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

export default class FoodPurchase extends Component {

    state = {
        currentOrder: [],
        panes: [
            {
                menuItem: 'Food', render: () => <Tab.Pane>
                    <Table structured>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell>Product Name</Table.HeaderCell>
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {_.map(this.state.data['food'], ({ FoodID, FoodName, FoodCategory, FoodAmount }) => (

                                <Table.Row key={FoodID} textAlign='left'>
                                    <Table.Cell width='4'>{FoodName}</Table.Cell>
                                    <Table.Cell width='2' textAlign='center'>{FoodAmount}</Table.Cell>
                                    <Table.Cell width='1' textAlign='center'><Button compact color='green' onClick={() => this.addToOrder({ FoodID, FoodName, FoodAmount })}>Add</Button></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table></Tab.Pane>
            }, {
                menuItem: 'Drinks', render: () => <Tab.Pane>
                    <Table structured>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell>Product Name</Table.HeaderCell>
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {_.map(this.state.data['food'], ({ FoodID, FoodName, FoodAmount, FoodIdCounter }) => (

                                <Table.Row key={FoodID} textAlign='left'>
                                    <Table.Cell width='4'>{FoodName}</Table.Cell>
                                    <Table.Cell width='2' textAlign='center'>{FoodAmount}</Table.Cell>
                                    <Table.Cell width='1' textAlign='center'><Button compact color='green' onClick={() => this.addToOrder({ FoodID, FoodName, FoodAmount })}>Add</Button></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table></Tab.Pane>
            },
        ],
        data: {
            'food': [{ FoodID: 1, FoodName: 'Pizza', FoodCategory: 'Food', FoodAmount: '$2.00' },
            { FoodID: 2, FoodName: 'Cup of Noodles', FoodCategory: 'Food', FoodAmount: '$1.50' },
            { FoodID: 3, FoodName: 'Hot Pocket', FoodCategory: 'Food', FoodAmount: '$1.00' },
            { FoodID: 4, FoodName: 'Fruit Snacks', FoodCategory: 'Food', FoodAmount: '$0.75' }]
        },
        foodIdCounter: 0,
        currentTotal: '$0.00'
    }

    addToOrder(props) {
        props.FoodIdCounter = this.state.foodIdCounter;
        let currTotal = this.addTotal(props.FoodAmount)
        this.setState({
            currentOrder: this.state.currentOrder.concat(props),
            foodIdCounter: this.state.foodIdCounter + 1,
            currentTotal: currTotal
        }, () => this.render())
    }
    removeFromOrder(props) {
        let currTotal = this.subtractTotal(props.FoodAmount)
        this.setState({currentOrder: this.state.currentOrder.filter(function(x) { 
            return x.FoodIdCounter !== props.FoodIdCounter
        }), currentTotal: currTotal});
    }

    addTotal(price) {
        let currentTotal = this.state.currentTotal;
        currentTotal = this.formatFromMoney(currentTotal)
        currentTotal += this.formatFromMoney(price);
        return this.formatToMoney(currentTotal)
    }

    subtractTotal(price){
        let currentTotal = this.state.currentTotal;
        currentTotal = this.formatFromMoney(currentTotal)
        currentTotal -= this.formatFromMoney(price);
        return this.formatToMoney(currentTotal)
    }

    formatFromMoney(value){
        return Number(value.slice(1))
    }
    
    formatToMoney(value){
        return formatter.format(value)
    }

    render() {
        return (

                <Grid divided='vertically' className='studentActionBody' >
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Tab panes={this.state.panes} renderActiveOnly={true} />
                        </Grid.Column>
                        <Grid.Column>
                            <Container className='transactionOrderContainer'>
                                <Header size='large' textAlign='center'>Current Order</Header>
                                <Table celled structured compact>
                                    <Table.Header>
                                        <Table.Row textAlign='center'>
                                            <Table.HeaderCell width='4'>Product Name</Table.HeaderCell>
                                            <Table.HeaderCell width='2'>Amount</Table.HeaderCell>
                                            <Table.HeaderCell width='1'></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {_.map(this.state.currentOrder, ({ FoodID, FoodName, FoodAmount, FoodIdCounter }) => (
                                            <Table.Row key={FoodIdCounter} textAlign='left'>
                                                <Table.Cell width='4'>{FoodName}</Table.Cell>
                                                <Table.Cell width='2' textAlign='center'>{FoodAmount}</Table.Cell>
                                                <Table.Cell width='1' textAlign='center'><Button color='red' compact onClick={() => this.removeFromOrder({ FoodID, FoodName, FoodAmount, FoodIdCounter })}>x</Button></Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                    <Table.Footer fullWidth>
                                        <Table.Row>
                                            <Table.HeaderCell width='4' textAlign='right' verticalAlign='middle'><Header size='small'>Total</Header></Table.HeaderCell>
                                            <Table.HeaderCell width='2' textAlign='center' verticalAlign='middle'><Header size='small'>{this.state.currentTotal}</Header></Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }
}

