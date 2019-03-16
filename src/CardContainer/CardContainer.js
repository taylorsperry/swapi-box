import React from 'react';
import Card from '../Card/Card.js'

const CardContainer = ({activeCat}) => {
    const activeCards = activeCat.map((activeCard, i) => (<Card key={i} {...activeCard} />))
    return (
        <section className='card-container'>
            {activeCards}
        </section>
    );
};

export default CardContainer;