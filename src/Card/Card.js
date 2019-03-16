import React from 'react'

const Card = ({name, homeworld, species, population}) => {
    
    return (
        <article className='card'>
            <p>{name}</p>
            <p>{homeworld}</p>
            <p>{species}</p>
            <p>{population}</p>
        </article>
    )
}

export default Card;