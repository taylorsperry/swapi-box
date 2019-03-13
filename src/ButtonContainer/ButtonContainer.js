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
            .then(parsedPeople => this.setPeople(parsedPeople))
        // this.props.setPeople()
    }

    setPeople = (parsedPeople) => {
        console.log(parsedPeople.results)
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