import React, {Component} from 'react';
import { promised } from 'q';

class ButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }

    //fetching people

    fetchPeople = () => {
        const url = 'https://swapi.co/api/people'
        fetch(url)
            .then(response => response.json())
            .then(parsedPeople => this.refinePeople(parsedPeople.results))
            .then(refinedPeople => this.fetchSpecies(refinedPeople))
            .then(withSpecies => this.fetchHomeworld(withSpecies))
            .then(withHomeworld => this.props.makeActive(withHomeworld, 'people'))
            .catch(error => {
                throw new Error(error.message)
            })
    }

    refinePeople = (parsedPeople) => {
        let refinedPeople = parsedPeople.map(person => {
            return {
                name: person.name, 
                homeworld: person.homeworld, 
                species: person.species}
        })
        return refinedPeople
    }

    fetchSpecies = (refinedPeople) => {
        let species = refinedPeople.map(person => {
            return fetch(person.species)
                .then(response => response.json())
                .then(parsedSpecies => ({...person, species: parsedSpecies.name}))
            })
        return Promise.all(species)
    }

    fetchHomeworld = (species) => {
        let homeworld = species.map(person => {
            return fetch(person.homeworld)
                .then(response => response.json())
                .then(parsedHomeworld => ({...person, homeworld: parsedHomeworld.name, population: parsedHomeworld.population}))
            })
        return Promise.all(homeworld)
    }

    //fetching planets 

    fetchPlanets = () => {
        const url = 'https://swapi.co/api/planets'
        fetch(url)
            .then(response => response.json())
            .then(parsedPlanets => this.refinePlanets(parsedPlanets.results))
            .then(refinedPlanets => this.fetchResidents(refinedPlanets))
            .then(withResidentNames => this.props.makeActive(withResidentNames, 'planets'))
    }

    refinePlanets = (parsedPlanets) => {
        let refinedPlanets = parsedPlanets.map(planet => {
            return {
                planetName: planet.name, 
                terrain: planet.terrain, 
                planetPopulation: planet.population, 
                climate: planet.climate, 
                residents: planet.residents
            }
        })
        return refinedPlanets
    }

    fetchResidents = (planets) => {
        let withPlanets = planets.map(planet => {
            let residentApis = planet.residents;
            return this.getNames(residentApis)
                .then(unresolvedNames => ({...planet, residents: unresolvedNames}))
        })
        return Promise.all(withPlanets)
    }

    getNames = (residentApis) => {
        let residentNames = residentApis.map(residentApi => {
            return fetch(residentApi)
                .then(response => response.json())
                .then(parsedName => parsedName.name)
        })
        return Promise.all(residentNames)
    }   

    render() {
    return (
        <section className="btn-container">
            <button onClick={this.fetchPeople}>People</button>
            <button onClick={this.fetchPlanets}>Planets</button>
            <button>Vehicles</button>
            <button>Favorites</button>
        </section>
    );
    }
};

export default ButtonContainer;