import React from 'react';
import Card from '../Card/Card.js'
import PropTypes from 'prop-types'

const CardContainer = ({ cards }) => {
    const displayCards = cards.map(card => (
        <Card key={card.id} {...card} />
    ))
    // const activeName = props.activeName
    // const activeItems = props.activeItems
    // const activeCards = activeItems.map((activeCard) => (<Card key={activeCard.id} {...activeCard} addFavorite={props.addFavorite}/>))
    return (
        <div className='card-container'>
            {/* <h2 className='active-cat'>{activeName}</h2> */}
            <section className='cards'>
                {displayCards}
            </section>
        </div>
    );
};

CardContainer.propTypes = {
    activeName: PropTypes.string.isRequired,
    // activeItems: PropTypes.array.isRequired,
    addFavorite: PropTypes.func.isRequired
}
export default CardContainer;