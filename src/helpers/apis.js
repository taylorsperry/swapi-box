import { cleanVehicles, cleanPlanets, cleanPeople } from './cleaners'
import { fetchData } from './fetchData'

export const fetchVehicles = async (url) => {
  const vehicles = await fetchData(url)
  const cleanedVehicles = await cleanVehicles(vehicles.results)
  return cleanedVehicles;
}

export const fetchPlanets = async (url) => {
  const planets = await fetchData(url)
  const cleanedPlanets = await cleanPlanets(planets.results)
  const withResidents = await fetchResidents(cleanedPlanets)
  return withResidents
}

export const fetchResidents = async (planets) => {
  const withResidents = planets.map( async planet => {
    const residentApis = planet.residents;
    const fetchedNames = await fetchNames(residentApis)
    return {...planet, residents: fetchedNames}
  })
  return Promise.all(withResidents)
}

export const fetchNames = async (residentApis) => {
  const names = residentApis.map(async residentApi => {
    const data = await fetchData(residentApi);
    return data.name;
  })
  return Promise.all(names)
}

export const fetchPeople = async (url) => {
  const people = await fetchData(url);
  const cleanedPeople = await cleanPeople(people.results)
  const withSpecies = await fetchSpecies(cleanedPeople)
  const withHomeworld = await fetchHomeworld(withSpecies)
  return withHomeworld;
}

export const fetchSpecies = async (cleanedPeople) => {
  const species = cleanedPeople.map(async person => {
    const data = await fetchData(person.species)
    return {...person, species: data.name};
  })
  return Promise.all(species)
}

export const fetchHomeworld = async (people) => {
  const homeworlds = people.map(async person => {
    const data = await fetchData(person.homeworld)
    return {...person, homeworld: data.name}
  })
  return Promise.all(homeworlds)
}

