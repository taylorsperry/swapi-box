export const fetchPeople = jest.fn().mockImplementation(() => (
  [
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  },
  {
    cardStyle: 'People',
    homeworld: 'Tatooine',
    id: 'http',
    name: 'Luke Skywalker',
    species: 'Human',
  }
  ]
));

export const fetchPlanets = jest.fn().mockImplementation(() => (
  [
    {
      "cardStyle": "Planets", 
      "climate": "temperate", 
      "id": "https://swapi.co/api/planets/2/", 
      "planetName": "Alderaan", 
      "planetPopulation": "2000000000", 
      "residents": ["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"], 
      "terrain": "grasslands, mountains"
    }, 
    {
        "cardStyle": "Planets", 
      "climate": "temperate, tropical", 
      "id": "https://swapi.co/api/planets/3/", 
      "planetName": "Yavin IV", "planetPopulation": "1000", "residents": [], 
      "terrain": "jungle, rainforests"
    }, 
    {
      "cardStyle": "Planets", 
      "climate": "frozen", 
      "id": "https://swapi.co/api/planets/4/", 
      "planetName": "Hoth", 
      "planetPopulation": "unknown", 
      "residents": [], 
      "terrain": "tundra, ice caves, mountain ranges"
    }, 
    {
      "cardStyle": "Planets", 
      "climate": "murky", 
      "id": "https://swapi.co/api/planets/5/", 
      "planetName": "Dagobah", 
      "planetPopulation": "unknown", 
      "residents": [], 
      "terrain": "swamp, jungles"
    }
  ]
))