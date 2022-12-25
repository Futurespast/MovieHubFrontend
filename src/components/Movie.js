import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';
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

  const [editFormData, setEditFormData] = useState({
    title: '',
    type: '',
    genre: '',
    description: '',
  });

  const [showEditForm, setShowEditForm] =useState(false);

  const [showReviews, setShowReviews] = useState(false);

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
        <button className='btn btn-primary' onClick={()=>setShowEditForm(true)}> Edit Movie</button>
        <button className='btn btn-primary' onClick={DeleteMovie}> Delete Movie </button>
        <button className='btn btn-primary' onClick={()=>setShowReviews(true)}> Show Reviews</button>
      </div>
    );
  }

  const DeleteMovie = async () =>{
    try {
      await axios.delete(`http://localhost:8080/api/Movies/${selectedMovie.id}`);
      const updatedMovies = movies.filter(movie => movie.id !== selectedMovie.id);
      setMovies(updatedMovies);
      setSelectedMovie(null)
    } catch (error) {
      console.error(error);
    }
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

  const handleEditChange = event => {
    const { name, value } = event.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }


    const handleEditMovie = async () =>{
      try {
        const updatedMovie = {
          title: editFormData.title,
          type: editFormData.type,
          genre: editFormData.genre,
          description: editFormData.description,
        };
        const response = await axios.put(`http://localhost:8080/api/Movies/${selectedMovie.id}`, updatedMovie);
        
          const updatedMovies = movies.map((movie) => {
            if (movie.id === selectedMovie.id) {
              return response.data;
            }
            return movie;
          });
          
          setMovies(updatedMovies);
        
        setShowEditForm(false);
        setEditFormData({
          title: '',
          type: '',
          genre: '',
          description: '',
        });
      } catch (error) {
        console.error(error);
      }
    }

    const EditMovieForm = () => {
      return (
        <form onSubmit={handleEditMovie}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={editFormData.title}
              onChange={handleEditChange}
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
              value={editFormData.type}
              onChange={handleEditChange}
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
              value={editFormData.genre}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Movie
          </button>
        </form>
      );
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
          {showEditForm && <EditMovieForm />}
          {showReviews && <Review movieId={selectedMovie.id}></Review>}
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