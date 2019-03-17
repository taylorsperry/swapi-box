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
                    <p>{homeworld}</p>
                    <p>{species}</p>
                    <p>{population}</p>
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
                    <p>{terrain}</p>
                    <p>{planetPopulation}</p>
                    <p>{climate}</p>
                    <ul>{allResidents.map((resident, i) => {
                        return (
                            <li>{i} {resident}</li>
                        )}
                    )}
                    </ul>
                </article>
            )
        default: 
            return (
                <article>
                    'Something went wrong'
                </article>
            )
    }
}

export default Card;