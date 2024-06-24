/*
import packages are when you want to access libraries or functions that you don't want to write yourself. These can be found within the 
package-lock.json.

The syntax is:

import FUNCTION, {FUNCTION} from NODE PACKAGE;

*/

import React, { useState } from 'react'; 
import axios from 'axios'; 

const Home = () => {
  /*These are where the useState variables will go. These usually come in last so that you know which elements you need to store. 
  They store information dynamically (the information can change) and you can access or call them whenever. The syntax goes either:
  let [VARIABLE_NAME, FUNCTION] = useState(VARIABLE_TYPE). There are two different types of varible states: let and const. 

  const: variable is read only. The variable can not be changed.
  let: variable is changeable. 

  You put these variable states before anytime you create a new variable.
  
  think of a certain search query as a state, for example "romance," which can change when the user decides to look up "action" instead
  to handle this. We uses states in react rather than static variables
  */

  // State to store the user input genre
  let [genreInput, setGenreInput] = useState(""); 
  // State to store the selected genre from the dropdown
  let [selectedGenre, setSelectedGenre] = useState(""); 
  // State to store the list of movie cards
  let [movieCards, setMovieCards] = useState([]); 
  // State to store genre options for the dropdown
  let [dropdownOptions, setDropdownOptions] = useState([]); 
  // State to store any error message
  let [errorMessage, setErrorMessage] = useState(""); 

  // Function to handle changes in the genre input field
  const handleGenreInputChange = async (event) => {
    setGenreInput(event.target.value); 
    /*
    event.target.value is something found within inspecting the website and console.log
    */

    try {
      // Fetch genre options from TMDB API based on the user input
      let response = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=bb76d810eac6dda796c6389702e136b2&query=${event.target.value}`);
      let options = response.data.results.map(result => result.name); // Extract genre names from the API response
      setDropdownOptions(options); // Update the dropdownOptions state
    } catch (err) {
      setErrorMessage("Error fetching genre options"); // Set error message if the API request fails
    }
  };

  // Function to create movie cards based on the selected genre
  const createMovieCards = async (selectedGenre) => {
    setSelectedGenre(selectedGenre); // Update the selectedGenre state
    if (!selectedGenre) return; // If no genre is selected, exit the function
    setErrorMessage(""); // Reset any previous error messages

    try {
      // Fetch genre ID from TMDB API based on the selected genre
      let genreResponse = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=bb76d810eac6dda796c6389702e136b2&query=${selectedGenre}`);
      let genreId = genreResponse.data.results[0].id;

      // Fetch movies from TMDB API based on the genre ID
      let moviesResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&sort_by=popularity.desc&page=1&with_keywords=${genreId}`);
      
      // Create an array to store the movie cards
      let  tempMovieCards = [];
      // Loop to create 5 different movie cards
      for (let i = 0; i < 5; i++) {
        let movie = moviesResponse.data.results[i];
        if (!movie) throw new Error("Movie data is undefined"); // Throw an error if movie data is undefined
        
        // Extract movie details from the API response
        let movietitle = movie.title;
        let movieimage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        let movieoverview = movie.overview;
        let movievoterAverage = movie.vote_average;
        let moviereleaseDate = movie.release_date;

        // Add movie details to the temporary array
        tempMovieCards.push({
          title: movietitle,
          image: movieimage,
          overview: movieoverview,
          voterAverage: movievoterAverage,
          releaseDate: moviereleaseDate
        });
      }

      // Update the movieCards state with the temporary array
      setMovieCards(tempMovieCards);
    } catch (err) {
      setErrorMessage("Error fetching movie data"); // Set error message if the API request fails
      setMovieCards([]); // Clear movie cards if there's an error
    }
  };

  // Wrapper function to pass selected value to createMovieCards
  const handleSelectChange = (event) => {
    createMovieCards(event.target.value);
  };

  return (
    <div>
      {/* Input field for entering genre */}
      <input
        type="text"
        placeholder="Enter genre"
        value={genreInput}
        onChange={handleGenreInputChange} // Call handleGenreInputChange function when the value changes
      />
      
      {/* Dropdown menu for selecting genre */}
      <h2>Which type of {genreInput} would you like?</h2>
      <select value={selectedGenre} onChange={handleSelectChange}> {/* Call handleSelectChange function when a genre is selected */}
        {dropdownOptions.map(option => (
          <option key={option} value={option}>{option}</option> // Render options dynamically based on available genre options
        ))}
      </select>

      {/* Display error message if any */}
      {errorMessage && <div className="error">{errorMessage}</div>}

      {/* Container to display movie cards */}
      <div className="container">
        {movieCards.map((movie, index) => ( // Loop through the movieCards and render movie cards
          <div key={index} className="card">
            <div className="rectangle">
              <div className="square">
                <img src={movie.image} alt={movie.title} /> {/* Display movie poster */}
              </div>
            </div>
            <div className="details">
              <h2>{movie.title}</h2> {/* Display movie title */}
              <p>{movie.releaseDate}</p> {/* Display movie release date */}
              <p>{movie.overview}</p> {/* Display movie overview */}
              <p>{movie.voterAverage}</p> {/* Display movie voter average */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
