import React from 'react';
import ButtonContainer from './ButtonContainer';
import { shallow } from 'enzyme'

describe('ButtonContainer', () => {
    let wrapper;
    let makeActiveMock = jest.fn();
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
    
    beforeEach(() => {
        wrapper = shallow(<ButtonContainer makeActive={makeActiveMock}/>)
        fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve()
        }))
    })

    describe('fetchPeople', () => {
        it('calls fetch with correct url', () => {
        
        //execution
        wrapper.instance().fetchPeople()
        
        //expectation
        expect(fetch).toHaveBeenCalledWith('https://swapi.co/api/people')
        })

        it('should call makeActive with the fetched data as a param', () => {
        //setup
        // let fetchPeople = jest.fn(() => mockPeople)
        
        //execution
        wrapper.instance().fetchPeople()
            .then(expect(wrapper.makeActive).toHaveBeenCalledWith('a'))
        
        //expectation
        })
    })

    describe('refinePeople', () => {
        it('returns an array of objects with keys of name, homeworld, and species', () => {
            
        //setup
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
        let expected = wrapper.instance().refinePeople(mockPeople)
        
        //expectation
        expect(expected).toEqual(mockRefined)
        })
    })
})