import React from 'react';
import { shallow } from 'enzyme';
import ButtonContainer from './ButtonContainer'
import fetchPeople from '../helpers/apis'

jest.mock('../helpers/apis')

describe('ButtonContainer', () => {
  let wrapper;

  beforeEach(()=> {
    wrapper = shallow(<ButtonContainer />)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('getPeople calls fetchPeople', async () => {
    wrapper.instance().getPeople = jest.fn()
    wrapper.instance().getPeople()
    expect(fetchPeople).toHaveBeenCalled();
  })
})

// it.skip('should have a default state', () => {
//   wrapper = shallow(<ButtonContainer />, { disableLifecycleMethods: true })
//   const defaultState = {
//     errorMsg: ''
//   }
//   expect(wrapper.state()).toEqual(defaultState)
// })

// it.skip('displayPeople calls getPeople if there are no people in the store', () => {
//   //setup
//   const props = {people: []}
//   wrapper = shallow(<ButtonContainer {...props} />)
  

//   //execution
//   wrapper.instance().displayPeople()

//   //expectation 
//   expect(wrapper.getPeople).toHaveBeenCalled()
// })