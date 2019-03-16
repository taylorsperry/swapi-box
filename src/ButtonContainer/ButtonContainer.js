import React, {Component} from 'react';

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
            // .then(refinedPlanets => console.log(refinedPlanets))
            .then(refinedPlanets => this.fetchResidents(refinedPlanets))
    }

    refinePlanets = (parsedPlanets) => {
        let refinedPlanets = parsedPlanets.map(planet => {
            return {
                name: planet.name, 
                terrain: planet.terrain, 
                population: planet.population, 
                climate: planet.climate, 
                residents: planet.residents
            }
        })
        return refinedPlanets
    }

    fetchResidents = (planets) => {
        planets.forEach(planet => {
            let residents = planet.residents;
            residents.map(resident => {
                fetch(resident)
                    .then(response => response.json())
                    .then(parsedResident => console.log(parsedResident.name))
            })
        })
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