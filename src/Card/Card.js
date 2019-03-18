import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
    const {activeCard} = props
    let style = activeCard.cardStyle
    ;
    switch(style) {
        case 'People':
            const {name, homeworld, species, population} = activeCard
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {name}
                        <button className='fav-btn' onClick={() => props.addFavorite(activeCard)}>+</button>
                    </h3>
                    <p className='card-detail'>
                        <span className='label'>Homeworld: </span> 
                        {homeworld}
                    </p>
                    <p className='card-detail'>
                        <span className='label'>Species: </span>
                        {species}
                    </p>
                    <p className='card-detail'>
                        <span className='label'>Population: </span>
                        {population}
                    </p>
                </article>
            )
        case 'Planets': 
            const {planetName, terrain, planetPopulation, climate} = activeCard
            const allResidents = activeCard.residents
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {planetName}
                        <button className='fav-btn' onClick={() => props.addFavorite(activeCard)}>+</button>
                    </h3>
                    <p className='card-detail'>
                        <span className='label'>Terrain: </span>
                        {terrain}
                    </p>
                    <p className='card-detail'>
                        <span className='label'>Population: </span>
                        {planetPopulation}
                    </p>
                    <p className='card-detail'>
                        <span className='label'>Climate: </span>
                        {climate}
                    </p>
                    <ul className='card-detail ul'>
                        <span className='label'>Residents: </span>
                        {allResidents.map((resident, i) => {
                            return (
                                <li className='li' key={i}> {resident},</li>
                            )}
                        )}
                    </ul>
                </article>
            )
        case 'Vehicles':
            const {vehicleName, model, vehicleClass, passengers} = activeCard
            return (
                <article className='card'>
                    <h3 className='card-title'>
                        {vehicleName}
                        <button className='fav-btn' onClick={() => props.addFavorite(activeCard)}>+</button>
                    </h3>
                    <p className='card-detail'>
                        <span className='label'>Model: </span>
                        {model}
                    </p>
                    <p className='card-detail'>
                        <span className='label'>Class: </span>
                        {vehicleClass}
                    </p>
                    <p className='card-detail'>
                        <span className='label'>Passengers: </span>
                        {passengers}
                    </p>
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

Card.propTypes = {
    activeCard: PropTypes.object.isRequired
}

export default Card;