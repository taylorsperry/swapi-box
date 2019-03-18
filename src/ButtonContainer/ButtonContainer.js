import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ButtonContainer extends Component {
    constructor(props) {
        super(props);
            this.state = {
                active: '',
                errorStatus: ''
            }
    }

    //fetching people

    fetchPeople = () => {
        const url = 'https://swapi.co/api/people'
        return fetch(url)
            .then(response => response.json())
            .then(parsedPeople => this.refinePeople(parsedPeople.results))
            .then(refinedPeople => this.fetchSpecies(refinedPeople))
            .then(withSpecies => this.fetchHomeworld(withSpecies))
            .then(withHomeworld => this.props.makeActive(withHomeworld, 'People'))
            .catch(error => {
                this.setState({
                    errorStatus: 'Error fetching people'
                })
            })
    }

    refinePeople = (parsedPeople) => {
        this.setState({
            active: 'People'
        });
        let refinedPeople = parsedPeople.map(person => {
            return {
                cardStyle: 'People',
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
                .catch(error => {
                    this.setState({
                        errorStatus: 'Error fetching people'
                    })
                })
            })
        return Promise.all(species)
    }

    fetchHomeworld = (species) => {
        let homeworld = species.map(person => {
            return fetch(person.homeworld)
                .then(response => response.json())
                .then(parsedHomeworld => ({...person, homeworld: parsedHomeworld.name, population: parsedHomeworld.population}))
                .catch(error => {
                    this.setState({
                        errorStatus: 'Error fetching people'
                    })
                })    
            })
        return Promise.all(homeworld)
    }

    //fetching planets 

    fetchPlanets = () => {
        const url = 'https://swapi.co/api/planets'
        return fetch(url)
            .then(response => response.json())
            .then(parsedPlanets => this.refinePlanets(parsedPlanets.results))
            .then(refinedPlanets => this.fetchResidents(refinedPlanets))
            .then(withResidentNames => this.props.makeActive(withResidentNames, 'Planets'))
            .catch(error => {
                this.setState({
                    errorStatus: 'Error fetching planets'
                })
            })
        }

    refinePlanets = (parsedPlanets) => {
        this.setState({
            active: 'Planets'
        });
        let refinedPlanets = parsedPlanets.map(planet => {
            return {
                cardStyle: 'Planets',
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
                .catch(error => {
                    this.setState({
                        errorStatus: 'Error fetching planets'
                    })
                })
            })
        return Promise.all(withPlanets)
    }

    getNames = (residentApis) => {
        let residentNames = residentApis.map(residentApi => {
            return fetch(residentApi)
                .then(response => response.json())
                .then(parsedName => parsedName.name)
                .catch(error => {
                    this.setState({
                        errorStatus: 'Error fetching planets'
                    })
                })
        })
        return Promise.all(residentNames)
    }
    
    //fetching vehicles

    fetchVehicles = () => {
        const url = 'https://swapi.co/api/vehicles'
        return fetch(url)
            .then(response => response.json())
            .then(parsedVehicles => this.refineVehicles(parsedVehicles.results))
            .then(refinedVehicles => this.props.makeActive(refinedVehicles, 'Vehicles'))
            .catch(error => {
                this.setState({
                    errorStatus: 'Error fetching vehicles'
                })
            })
        }

    refineVehicles = (parsedVehicles) => {
        this.setState({
            active: 'Vehicles'
        });
        let refinedVehicles = parsedVehicles.map(vehicle => {
            return {
                cardStyle: 'Vehicles',
                vehicleName: vehicle.name,
                model: vehicle.model,
                vehicleClass: vehicle.vehicle_class,
                passengers: vehicle.passengers,
                
            }
        })
        return refinedVehicles
    }

    //favorites 

    selectFavorites = () => {
        this.setState({
            active: 'Favorites'
        }, () => {
            this.props.displayFavs()
        })
    }

    render() {
    return (
        <section className="btn-container">
            <button className={this.state.active === 'People' ? 'button active' : 'button'} name='People'onClick={this.fetchPeople}>People</button>
            <button className={this.state.active === 'Planets' ? 'button active' : 'button'} name='Planets' onClick={this.fetchPlanets}>Planets</button>
            <button className={this.state.active === 'Vehicles' ? 'button active' : 'button'} name='Vehicles'onClick={this.fetchVehicles}>Vehicles</button>
            <button className={this.state.active === 'Favorites' ? 'button active' : 'button'} name='Favorites'onClick={this.selectFavorites}>{this.props.favCount} Favorites</button>
        </section>
    );
    }
};

ButtonContainer.propTypes = {
    makeActive: PropTypes.func.isRequired,
    favCount: PropTypes.number,
    displayFavs: PropTypes.func.isRequired
}

export default ButtonContainer;