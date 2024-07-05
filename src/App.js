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

//ENTER STATES HERE

  // Function to handle changes in the genre input field
  const handleGenreInputChange = async (event) => {
    /*
    console.log() is what is done in order to troubleshoot. 
    Troubleshooting is when you test your product step-by-step to see where you may be getting errors from.
    Here, I am console.log() event so that I can see what the result is of this variable.
    Within the video, you can see that event variable holds what my text input is on the search bar.
    */
    //console.log(event)
    setGenreInput(event.target.value); 
    /*
    Here, I am setting my setGenreInput state. This updates the variable genreInput.
    */

//ENTER TRY AND CATCH HERE
  };

  // Function to create movie cards based on the selected genre
  const createMovieCards = async (selectedGenre) => {
    setSelectedGenre(selectedGenre); // Update the selectedGenre variable state
    if (!selectedGenre) return; // If no genre is selected, exit the function
    setErrorMessage(""); // Reset any previous error messages

    try {
      // Fetch genre ID from TMDB API based on the selected genre
      let genreResponse = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=bb76d810eac6dda796c6389702e136b2&query=${selectedGenre}`);
      //console.log(genreResponse)
      /*
      There is a video demonstration on how we got the genreId.
      */
      let genreId = genreResponse.data.results[0].id;

      // Fetch movies from TMDB API based on the genre ID
      let moviesResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&sort_by=popularity.desc&page=1&with_keywords=${genreId}`);
      
      // Create an array to store the movie cards
      let  tempMovieCards = [];
      // Loop to create 5 different movie cards
      //ENTER FOR LOOP HERE

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

      {/* ENTER CONTAINER TO DISPLAY MOVIE CARDS HERE */}

    </div>
  );
};

export default Home;
