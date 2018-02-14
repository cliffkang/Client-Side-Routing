import React from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class MovieCard extends React.Component {
  
  state = {
    movie: null,
  };

  componentDidMount() {
    // change this line to grab the id passed on the URL
    let id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => this.setState(() => ({ movie: response.data })))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if(!this.state.movie) {
      return <div>Loading movie information...</div>
    }

    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
        <Router>
          <div>
            <Link to='/' component={MovieList}>Home</Link>
            {/* <Route path='/' component={MovieList} /> */}
          </div>
        </Router>
      </div>
    );
  }
}
