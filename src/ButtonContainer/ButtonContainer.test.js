import React from 'react';
import ButtonContainer from './ButtonContainer';
import { shallow } from 'enzyme'

describe('ButtonContainer', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ButtonContainer />)
    })

    describe('fetchPeople', () => {
        it('calls fetch with correct url', () => {
            
        //setup
        let mockUrl = 'www.starwars.com'
        let mockData = [{name: 'R2D2'}]
        fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData)
        }))
            
        //execution
        wrapper.instance().fetchPeople()
        
        //expectation
        expect(fetch).toHaveBeenCalledWith(mockUrl)
        })
    })

    describe('refinePeople', () => {
        it.skip('returns an array of objects with keys of name, homeworld, and species', () => {
            
        //setup
        const refinePeople = jest.fn();
        let mockPeople = [{
            "name": "Luke Skywalker",
            "height": "172",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/1/"
            ],
            "edited": "2014-12-20T21:17:56.891000Z"
        },
        {
            "name": "C-3PO",
            "height": "167",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/2/"
            ],
            "edited": "2014-12-20T21:17:50.309000Z"
        }]

        let mockRefined = [{
            "name": "Luke Skywalker",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/1/"
            ]
        },
        {
            "name": "C-3PO",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/2/"
            ]
        }]

        //execution
        wrapper.instance().refinePeople(mockPeople)
        
        //expectation
        expect(wrapper.refinePeople(mockPeople)).toHaveReturnedWith(mockRefined)
        })
    })
})