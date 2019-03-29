import { combineReducers } from 'redux'
import { vehiclesReducer } from './vehiclesReducer'
import { planetsReducer } from './planetsReducer'
import { peopleReducer } from './peopleReducer'

export const rootReducer = combineReducers({
  vehicles: vehiclesReducer,
  planets: planetsReducer,
  people: peopleReducer,
})