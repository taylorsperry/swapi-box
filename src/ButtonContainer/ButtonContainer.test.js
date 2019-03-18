import React from 'react';
import ButtonContainer from './ButtonContainer';
import { shallow } from 'enzyme'

describe('ButtonContainer', () => {
    let wrapper;
    let makeActiveMock = jest.fn();
    let displayFavsMock = jest.fn();
    
    beforeEach(() => {
        wrapper = shallow(<ButtonContainer makeActive={makeActiveMock} displayFavs={displayFavsMock}/>)
    })

    describe('fetchPeople, refinePeople, and fetchHomeworld', () => {
        let mockParsedPeople;
        let mockRefinedPeople;
        let mockSpecies;
        let mockWithHomeworld;

        beforeEach(() => {
            mockParsedPeople = [{
            "name": "Luke Skywalker",
            "height": "172",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/1/"
            ],
            "population": "200000"
        },
        {
            "name": "C-3PO",
            "height": "167",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/2/"
            ],
            "population": "200000"
        }]
        mockRefinedPeople = [{
            "cardStlye": "People",
            "name": "Luke Skywalker",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/1/"
            ]
        },
        {
            "cardStlye": "People",
            "name": "C-3PO",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": [
                "https://swapi.co/api/species/2/"
            ]
        }]
        mockSpecies = [{
            "cardStlye": "People",
            "name": "Luke Skywalker",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": "Human"
        },
        {
            "cardStlye": "People",
            "name": "C-3PO",
            "homeworld": "https://swapi.co/api/planets/1/",
            "species": "Droid"
        }]
        mockWithHomeworld = [{
            "cardStyle": "People",
            "name": "Luke Skywalker",
            "homeworld": "Tatooine",
            "species": "Human",
            "population": "200000"
        },
        {
            "cardStyle": "People",
            "name": "C-3PO",
            "homeworld": "Tatooine",
            "species": "Droid",
            "population": "200000"
        }]
        fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockWithHomeworld)
        }))
        })

        //fetchPeople
        it('calls fetch with correct url', () => {
            //execution
            wrapper.instance().fetchPeople()
            //expectation
            expect(fetch).toHaveBeenCalledWith('https://swapi.co/api/people')
        })

        it('calls makeActive with the correct data as a param', () => {
            //setup
            //execution
            wrapper.instance().fetchPeople().then(() => {
                 //expectation
                 expect(wrapper.makeActive).toHaveBeenCalledWith(mockWithHomeworld, 'People')
            }) 
        })

        it('sets state to People', () => {
            //execution
            wrapper.instance().fetchPeople().then(()=> {
                //expectation
                expect(wrapper.state('active')).toEqual('People')
            })
        })

        //refinePeople
        it.skip('returns an array of objects with keys of cardStyle, name, homeworld, and species', () => {
            //execution
            let expectedResult = wrapper.instance().refinePeople(mockParsedPeople)
            
            //expectation
            expect(expectedResult).toEqual(mockRefinedPeople)
            })

        //fetchSpecies
        it('fetches the species data for each object in the passed array', () => {
            //setup
            fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockSpecies)
            }))
            //execution
            let expectedResult = wrapper.instance().fetchSpecies(mockRefinedPeople).then(() => {
                //expectation
                expect(expectedResult).toEqual(mockSpecies)
            })
        })

        //fetchHomeworld
        it('fetches the homeworld data for each object in the passed array', () => {
            //setup
            fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockWithHomeworld)
            }))
            //execution
            let expectedResult = wrapper.instance().fetchSpecies(mockSpecies).then(() => {
                //expectation
                expect(expectedResult).toEqual(mockWithHomeworld)
            })
        })
    
    })

    describe('fetchPlanets, refinePlanets, fetchResidents, getNames', () => {
        
        let mockRefinedPlanets;
        let mockParsedPlanets;
        let mockWithResidentNames;
        beforeEach(() => {
            mockRefinedPlanets = [
                {
                    "cardStyle": "Planets",
                    "climate": "temperate",
                    "planetName": "Alderaan",
                    "planetPopulation": "2000000000",
                    "residents":[ "api1", "api2", "api3"],
                    "terrain": "grasslands, mountains"
                },
                {
                    "cardSyle": "Planets",
                    "climate": "temperate",
                    "planetName": "Bespin",
                    "planetPopulation": "6000000",
                    "residents": ["api4"],
                    "terrain": "gas giant"
                }
            ]
            mockParsedPlanets = [
                {
                    "climate": "temperate",
                    "planetName": "Alderaan",
                    "planetPopulation": "2000000000",
                    "residents":[ "api1", "api2", "api3"],
                    "terrain": "grasslands, mountains"
                },
                {
                    "climate": "temperate",
                    "planetName": "Bespin",
                    "planetPopulation": "6000000",
                    "residents": ["api4"],
                    "terrain": "gas giant"
                }
            ]
            mockWithResidentNames = [
                {
                    "cardStyle": "Planets",
                    "climate": "temperate",
                    "planetName": "Alderaan",
                    "planetPopulation": "2000000000",
                    "residents":[ "Leia Organa", "Bail Prestor Organa", "Raymus Antilles"],
                    "terrain": "grasslands, mountains"
                },
                {
                    "cardSyle": "Planets",
                    "climate": "temperate",
                    "planetName": "Bespin",
                    "planetPopulation": "6000000",
                    "residents": ["Lobot"],
                    "terrain": "gas giant"
                }

            ]
            fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockWithResidentNames)
            }))
        })
        
        //fetchPlanets
        it('calls fetch with the correct url', () => {
            //execution
            wrapper.instance().fetchPlanets()
            //expectation
            expect(fetch).toHaveBeenCalledWith('https://swapi.co/api/planets')
        })

        it('calls makeActive with the correct data as a param', () => {
            //execution
            wrapper.instance().fetchPlanets().then(() => {
                 //expectation
                 expect(wrapper.makeActive).toHaveBeenCalledWith(mockWithResidentNames, 'Planets')
            }) 
        })

        it('sets state to Planets', () => {
            //execution
            wrapper.instance().fetchPlanets().then(()=> {
                //expectation
                expect(wrapper.state('active')).toEqual('Planets')
            })
        })

        //refinePlanets
        it.skip('returns an array of objects with keys of cardStyle, planetName, terrain, planetPopulation, climate, and residents', () => {
            //execution
            let expectedResult = wrapper.instance().refinePlanets(mockParsedPlanets)
            
            //expectation
            expect(expectedResult).toEqual(mockRefinedPlanets)
        })
        
        //fetchResidents and getNames
        it.skip('calls getNames for each planet object in the passed array', () => {
            //setup
            const getNames = jest.fn()
            
            //execution
            wrapper.instance().fetchResidents(mockRefinedPlanets)

            //expectation
            expect(getNames).toHaveBeenCalledTimes(2)
        })

        //getNames 
        it('fetches the name of each resident in the passed array', () => {
            //setup
            let mockApis = ['api1', 'api2', 'api3']
            let mockResidentNames = [ "Leia Organa", "Bail Prestor Organa", "Raymus Antilles"]
            fetch = jest.fn().mockImplementation(() => Promise.resolve({
                json: mockResidentNames
            }))

            //exectution
            let expectedResult = wrapper.instance().getNames(mockApis).then(() => {
                //expectation
                expect(expectedResult).toEqual(mockResidentNames)
            })
        })

        it('fetches the resident data for each object in the passed array', () => {
            //setup
            fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockWithResidentNames)
            }))
            //execution
            let expectedResult = wrapper.instance().fetchResidents(mockRefinedPlanets).then(() => {
                //expectation
                expect(expectedResult).toEqual(mockWithResidentNames)
            })
        })
    })

    describe('fetchVehicles, refineVehicles', () => {
        let mockRefinedVehicles;
        let mockParsedVehicles;
        beforeEach(() => {
            mockRefinedVehicles = [
                {
                    "cardStyle": "Vehicles",
                    "vehicleName": "Sand Crawler",
                    "model": "Digger Crawler",
                    "vehicleClass": "wheeled",
                    "passengers": "30"
                },
                {
                    "cardStyle": "Vehicles",
                    "vehicleName": "TIE bomber",
                    "model": "TIE/sa bomber",
                    "vehicleClass": "space/planetary bomber",
                    "passengers": "0"
                }
            ]
            mockParsedVehicles = [
                {
                    "model": "Digger Crawler",
                    "passengers": "30",
                    "vehicle_class": "wheeled",
                    "name": "Sand Crawler"
                },
                {
                    "model": "TIE/sa bomber",
                    "passengers": "0",
                    "vehicle_class": "space/planetary bomber",
                    "name": "TIE bomber"
                }
            ]
            fetch = jest.fn().mockImplementation(() => Promise.resolve({
                json: mockParsedVehicles
            }))
        })

        //fetchVehicles

        it('calls fetch with the correct url', () => {
            //execution
            wrapper.instance().fetchVehicles()
            //expectation
            expect(fetch).toHaveBeenCalledWith('https://swapi.co/api/vehicles')
        })

        it('calls makeActive with the correct data as a param', () => {
            //execution
            wrapper.instance().fetchVehicles().then(() => {
                //expectation 
                expect(wrapper.makeActive).toHaveBeenCalledWith(mockRefinedVehicles, 'Vehicles')
            })
        })

        it('sets state to Vehicles', () => {
            //execution
            wrapper.instance().fetchVehicles().then(() => {
                //expectation
                expect(wrapper.state('active')).toEqual('Vehicles')
            })
        })

        //refineVehicles
        it('returns an array of objects with keys of cardStyle, vehicleName, model, vehicleClass, and passengers', () => {
            //execution
            let expectedResult = wrapper.instance().refineVehicles(mockParsedVehicles)
            //expectation
            expect(expectedResult).toEqual(mockRefinedVehicles)
        })
    })

    describe('selectFavorites', () => {
        it('calls displayFaves', () => {
            //execution
            wrapper.instance().selectFavorites()
            //expectation
            expect(displayFavsMock).toHaveBeenCalledTimes(1)
        })

        it('sets state to Favorites', () => {
            //execution
            wrapper.instance().selectFavorites()
            //expectation
            expect(wrapper.state('active')).toEqual('Favorites')
        })
    })
})

