import React from 'react'

const Card = (props) => {
    const {name, homeworld, species, population} = props;
    return (
        <article className='card'>
            <h3 className='card-title'>
                {name}
                <button className='fav-btn'>+</button>
            </h3>
            <p>{homeworld}</p>
            <p>{species}</p>
            <p>{population}</p>
        </article>
    )
}

export default Card;