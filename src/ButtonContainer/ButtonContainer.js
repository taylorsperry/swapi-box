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
        // this.props.setPeople()
    }

    refinePeople = (parsedPeople) => {
        let refinedPeople = parsedPeople.map(person => {
            return {name: person.name, homeworld: person.homeworld, species: person.species}
        })
        this.fetchSpecies(refinedPeople)
    }

    fetchSpecies = (refinedPeople) => {
        let species = refinedPeople.map(person => {
            return fetch(person.species)
                .then(response => response.json())
                .then(parsedSpecies => ({...person, species: parsedSpecies.name}))
        })
        console.log(Promise.all(species))
        return Promise.all(species)
    }

    // fetchSpecies = (refinedPeople) => {
    //     let species = refinedPeople.map(person => {
    //         return fetch(person.homeworld)
    //             .then(response => response.json())
    //             .then(parsedHomeworld => ({...person, homeworld: parsedHomeworld.name}))
    //     })
    //     console.log(Promise.all(species))
    //     return Promise.all(species)
    // }

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