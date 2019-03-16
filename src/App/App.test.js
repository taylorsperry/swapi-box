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

      it('calls fetch with the correct url', () => {
        //setup
        fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData)
        }))

        //execution 
        wrapper.instance().fetchFilm(mockUrl)

        //expectation
        expect(fetch).toHaveBeenCalledWith(mockUrl)
      })

      it('throws an error when fetch is not ok', () => {
        //setup
        fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false
        }))

        //execution 
        wrapper.instance().fetchFilm(mockUrl)
          .catch(error => {
            //expectation 
            expect(error.message).toBe(error.message)
          })
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