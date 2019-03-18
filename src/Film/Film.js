import React from 'react';
import PropTypes from 'prop-types'

const Film = ({film}) => {
    let {title, crawl, date} = film;

    return (
        <section className="film">
            <h2>{title}</h2>
            <p className="crawl">{crawl}</p>
            <p>{date}</p>
        </section>
    )
}

Film.propTypes = {
    film: PropTypes.object.isRequired
}

export default Film;