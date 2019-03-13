import React, { Component } from 'react'
import Header from '../Header/Header.js'
import Film from '../Film/Film.js'
import ButtonContainer from '../ButtonContainer/ButtonContainer.js'
import CardContainer from '../CardContainer/CardContainer.js'
import './_App.scss';

// import PropTypes from 'prop-types'

class App extends Component {
  constructor() {
    super();
    this.state = {
      film: {},
      // people: [],
      planets: [],
      vehicles: [],
      favorites: []
    }
  };

  componentDidMount() {
    const url = 'https://swapi.co/api/';
    fetch(url)
      .then(response => response.json())
      .then(data => this.fetchFilm(data.films))
  };

  fetchFilm = (films) => {
    return fetch(films)
      .then(response => response.json())
      .then(parsedFilms => this.selectFilm(parsedFilms))
  };

  selectFilm = (parsedFilms) => {
    let max = parsedFilms.results.length;
    let index = Math.floor(Math.random() * Math.floor(max));
    let film = parsedFilms.results[index];
    this.setState({film: {title: film.title, crawl: film.opening_crawl, date: film.release_date}})
  }

  // setPeople = () => {
  //   console.log('hooked up')
  // }

  render() {
    const {film} = this.state;
    return (
      <div className="App">
        <Header />
        <Film film={film} />
        <ButtonContainer setPeople={this.setPeople}/>
        <CardContainer />
      </div>
    );
  }
}

// IdeaCard.propTypes = {
//   removeIdea: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   body: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired
// }

export default App;
