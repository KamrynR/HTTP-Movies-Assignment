import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const MovieUpdate = props => {
    const [updateMovie, setUpdateMovie] = useState({
        id: new Date(),
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    let thisURL = (window.location.href).split('').pop();

    useEffect(() => {
        axios
            .get(`http://localhost:3333/api/movies/${thisURL}`)
            .then(res => {
                console.log(res);
                setUpdateMovie(res.data);
            })
            .catch(err => console.log(err));
      }, []);

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:3333/api/movies/${updateMovie.id}`, updateMovie)
        .then(res => {
            setUpdateMovie(res.data);
        })
        .catch(err => console.log(err));
    };

    const handleChange = e => {
        e.preventDefault();
        setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value});
    };

    return (
        <>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <label for='title'>Movie Title</label>
                <input
                name="title"
                type="text"
                value={updateMovie.title}
                onChange={handleChange}
                />
                <br/>
                <label for='director'>Director</label>
                <input
                name="director"
                type="text"
                value={updateMovie.director}
                onChange={handleChange}
                />
                <br/>
                <label for='metascore'>Metascore</label>
                <input
                name="metascore"
                type="text"
                value={updateMovie.metascore}
                onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
};