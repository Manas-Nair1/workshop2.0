import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';

function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState({
      movietitle: '',
      year: '',
      overview: '',
      voter: ''
    });

    useEffect(() => {
      const fetchMovieDetails = async () => {
        
        const movieTitle = localStorage.getItem('movie-title');
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${movieTitle}`);
        const movieId = movieResponse.data.results[0].id;
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US`);
        const totalPopularity = creditsResponse.data.cast.reduce((total, castMember) => total + castMember.popularity, 0);
        const randomIndex = Math.floor(Math.random() * creditsResponse.data.cast.length);
        let geminiResponse = await run(creditsResponse.data.cast[randomIndex].character);
    
        try {
          const response = await axios.get('http://localhost:5000/sentiment', {
            params: {
              movie_title: movieTitle
            }
          });
          console.log('Response from Flask server:', response.data.scandal_score);
          localStorage.setItem('scandal', response.data.scandal_score);
          setMovieDetails(prevState => ({ ...prevState, sentimentValues: response.data.scandal_score }));
        } catch (error) {
          console.error('Error fetching sentiment values:', error);
        }
    
        let updatedMovieDetails = {
          movieTitle: movieTitle,
          year: localStorage.getItem('year'),
          review: localStorage.getItem('review').slice(0, 500),
          rating: localStorage.getItem('rating'),
          timewatched: localStorage.getItem('timewatched'),
          clout: movieResponse.data.results[0].popularity,
          attackDamage: totalPopularity,
          superpower: geminiResponse,
          image: `https://image.tmdb.org/t/p/w500${movieResponse.data.results[0].poster_path}`
        };
    
        setMovieDetails(updatedMovieDetails);
        let player1Movies = localStorage.getItem("player1");
        if (player1Movies !== '') {
        let player2Movies = [];
        // If no movies are stored yet, initialize an empty array
  
        // Append the new movie details object to the array
        player2Movies.push(updatedMovieDetails);
  
        // Store the updated array back to localStorage
        localStorage.setItem("player2", JSON.stringify(player2Movies));
        }
        else {
          player1Movies = [];
          player1Movies.push(updatedMovieDetails);
  
        // Store the updated array back to localStorage
         localStorage.setItem("player1", JSON.stringify(player1Movies));
        }
        if ((localStorage.getItem("player1")) === (localStorage.getItem("player2"))){
         localStorage.setItem("player2", '')
        }
    
        // try {
        //   const response = await axios.get('http://localhost:5000/saveCard', {
        //     params: {
        //       moviedetails: updatedMovieDetails
        //     }
        //   });
        //   localStorage.setItem('uid', response.data.UID);
        //   setUid(response.data);
        //   console.log(response.data.UID)
        // } catch (error) {
        //   console.error('Error fetching UID:', error);
        // }
      };
    
      fetchMovieDetails();
    }, []);
    
    return (
      <div className="v4_21" style={{ textAlign: 'center', backgroundColor: '#FFC0CB', minHeight: '100vh' }}>
        <div className="v3_2"></div>
        <span className="v3_5">{movieDetails.movieTitle}</span>
        <span className="v4_2">{movieDetails.year}</span>
        <span className="v4_13">{movieDetails.attackDamage}</span>
        <span className="v4_16">{movieDetails.clout}</span>
        <span className="v4_18">{movieDetails.review}</span>
        <span className="v4_19">{movieDetails.rating}</span>
        <span className="v4_20">{movieDetails.timewatched}</span>
        <span className="v4_14">{movieDetails.superpower}</span>
        <span className="v4_5">attack damage</span>
        <span className="v4_6">super power</span>
        <span className="v4_15">{localStorage.getItem('scandal')}</span>
        <div className="v4_8">
          <img id="image" src={movieDetails.image} alt="Stored Image" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
        <span className="v4_10">scandal score</span>
        <span className="v4_12">clout score</span>
        <span className="v4_17">your stats</span>
      </div>
  
    );
  }
  
  async function CreateDeck() {
    const numbers = [1, 2, 3, 4];
    const indexToRemove = numbers.indexOf(localStorage.getItem('random-int'));
    if (indexToRemove !== -1) {
      numbers.splice(indexToRemove, 1);
    }
    const deckVar = JSON.parse(localStorage.getItem('deck'));
    let totaldeck = [];
    let tempdeck = {};
  
    const promises = numbers.map(async (item) => {
      let tempmovie = deckVar[item].movietitle;
      let tempMovieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${tempmovie}`);
      let tempImage = `https://image.tmdb.org/t/p/w500${tempMovieResponse.data.results[0].poster_path}`;
      let tempOverview = tempMovieResponse.data.results[0].overview;
      let tempVoter = tempMovieResponse.data.results[0].vote_average;
      tempdeck = {
        image: tempImage,
        overview: tempOverview,
        voter: tempVoter
      };
      return tempdeck;
    });
  
    totaldeck = await Promise.all(promises);
    return totaldeck;
  }
  
  async function randomMovieCapture(){
    let randomMovieSelected = randomMovie();
    let randomMovieSelected2 = randomMovie();
    let movieTitle = randomMovieSelected.movieName
    let tempRmovie = movieTitle;
    let tempRMovieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${tempRmovie}`);
    let tempROverview = tempRMovieResponse.data.results[0].overview;
    let tempRVoter = tempRMovieResponse.data.results[0].vote_average;
    let tempRyear = tempRMovieResponse.data.results[0].release_date;
    let tempRdeck = {
      title: randomMovieSelected.movieName,
      image: randomMovieSelected.url,
      year : tempRyear,
      overview: tempROverview,
      voter: tempRVoter
    };
    localStorage.setItem('tempRdeck', JSON.stringify(tempRdeck))
    movieTitle = randomMovieSelected2.movieName
    tempRmovie = movieTitle;
    tempRMovieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${tempRmovie}`);
    tempROverview = tempRMovieResponse.data.results[0].overview;
    tempRVoter = tempRMovieResponse.data.results[0].vote_average;
    tempRyear = tempRMovieResponse.data.results[0].release_date;
    const tempR2deck = {
      title: randomMovieSelected2.movieName,
      year: tempRyear,
      image: randomMovieSelected2.url,
      overview: tempROverview,
      voter: tempRVoter
    };
    localStorage.setItem('tempR2deck', JSON.stringify(tempR2deck))
  }
  
  function DeckDetails({ totaldeck, onToggleClick }) {
    const deckVar = JSON.parse(localStorage.getItem('deck'));
    const randomVar = JSON.parse(localStorage.getItem('tempRdeck'))
    const randomVar2 = JSON.parse(localStorage.getItem('tempR2deck'))
    const handleBackToMovieDetails = () => {
      onToggleClick(); // Call the onToggleClick function passed from the App component
    };
    console.log(randomVar)
    console.log(randomVar2)
    return (
        <div className="v13_24" style={{ textAlign: 'center', backgroundColor: '#FFC0CB', minHeight: '100vh' }}>
          <button onClick={handleBackToMovieDetails}>Back to MovieDetails</button>
          <div className="v13_25">
            <div className="v13_2"></div>
            <span className="v13_3">{deckVar[1].movietitle}</span>
            <span className="v13_4">{deckVar[1].year}</span>
            <span className="v13_5">{totaldeck[0].overview}</span>
            <span className="v13_8">{totaldeck[0].voter}</span>
            <span className="v13_9"></span>
            <span className="v13_10"></span>
            <span className="v13_11"></span>
            <span className="v13_12">overview</span>
            <span className="v13_13"></span>
            <div className="v13_14" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img id="image" src={totaldeck[0].image} alt="Stored Image" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <span className="v13_15"></span>
            <span className="v13_16"></span>
            <span className="v13_17">voter average</span>
          </div>
          <div className="v13_26">
            <div className="v13_27"></div>
            <span className="v13_28">{deckVar[2].movietitle}</span>
            <span className="v13_29">{deckVar[2].year}</span>
            <span className="v13_30">{totaldeck[1].overview}</span>
            <span className="v13_31"></span>
            <span className="v13_32"></span>
            <span className="v13_33">{totaldeck[1].voter}</span>
            <span className="v13_34"></span>
            <span className="v13_35"></span>
            <span className="v13_36"></span>
            <span className="v13_37">overview</span>
            <span className="v13_38"></span>
            <div className="v13_39" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img id="image" src={totaldeck[1].image} alt="Stored Image" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <span className="v13_40"></span>
            <span className="v13_41"></span>
            <span className="v13_42">voter average</span>
          </div>
          <div className="v13_43">
            <div className="v13_44"></div>
            <span className="v13_45">{deckVar[3].movietitle}</span>
            <span className="v13_46">{deckVar[3].year}</span>
            <span className="v13_47">{totaldeck[2].overview}</span>
            <span className="v13_48"></span>
            <span className="v13_49"></span>
            <span className="v13_50">{totaldeck[2].voter}</span>
            <span className="v13_51"></span>
            <span className="v13_52"></span>
            <span className="v13_53"></span>
            <span className="v13_54">overview</span>
            <span className="v13_55"></span>
            <div className="v13_56" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img id="image" src={totaldeck[2].image} alt="Stored Image" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <span className="v13_57"></span>
            <span className="v13_58"></span>
            <span className="v13_59">voter average</span>
          </div>
          <div className="v13_94">
            <div className="v13_95"></div>
            <span className="v13_96">{randomVar.title}</span>
            <span className="v13_97">{randomVar.year}</span>
            <span className="v13_98">{randomVar.overview}</span>
            <span className="v13_99"></span>
            <span className="v13_100"></span>
            <span className="v13_101">{randomVar.voter}</span>
            <span className="v13_102"></span>
            <span className="v13_103"></span>
            <span className="v13_104"></span>
            <span className="v13_105">overview</span>
            <span className="v13_106"></span>
            <div className="v13_107" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img id="image" src={randomVar.image} alt="Stored Image" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <span className="v13_108"></span>
            <span className="v13_109"></span>
            <span className="v13_110">voter average</span>
          </div>
          <div className="v13_128">
            <div className="v13_129"></div>
            <span className="v13_130">{randomVar2.title}</span>
            <span className="v13_131">{randomVar2.year}</span>
            <span className="v13_132">{randomVar2.overview}</span>
            <span className="v13_133"></span>
            <span className="v13_134"></span>
            <span className="v13_135">{randomVar2.voter}</span>
            <span className="v13_136"></span>
            <span className="v13_137"></span>
            <span className="v13_138"></span>
            <span className="v13_139">overview</span>
            <span className="v13_140"></span>
            <div className="v13_141" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img id="image" src={randomVar2.image} alt="Stored Image" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <span className="v13_142"></span>
            <span className="v13_143"></span>
            <span className="v13_144">voter average</span>
          </div>
        </div>
    );
  }
  
  function App() {
    const [showMovieDetails, setShowMovieDetails] = useState(true);
    const [totalDeckData, setTotalDeckData] = useState([]);
    const [randomMovieData, setMovieData] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        const data = await CreateDeck();
        setTotalDeckData(data);
        await randomMovieCapture();
      }
      fetchData();
    }, []);
  
    const handleToggleClick = () => {
      setShowMovieDetails(!showMovieDetails);
    };
  
    
    return (
      <div>
        {showMovieDetails ? (
          <>
            <button onClick={handleToggleClick}>Toggle View</button>
            <MovieDetails />
          </>
        ) : (
          <DeckDetails totaldeck={totalDeckData} totalmovie={randomMovieData} onToggleClick={handleToggleClick} />
        )}
      </div>
    );
  }
  
  
  export default App;
  