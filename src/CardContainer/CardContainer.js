import React from 'react';
import Card from '../Card/Card.js'
import PropTypes from 'prop-types'

const CardContainer = (props) => {
    const activeName = props.activeName
    const activeItems = props.activeItems
    const activeCards = activeItems.map((activeCard, i) => (<Card key={i} activeCard={activeCard} addFavorite={props.addFavorite}/>))
    return (
        <div className='card-container'>
            <h2 className='active-cat'>{activeName}</h2>
            <section className='cards'>
                {activeCards}
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