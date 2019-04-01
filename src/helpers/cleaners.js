export const cleanVehicles = (vehicles) => {
  return vehicles.map(vehicle => ({
    id: vehicle.url,
    cardStyle: 'Vehicles',
    vehicleName: vehicle.name,
    model: vehicle.model,
    vehicleClass: vehicle.vehicle_class,
    passengers: vehicle.passengers,
  })
)}

export const cleanPlanets = (planets) => {
  return planets.map(planet => ({
    id: planet.url,
    cardStyle: 'Planets',
    planetName: planet.name, 
    terrain: planet.terrain, 
    planetPopulation: planet.population, 
    climate: planet.climate, 
    residents: planet.residents
  })
)}

export const cleanPeople = (people) => {
  return people.map(person => ({
    id: person.url,
    cardStyle: 'People',
    name: person.name, 
    homeworld: person.homeworld, 
    species: person.species
  }))
}