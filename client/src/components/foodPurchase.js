import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Tab, Grid, Container, Header } from 'semantic-ui-react'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class FoodPurchase extends Component {
    
    state = {
        currentOrder: [],
        data: {
            'food': [
            { FoodID: 1, FoodName: 'Hot Lunch', FoodCategory: 'Lunch', FoodAmount: '$2.50' },
            { FoodID: 2, FoodName: 'Sack Lunch', FoodCategory: 'Lunch', FoodAmount: '$2.50' },
            { FoodID: 3, FoodName: 'Corn Dog', FoodCategory: 'Lunch', FoodAmount: '$1.00' },
            { FoodID: 4, FoodName: 'Hamburger', FoodCategory: 'Lunch', FoodAmount: '$1.00' },
            { FoodID: 5, FoodName: 'Pizza Slice', FoodCategory: 'Lunch', FoodAmount: '$1.00' },
            { FoodID: 6, FoodName: 'Cup-N-Noodle', FoodCategory: 'Lunch', FoodAmount: '$0.75' },
            { FoodID: 7, FoodName: 'Uncrustable', FoodCategory: 'Lunch', FoodAmount: '$0.75' },
            { FoodID: 8, FoodName: 'Pizza Pocket', FoodCategory: 'Lunch', FoodAmount: '$1.00' },
            { FoodID: 9, FoodName: 'Fruit Cup', FoodCategory: 'Snack', FoodAmount: '$0.75' },
            { FoodID: 10, FoodName: 'Apple Sauce', FoodCategory: 'Snack', FoodAmount: '$0.75' },
            { FoodID: 11, FoodName: 'Chips', FoodCategory: 'Snack', FoodAmount: '$0.75' },
            { FoodID: 12, FoodName: 'Cookies', FoodCategory: 'Snack', FoodAmount: '$0.75' },
            { FoodID: 13, FoodName: 'Fruit Snacks', FoodCategory: 'Snack', FoodAmount: '$0.50' },
            { FoodID: 14, FoodName: 'Granola Bar', FoodCategory: 'Snack', FoodAmount: '$0.75' },
            { FoodID: 15, FoodName: 'Annie Snacks', FoodCategory: 'Snack', FoodAmount: '$0.75' },
            { FoodID: 16, FoodName: 'Trail Mix', FoodCategory: 'Snack', FoodAmount: '$1.00' },
            { FoodID: 17, FoodName: 'Juice', FoodCategory: 'Drink', FoodAmount: '$0.75' },
            { FoodID: 18, FoodName: 'Milk', FoodCategory: 'Drink', FoodAmount: '$0.75' }]
        },
        foodIdCounter: 0,
        currentTotal: '$0.00'
    }
    addToOrder(props) {
        props.FoodIdCounter = this.state.foodIdCounter;
        let currTotal = this.addTotal(props.FoodAmount)
        let index = _.findIndex(this.state.currentOrder, {'FoodID': props.FoodID})
        if(index >= 0) {
            const newArray = this.state.currentOrder.slice()
            newArray[index].Quantity += 1;
            newArray[index].DisplayAmount = this.adjustDisplayAmount(newArray[index])
            this.setState({
                currentOrder: newArray,
                foodIdCounter: this.state.foodIdCounter + 1,
                currentTotal: currTotal
            })
        } else {
        this.setState({
            currentOrder: this.state.currentOrder.concat(props),
            foodIdCounter: this.state.foodIdCounter + 1,
            currentTotal: currTotal
        })
        }
    }
    removeFromOrder(props) {
        let currTotal = this.subtractTotal(props.FoodAmount)
        let index = _.findIndex(this.state.currentOrder, {'FoodID': props.FoodID})
        if (props.Quantity > 1) {
            const newArray = this.state.currentOrder.slice()
            newArray[index].Quantity -= 1;
            newArray[index].DisplayAmount = this.adjustDisplayAmount(newArray[index])
            this.setState({
                currentOrder: newArray,
                currentTotal: currTotal
            })
        } else {
            this.setState({
                currentOrder: this.state.currentOrder.filter(function (x) {
                    return x.FoodIdCounter !== props.FoodIdCounter
                }), currentTotal: currTotal
            });
        }
    }

    adjustDisplayAmount(props){
        return this.formatToMoney(this.formatFromMoney(props.FoodAmount) * props.Quantity)
    }

    addTotal(price) {
        let currentTotal = this.state.currentTotal;
        currentTotal = this.formatFromMoney(currentTotal)
        currentTotal += this.formatFromMoney(price);
        return this.formatToMoney(currentTotal)
    }

    subtractTotal(price) {
        let currentTotal = this.state.currentTotal;
        currentTotal = this.formatFromMoney(currentTotal)
        currentTotal -= this.formatFromMoney(price);
        return this.formatToMoney(currentTotal)
    }

    formatFromMoney(value) {
        return Number(value.slice(1))
    }

    formatToMoney(value) {
        return formatter.format(value)
    }

    render() {
        return (

            <Grid divided='vertically' className='studentActionBody' >
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header size='large' textAlign='center'>Products</Header>
                        <Container className='transactionOrderContainer'>
                            <Table striped compact structured>
                                <Table.Header>
                                    <Table.Row textAlign='center'>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Price</Table.HeaderCell>
                                        <Table.HeaderCell>Category</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {_.map(this.state.data['food'], ({ FoodID, FoodName, FoodAmount, FoodCategory }) => (

                                        <Table.Row key={FoodID} textAlign='left'>
                                            <Table.Cell width='4'>{FoodName}</Table.Cell>
                                            <Table.Cell width='2' textAlign='center'>{FoodAmount}</Table.Cell>
                                            <Table.Cell width='2' textAlign='center'>{FoodCategory}</Table.Cell>
                                            <Table.Cell width='1' textAlign='center'><Button compact color='green' onClick={() => this.addToOrder({ FoodID, FoodName, FoodAmount, DisplayAmount: FoodAmount, Quantity: 1 })}>Add</Button></Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                    <Header size='large' textAlign='center'>Current Order</Header>
                            <Container className='transactionOrderContainer'>
                            <Table structured striped compact>
                                <Table.Header>
                                    <Table.Row textAlign='center'>
                                        <Table.HeaderCell width='4'>Product Name</Table.HeaderCell>
                                        <Table.HeaderCell width='2'>Quantity</Table.HeaderCell>
                                        <Table.HeaderCell width='2'>Price</Table.HeaderCell>
                                        <Table.HeaderCell width='1'></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body className='trasactionOrderTableBody'>
                                    {_.map(this.state.currentOrder, ({ FoodID, FoodName, Quantity, FoodAmount, DisplayAmount, FoodIdCounter }) => (
                                        <Table.Row key={FoodIdCounter} textAlign='left'>
                                            <Table.Cell width='4'>{FoodName}</Table.Cell>
                                            <Table.Cell width='2' textAlign='center'>{Quantity}</Table.Cell>
                                            <Table.Cell width='2' textAlign='center'>{DisplayAmount}</Table.Cell>
                                            <Table.Cell width='1' textAlign='center'><Button color='red' compact onClick={() => this.removeFromOrder({ FoodID, FoodName, FoodAmount, FoodIdCounter, Quantity, DisplayAmount })}>x</Button></Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell width='2' textAlign='center' verticalAlign='middle'></Table.HeaderCell>
                                        <Table.HeaderCell width='2' textAlign='right' verticalAlign='middle'><Header size='small'>Total</Header></Table.HeaderCell>
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

