import React, {Component} from 'react';

class ButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }

    fetchPeople = () => {
        const url = 'https://swapi.co/api/people'
        fetch(url)
            .then(response => response.json())
            .then(parsedPeople => this.refinePeople(parsedPeople.results))
            .then(refinedPeople => this.fetchSpecies(refinedPeople))
            .then(withSpecies => this.fetchHomeworld(withSpecies))
            .then(withHomeworld => this.props.activeInfo(withHomeworld))
            .catch(error => {
                throw new Error(error.message)
            })
    }

    refinePeople = (parsedPeople) => {
        let refinedPeople = parsedPeople.map(person => {
            return {name: person.name, homeworld: person.homeworld, species: person.species}
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

    render() {
    return (
        <section className="btn-container">
            <button onClick={this.fetchPeople}>People</button>
            <button>Planets</button>
            <button>Vehicles</button>
            <button>Favorites</button>
        </section>
    );
    }
};

export default ButtonContainer;