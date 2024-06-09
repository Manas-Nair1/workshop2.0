import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making API requests

const Home = () => {
  let [genre, setGenre] = useState(""); // State to store the selected genre
  let [deck, setDeck] = useState([]); // State to store the deck of movie cards
  let [genreOptions, setGenreOptions] = useState([]); // State to store genre options for the dropdown

  // Function to handle changes in the genre input field
  const handleGenreChange = async (event) => {
    setGenre(event.target.value); // Update the genre state with the value entered by the user
    // Fetch genre options from TMDB API based on the user input
    let genre_id = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=bb76d810eac6dda796c6389702e136b2&query=${genre}`);
    let options = genre_id.data.results.map(result => result.name); // Extract genre names from the API response
    setGenreOptions(options); // Update the genre options state
  };

  // Function to create movie cards based on the selected genre
  const createCard = async (event) => {
    setGenre(event.target.value);
    if (!genre) return; // If no genre is selected, exit the function
    // Fetch movies from TMDB API based on the selected genre
    console.log(genre)
    let tempDeck = [];
    let genre_id = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=bb76d810eac6dda796c6389702e136b2&query=${genre}`);
    console.log(genre_id)
    let movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&sort_by=popularity.desc&page=1&with_keywords=${genre_id.data.results[0].id}`);
    
    // Loop to create 5 different movie cards
    for (let i = 0; i < 5; i++) {
      // Extract movie details from the API response
      let title = movies.data.results[i].title;
      let image = `https://image.tmdb.org/t/p/w500${movies.data.results[i].poster_path}`;
      let overview = movies.data.results[i].overview;
      let voter_average = movies.data.results[i].vote_average;
      let release_date = movies.data.results[i].release_date;

      // Add movie details to the temporary deck
      tempDeck.push({
        title: title,
        image: image,
        overview: overview,
        voter_average: voter_average,
        release_date: release_date
      });
    }
    
    // Update the deck state with the temporary deck
    setDeck(tempDeck);
  };

  return (
    <div>
      {/* Input field for entering genre */}
      <input
        type="text"
        placeholder="Enter genre"
        value={genre}
        onChange={handleGenreChange} // Call handleGenreChange function when the value changes
      />
      
      {/* Dropdown menu for selecting genre */}
      <h2>Which type of {genre} would you like?</h2>
      <select value={genre} onChange={createCard}> {/* Call createCard function when a genre is selected */}
        {genreOptions.map(option => (
          <option key={option} value={option}>{option}</option> // Render options dynamically based on available genre options
        ))}
      </select>

      {/* Container to display movie cards */}
      <div className="container">
        {deck.map((tempDeck, index) => ( // Loop through the deck and render movie cards
          <div key={index} className="card">
            <div className="rectangle">
              <div className="square">
                <img src={tempDeck.image} alt={tempDeck.title} /> {/* Display movie poster */}
              </div>
            </div>
            <div className="details">
              <h2>{tempDeck.title}</h2> {/* Display movie title */}
              <p>{tempDeck.release_date}</p> {/* Display movie release date */}
              <p>{tempDeck.overview}</p> {/* Display movie overview */}
              <p>{tempDeck.voter_average}</p> {/* Display movie voter average */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
