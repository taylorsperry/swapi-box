import React from 'react'

const Card = (props) => {
    const {activeName} = props
    ;
    switch(activeName) {
        case 'people':
            const {name, homeworld, species, population} = props
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {name}
                        <button className='fav-btn'>+</button>
                    </h3>
                    <p>Homeworld: {homeworld}</p>
                    <p>Species: {species}</p>
                    <p>Population: {population}</p>
                </article>
            )
        case 'planets': 
            const {planetName, terrain, planetPopulation, climate} = props
            const allResidents = props.residents
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {planetName}
                        <button className='fav-btn'>+</button>
                    </h3>
                    <p>Terrain: {terrain}</p>
                    <p>Population: {planetPopulation}</p>
                    <p>Climate: {climate}</p>
                    <ul>Residents: 
                        {allResidents.map((resident, i) => {
                            return (
                                <li key={i}>{resident}</li>
                            )}
                        )}
                    </ul>
                </article>
            )
        case 'vehicles':
            const {vehicleName, model, vehicleClass, passengers} = props
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {vehicleName}
                        <button className='fav-btn'>+</button>
                    </h3>
                    <p>Model: {model}</p>
                    <p>Class: {vehicleClass}</p>
                    <p>Passengers: {passengers}</p>
                </article>
            )
        default: 
            return (
                <article className='card'>
                    'Something went wrong'
                </article>
            )
    }
}

export default Card;