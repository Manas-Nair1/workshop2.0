import React, { useState } from 'react'; 
import axios from 'axios'; 

const Home = () => {

//STEP 1: ENTER STATES HERE. THERE ARE 5 in total. Each step will go into creating all 5 states.

  // Function to handle changes in the genre input field
  const handleGenreInputChange = async (event) => {
//STEP 2: ENTER PROCEDURE FOR genreInput variable. THIS CONTAINS CONSOLE.LOG APPROACH.

//STEP 3: ENTER PROCEDURE FOR dropdownOptions variable. THIS CONTAINS API REQUEST APPROACH.
  };

  const createMovieCards = async (selectedGenre) => {
   //STEP 4: ENTER PROCEDURE FOR selectedGenre variable. THIS CONTAINS FOR LOOP APPROACH.
   //STEP 5: ENTER PROCEDURE FOR errorMessage variable.
   //STEP 6: ENTER PROCEDURE FOR movieCard variable. 
  };

  // Wrapper function to pass selected value to createMovieCards
  const handleSelectChange = (event) => {
    createMovieCards(event.target.value);
  };

  return (
    <div>
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
