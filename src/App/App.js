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
      favorites: [],
      activeName: '',
      activeItems: [],
      errorStatus: ''
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
      .then(parsedFilms => this.selectFilm(parsedFilms.results))
      .catch(error => {
        this.setState({
          errorStatus: 'Error fetching films'
        })
      })
  };

  selectFilm = (parsedFilms) => {
    let max = parsedFilms.length;
    let index = Math.floor(Math.random() * Math.floor(max));
    let film = parsedFilms[index];
    this.setState({film: {title: film.title, crawl: film.opening_crawl, date: film.release_date}})
  }

  makeActive = (categoryInfo, categoryName) => {
    this.setState({
      activeName: categoryName,
      activeItems: categoryInfo
    }, () => console.log(this.state))
  }

  addFavorite = (activeCard) => {
    this.setState({
      favorites:[...this.state.favorites, activeCard]
    })
  }

  displayFavorites = () => {
    this.setState({
      activeName: 'Favorites',
      activeItems: this.state.favorites
    })
  }

  render() {
    const {film, activeItems, activeName} = this.state;
    return (
      <div className="App">
        <Header />
        <Film film={film} />
        <ButtonContainer makeActive={this.makeActive} favCount={this.state.favorites.length} displayFavs={this.displayFavorites}/>
        <CardContainer activeName={activeName} activeItems={activeItems} addFavorite={this.addFavorite}/>
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
