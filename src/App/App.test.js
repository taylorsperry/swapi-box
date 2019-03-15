import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'

describe('App', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App />)
    })
  
    describe('fetchFilm', () => {
    let mockUrl = 'www.starwars.com'
    let mockData = [{title: 'A New Hope'}]
    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    }))

    it('calls fetch with the correct url', () => {
      //execution 
      wrapper.instance().fetchFilm(mockUrl)

      //expectation
      expect(fetch).toHaveBeenCalledWith(mockUrl)
    })
  })
  
  describe('selectFilm', () => {
    it('selects a random film from an array of films and sets it to state', () => {
      //setup
      let mockFilms = [{title: 'A New Hope'}]

      //execution
      wrapper.instance().selectFilm(mockFilms)

      //expectation
      expect(wrapper.state('film')).toEqual({title: 'A New Hope'})
    })
  })
})