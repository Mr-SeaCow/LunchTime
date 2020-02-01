import _ from 'lodash'
import React, { Component } from 'react'
import {Loader, Image, Segment, Table, Grid, Button,Input } from 'semantic-ui-react'
import axios from 'axios'
import TransactionModule from './studentActions'
const buttonSize = 'large'

const grades = { 1: ['1', '2', '3', '4', '5'], 2: ['6', '7', '8', '9', '10', '11', '12'] }
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default class TableExampleSortable extends Component {
  constructor(props) {
    super()
    this.state = {
      column: null,
      baseData: null,
      filteredData: null,
      direction: null,
      activeFilter: '',
      activeName: 'FirstName',
      lunchPeriod: props.lunchPeriod,
      open: false,
      studentInfo: null
    }
  }

  handleOpen = (StudentID) => { this.setState({studentInfo: _.filter(this.state.baseData, { 'StudentID': StudentID })[0], open: true})}
  handleClose = () => this.setState({ open: false })

  swapFirstLast = (e, { name }) => this.setState({ activeName: name })

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

  filterGrade(filter) {
    const grade = filter.currentTarget.name
    const { baseData, activeFilter } = this.state
    if (grade !== activeFilter) {
      this.setState({
        filteredData: _.filter(baseData, { 'GradeNumber': grade }),
        activeFilter: grade
      })
    } else {
      this.setState({
        filteredData: baseData,
        activeFilter: ''
      })
    }

    return
  }

  filterName(filter) {
    const letter = filter.currentTarget.name
    const { baseData, activeFilter, activeName } = this.state
    if (letter !== activeFilter) {
      this.setState({
        filteredData: _.filter(baseData, function (student) { return student[activeName].startsWith(letter) }),
        activeFilter: letter
      })
    } else {
      this.setState({
        filteredData: baseData,
        activeFilter: ''
      })
    }

    return
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

  refreshState(newLunchPeriod) {
    this.getDataStudents(newLunchPeriod).then(data => {
      this.setState({
            baseData: data.data.recordset,
            filteredData: data.data.recordset,
            direction: null,
            lunchPeriod: newLunchPeriod,
            column: null
      }, () => {
        this.render()})
    })
  }

  getDataStudents(lunchPeriod){
   return axios.get(`http://localhost:3001/getStudents?LunchPeriod=${lunchPeriod}`, {headers: {'Access-Control-Allow-Origin': '*'}})   
  }

  render() {
    if (this.state.baseData === null){
      this.refreshState(this.props.lunchPeriod)
     return (
      <Segment>
      <Loader active />
  
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
    );}

    const { column, direction, filteredData, activeFilter, activeName, lunchPeriod } = this.state
    const newLunchPeriod = this.props.lunchPeriod

    if (lunchPeriod !== newLunchPeriod && lunchPeriod !== undefined) this.refreshState(newLunchPeriod);
    let letterButtons = [];
    let gradeButtons = []

    for (let i = 0; i < letters.length; i += 6) {
      if (letters.length - i < 6) {
        letterButtons.push(
          <Button.Group key={i} className="sort">
            <Button compact disabled size={buttonSize}></Button>
            <Button compact disabled size={buttonSize}></Button>
            <Button compact size={buttonSize} name={letters[i]} active={activeFilter === letters[i]}
              onClick={this.filterName.bind(this)}>{letters[i]}</Button>
            <Button compact size={buttonSize} name={letters[i + 1]} active={activeFilter === letters[i + 1]}
              onClick={this.filterName.bind(this)}>{letters[i + 1]}</Button>
            <Button compact disabled size={buttonSize}></Button>
            <Button compact disabled size={buttonSize}></Button>
          </Button.Group>
        );
      } else {
        letterButtons.push(
          <Button.Group key={i} className="sort">
            <Button compact size={buttonSize} name={letters[i]} active={activeFilter === letters[i]}
              onClick={this.filterName.bind(this)}>{letters[i]}</Button>
            <Button compact size={buttonSize} name={letters[i + 1]} active={activeFilter === letters[i + 1]}
              onClick={this.filterName.bind(this)}>{letters[i + 1]}</Button>
            <Button compact size={buttonSize} name={letters[i + 2]} active={activeFilter === letters[i + 2]}
              onClick={this.filterName.bind(this)}>{letters[i + 2]}</Button>
            <Button compact size={buttonSize} name={letters[i + 3]} active={activeFilter === letters[i + 3]}
              onClick={this.filterName.bind(this)}>{letters[i + 3]}</Button>
            <Button compact size={buttonSize} name={letters[i + 4]} active={activeFilter === letters[i + 4]}
              onClick={this.filterName.bind(this)}>{letters[i + 4]}</Button>
            <Button compact size={buttonSize} name={letters[i + 5]} active={activeFilter === letters[i + 5]}
              onClick={this.filterName.bind(this)}>{letters[i + 5]}</Button>
          </Button.Group>
        );
      }
    }

    for (let i = 0; i < grades[lunchPeriod].length; i++) {
      gradeButtons.push(
        <Button key={i} compact size={buttonSize} name={grades[lunchPeriod][i]} active={activeFilter === grades[lunchPeriod][i]}
          onClick={this.filterGrade.bind(this)}>{grades[lunchPeriod][i]}</Button>
      );
    }
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}> 
          <Grid.Column>
          <Input className='searchStudents lunchTime' icon='users' iconPosition='left' placeholder='Search students....' fluid onChange={this.search.bind(this)}/>
          <div className="studentTable">
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
                {_.map(filteredData, ({ StudentID, FirstName, LastName, GradeNumber }) => (
                  <Table.Row key={StudentID} onClick={() => this.handleOpen(StudentID)}>
                    <Table.Cell textAlign='center' >{GradeNumber}</Table.Cell>
                    <Table.Cell >{FirstName}</Table.Cell>
                    <Table.Cell >{LastName}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          </Grid.Column>
          <Grid.Column className="sort group" verticalAlign={"middle"}>
            <Button.Group className="sort grade" >
              {gradeButtons}
            </Button.Group>
            <Button.Group className="sort">
              <Button compact size={buttonSize} name="FirstName" active={activeName === 'FirstName'}
                onClick={this.swapFirstLast}>First Name</Button>
              <Button compact size={buttonSize} name="LastName" active={activeName === 'LastName'}
                onClick={this.swapFirstLast}>Last Name</Button>
            </Button.Group>

            {letterButtons}
            <TransactionModule open={this.state.open} studentInfo={this.state.studentInfo} handleClose={() => this.handleClose()}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}
