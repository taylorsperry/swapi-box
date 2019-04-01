import * as actions from './index'

describe('storeVehicles', () => {
  it('shoud take in an array of vehicles and return an object with type STORE_VEHICLES', () => {
    const mockVehicles = ['one vehicle', 'another vehicle']
    const expected = { type: 'STORE_VEHICLES', vehicles: mockVehicles}
    const result = actions.storeVehicles(mockVehicles)
    expect(result).toEqual(expected)
  })
})

describe('storePlanets', () => {
    it('shoud take in an array of planets and return an object with type STORE_PLANETS', () => {
      const mockPlanets = ['one planet', 'another planet']
      const expected = { type: 'STORE_PLANETS', planets: mockPlanets}
      const result = actions.storePlanets(mockPlanets)
      expect(result).toEqual(expected)
    })
})

describe('storePeople', () => {
  it('shoud take in an array of people and return an object with type STORE_PEOPLE', () => {
    const mockPeople = ['one person', 'another person']
    const expected = { type: 'STORE_PEOPLE', people: mockPeople}
    const result = actions.storePeople(mockPeople)
    expect(result).toEqual(expected)
  })
})