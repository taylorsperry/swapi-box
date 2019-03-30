import { vehiclesReducer } from './vehiclesReducer'

describe('vehiclesReducer', () => {
  it('should return default state if there is no action.type', () => {
    const initialState = [];
    const action = {};
    const results = vehiclesReducer(initialState, action);
    expect(results).toEqual(initialState)
  })

  it('should return an array of vehicles if the type is STORE_VEHICLES', () => {
    const initialState = [];
    const action = {type: 'STORE_VEHICLES', vehicles: ['one vehicle', 'another vehicle']}
    const expected = ['one vehicle', 'another vehicle']
    const results = vehiclesReducer(initialState, action);
    expect(results).toEqual(expected)
  })
})