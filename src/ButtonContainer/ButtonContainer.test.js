import React from 'react';
import { shallow } from 'enzyme';
import { ButtonContainer, mapStateToProps, mapDispatchToProps } from './ButtonContainer'
import { fetchPeople, fetchPlanets } from '../helpers/apis'
import { mockPeopleData } from '../helpers/mockData/mockPeopleData'
import { mockPlanetsData } from '../helpers/mockData/mockPlanetsData'

jest.mock('../helpers/_mocks_/apis')



describe('ButtonContainer', () => {
  let wrapper;
  let mockfn;

  beforeEach(()=> {
    mockfn = jest.fn();
    wrapper = shallow(<ButtonContainer storePeople={mockfn} storePlanets={mockfn}/>)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state', () => {
    wrapper = shallow(<ButtonContainer />, { disableLifecycleMethods: true })
    const defaultState = {
      errorMsg: ''
    }
    expect(wrapper.state()).toEqual(defaultState)
  })

  it.skip('should call displayPeople when People is clicked', () => {
    const navLink = wrapper.find('#people');
    const displayPeople = jest.fn();
    navLink.simulate('click')
    expect(displayPeople).toHaveBeenCalled();
  })

  it.skip('displayPeople should only call getPeople if there are no people in the store', () => {
    const mockState = {
      people: []
    }
    const mappedProps = mapStateToProps(mockState);
    const people = mappedProps.people;
    const getPeople = jest.fn();
    wrapper.instance().displayPeople()
    expect(getPeople).toHaveBeenCalled()
  })

  it.skip('should call fetchPeople with the correct url', async () => {
    const mockUrl = 'https://swapi.co/api/people';
    const fetchPeople = jest.fn().mockImplementation(()=> Promise.resolve(
      [
        {
          cardStyle: 'People',
          homeworld: 'Tatooine',
          id: 'http',
          name: 'Luke Skywalker',
          species: 'Human',
        }
      ]
    ))
    await wrapper.instance().getPeople()
    expect(fetchPeople).toHaveBeenCalledWith(mockUrl)
  })

  it('should call storePeople with the response from fetchPeople', async () => {
    await wrapper.instance().getPeople()
    expect(mockfn).toHaveBeenCalledWith(mockPeopleData)
  })

  it.skip('should set an error in state if the response from fetchPeople is not ok', async () => {
    await fetchPeople.mockImplementationOnce(() => Promise.reject(new Error ('Something went wrong')))
    const expected = 'Something went wrong'
    expect(wrapper.state('errorMsg')).toEqual(expected)
  })

  it.skip('should call storePlanets with the response from fetchPlanets', async () => {
    await wrapper.instance().getPlanets()
    expect(mockfn).toHaveBeenCalledWith(mockPlanetsData)
  })

  describe('mapStateToProps', () => {
    it('should return an object with an array of people', () => {
      const people = mockPeopleData;
      const mockState = {
        people: people
      }
      const expected = {
        people: people
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with an array of planets', () => {
      const planets = mockPlanetsData;
      const mockState = {
        planets: planets
      }
      const expected = {
        planets: planets
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    
    it('it should call dispatch when using storePeople', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storePeople(mockPeopleData)
      expect(mockDispatch).toHaveBeenCalled();
    })

    it('should call dispatch when using storePlanets', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storePlanets(mockPlanetsData)
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
  
})
