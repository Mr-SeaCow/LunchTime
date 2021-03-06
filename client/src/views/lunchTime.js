import React from 'react'
import { Tab } from 'semantic-ui-react'
import LunchTimeBody from '../components/lunchTimePeriod'
import FoodPurchase from '../components/foodPurchase'
const panes = [
//   { menuItem: 'STUDENT ACTIONS MODAL', render: () => <Tab.Pane><FoodPurchase/></Tab.Pane>
// },
  { menuItem: 'Lunch 1', render: () => <Tab.Pane><LunchTimeBody lunchPeriod='1'> </LunchTimeBody></Tab.Pane> },
  { menuItem: 'Lunch 2', render: () => <Tab.Pane><LunchTimeBody lunchPeriod='2'></LunchTimeBody></Tab.Pane> }
]

const TabExampleBasic = () => <Tab  panes={panes} renderActiveOnly={true}/>

export default TabExampleBasic
