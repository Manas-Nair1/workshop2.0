import React, { useState } from 'react'; 
import axios from 'axios'; 

const Home = () => {

//ENTER STATES HERE

  // Function to handle changes in the genre input field
  const handleGenreInputChange = async (event) => {
//ENTER setGenreInput HERE

//ENTER TRY AND CATCH HERE
  };

  // Function to create movie cards based on the selected genre
  const createMovieCards = async (selectedGenre) => {
   //ENTER IF STATEMENT FOR SETSELECTEDGENRE HERE

    try {
      //ENTER GENRE ID VARIABLE HERE
      //ENTER tempMovieCards VARIABLE HERE

    } catch (err) {

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

      {/* ENTER CONTAINER TO DISPLAY MOVIE CARDS HERE */}

    </div>
  );
};

export default Home;
