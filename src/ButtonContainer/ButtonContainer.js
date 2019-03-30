import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { fetchVehicles, fetchPlanets, fetchPeople } from '../helpers/apis';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import { storeVehicles, storePlanets, storePeople } from '../actions/index'

class ButtonContainer extends Component {
  constructor(props) {
    super(props);
      this.state = {
        errorMsg: ''
      }
  }

  //fetching people

  displayPeople = () => {
    const { people } = this.props;
    if (!people.length) {
      this.getPeople()
    }
  }

  getPeople = async () => {
    const url = 'https://swapi.co/api/people'
    try {
      const people = await fetchPeople(url)
      this.props.storePeople(people)
    } catch (error) {
      this.setState({
        errorMsg: error.message
      })
    } 
  }



    //fetching planets 
    displayPlanets = () => {
      const { planets } = this.props;
      if(!planets.length) {
        this.getPlanets()
      }
    }

    getPlanets = async () => {
        const url = 'https://swapi.co/api/planets'
        try { 
          const planets = await fetchPlanets(url)
          this.props.storePlanets(planets)
        } catch (error) {
          this.setState({
            errorMsg: error.message
          })
        }
      }
    
    //fetching vehicles

    displayVehicles = () => {
      const { vehicles } = this.props;
      if (!vehicles.length) {
        this.getVehicles();
      }
    }

    getVehicles = async () => {
      const url = 'https://swapi.co/api/vehicles'
      try {
        const cleanVehicles = await fetchVehicles(url)
        this.props.storeVehicles(cleanVehicles)
      } catch (error) {
        this.setState({
          errorMsg: error.message
        })
      }
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
            <NavLink to='/people' className='button' name='people' onClick={this.displayPeople}>People</NavLink>
            <NavLink to='/planets' className='button' name='planets' onClick={this.displayPlanets}>Planets</NavLink>
            <NavLink to='/vehicles' className='button' name="vehicles" onClick={this.displayVehicles}>Vehicles</NavLink>
            <button className={this.state.active === 'Favorites' ? 'button active' : 'button'} name='Favorites'onClick={this.selectFavorites}>{this.props.favCount} Favorites</button>
        </section>
    );
    }
};

export const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
  planets: state.planets,
  people: state.people,
})

export const mapDispatchToProps = (dispatch) => ({
    storeVehicles: vehicles => dispatch(storeVehicles(vehicles)),
    storePlanets: planets => dispatch(storePlanets(planets)),
    storePeople: people => dispatch(storePeople(people)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonContainer));

ButtonContainer.propTypes = {
    makeActive: PropTypes.func.isRequired,
    favCount: PropTypes.number,
    displayFavs: PropTypes.func.isRequired
}