import React from 'react';
import Card from '../Card/Card.js'

const CardContainer = (props) => {
    const activeName = props.activeName
    const activeItems = props.activeItems
    const activeCards = activeItems.map((activeCard, i) => (<Card key={i} activeCard={activeCard} addFavorite={props.addFavorite}/>))
    return (
        <div>
            <h2>{activeName}</h2>
            <section className='card-container'>
                {activeCards}
            </section>
        </div>
    );
};

export default CardContainer;