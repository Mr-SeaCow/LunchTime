import React, { Component } from 'react'
import { Button, Menu, Image } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = { activeItem: 'Lunch Time' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='massive' inverted className='NavBar'>
        <Menu.Item header>
          <Image src='./lunchTime128.png' size='mini' />
        </Menu.Item>
        <Menu.Item
          className='navbarText'
          name='Lunch Time'
          active={activeItem === 'Lunch Time'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          className='navbarText'
          name='Students'
          active={activeItem === 'Students'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          className='navbarText'
          name='Food'
          active={activeItem === 'Food'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          className='navbarText'
          name='Transactions'
          active={activeItem === 'Transactions'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          {/* <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item> */}
          <Menu.Item>
            <Button inverted color='blue'>
              Log In
            </Button>
          </Menu.Item>
          <Menu.Item >
            <Button color='blue'>
              Sign Up
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}