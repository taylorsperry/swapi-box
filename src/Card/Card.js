import React from 'react'

const Card = (props) => {
    const {activeCard} = props
    let style = activeCard.cardStyle
    ;
    switch(style) {
        case 'people':
            const {name, homeworld, species, population} = activeCard
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {name}
                        <button className='fav-btn' onClick={() => props.addFavorite(activeCard)}>+</button>
                    </h3>
                    <p>Homeworld: {homeworld}</p>
                    <p>Species: {species}</p>
                    <p>Population: {population}</p>
                </article>
            )
        case 'planets': 
            const {planetName, terrain, planetPopulation, climate} = activeCard
            const allResidents = activeCard.residents
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {planetName}
                        <button className='fav-btn' onClick={() => props.addFavorite(activeCard)}>+</button>
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
            const {vehicleName, model, vehicleClass, passengers} = activeCard
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {vehicleName}
                        <button className='fav-btn' onClick={() => props.addFavorite(activeCard)}>+</button>
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