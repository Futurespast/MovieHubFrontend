import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    genre: '',
    description: '',
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Movies');
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const handleClick = movie => {
    setSelectedMovie(movie);
  };

  const MoviesGrid = () => {
    return (
      <div className="d-flex flex-wrap justify-content-between">
        {movies.map(movie => (
          <div className="card mb-4" key={movie.id} onClick={() => handleClick(movie)}>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              {/* other movie details go here */}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const MovieDetails = () => {
    return (
      <div>
        <h4>{selectedMovie.title}</h4>
        <p>Type: {selectedMovie.type}</p>
        <p>Genre: {selectedMovie.genre}</p>
        <p>Description: {selectedMovie.description}</p>
      </div>
    );
  }

  const handleAddMovie = async () => {
    try {
      const newMovie = {
        title: formData.title,
        type: formData.type,
        genre: formData.genre,
        description: formData.description,
      };
      const response = await axios.post('http://localhost:8080/api/Movies', newMovie);
      setMovies([...movies, response.data]);
      setShowForm(false);
      setFormData({
        title: '',
        type: '',
        genre: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  const AddMovieForm = () => {
    return (
      <form onSubmit={handleAddMovie}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    );
  }
  return (
    <div className="container mt-5">
      <h1 className="mb-5">MovieHub</h1>
      {!selectedMovie && !showForm && (
        <div>
          <button className="btn btn-primary mb-5" onClick={() => setShowForm(true)}>
            Add Movie
          </button>
          <MoviesGrid />
        </div>
      )}
      {selectedMovie && (
        <div>
          <button className="btn btn-secondary mb-5" onClick={() => setSelectedMovie(null)}>
            Back to Movies
          </button>
          <MovieDetails />
          {/* Edit and delete buttons go here */}
          {/* Reviews component goes here */}
        </div>
      )}
      {showForm && (
        <div>
          <button className="btn btn-secondary mb-5" onClick={() => setShowForm(false)}>
            Back to Movies
          </button>
          <AddMovieForm />
        </div>
      )}
    </div>
  );
};

export default Movie;