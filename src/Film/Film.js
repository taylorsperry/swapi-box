import React from 'react';

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

export default Film;