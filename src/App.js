import React, { useState } from 'react';
import Papa from 'papaparse';
import MovieDetails from './card';
import { run } from './gemini';
import {randomMovie} from './randomselection';
const Home = () => {
  localStorage.setItem('player1', '')
  const [parsedData, setParsedData] = useState(null);
  const [cardReady, setCardReady] = useState(false);
  const [winnerReady, setwinnerReady] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState(""); // Use useState for geminiResponse

  const toggleReady = () => {
    setCardReady(!cardReady);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data);
      }
    });
  };

  const createCard = () => {
    if (!parsedData) return; // Ensure parsedData is available

    const deck = [];
    for (let i = 0; i < 5; i++) { // Create 5 different movies
      const x = Math.floor(Math.random() * parsedData.length); // Generate random movie number index
      const movie = {
        movietitle: parsedData[x].Name,
        year: parsedData[x].Year,
        review: parsedData[x].Review,
        timewatched: parsedData[x].Date,
        rating: parsedData[x].Rating,
      };
      deck.push(movie);
    }
    localStorage.setItem('deck', JSON.stringify(deck))
    const x_second = Math.floor(Math.random() * 5);
    localStorage.setItem('random-int', x_second)
    localStorage.setItem('movie-title', deck[x_second].movietitle);
    localStorage.setItem('year', deck[x_second].year);
    localStorage.setItem('review', deck[x_second].review);
    localStorage.setItem('rating', deck[x_second].rating);
    localStorage.setItem('timewatched', deck[x_second].timewatched);
    console.log(parsedData); // Log parsedData if needed

    // Call the run function and update geminiResponse using setGeminiResponse
    run().then((result) => {
      setGeminiResponse(result);
      toggleReady();
    });
  };
  const randomMovieObject = randomMovie();
  function battle(){
    let player1 = JSON.parse(localStorage.getItem("player1"))[0]
    let player2 = JSON.parse(localStorage.getItem("player2"))[0]
    let player1Score = ((player1.attackDamage + player1.clout)* parseInt(player1.rating))
    let player2score = ((player2.attackDamage + player2.clout)* parseInt(player2.rating))
    if (player1Score > player2score) {
      localStorage.setItem("winner", player1.movieTitle)
    }
    else {
      localStorage.setItem("winner", player2.movieTitle)
    }
    localStorage.setItem('player1', "")
    localStorage.setItem('player2', "")
    setwinnerReady(true)
  }
  return (
    <div style={{ textAlign: 'center', backgroundColor: '#FFC0CB', minHeight: '100vh' }}>
    <input type="file" id="upload-file" accept=".csv" onChange={handleFileChange} style={{ fontSize: '18px', padding: '10px', backgroundColor: '#f0f0f0', border: '2px solid #ccc', borderRadius: '5px', marginBottom: '20px' }} />
    <br />
    <button id="upload-confirm" disabled={!parsedData} onClick={createCard} style={{ fontSize: '20px', padding: '15px 30px', backgroundColor: '#800080', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Upload File</button>
    {cardReady && (
        <MovieDetails></MovieDetails>
    )}
    <button id="battle" onClick={battle} style={{ fontSize: '20px', padding: '15px 30px', backgroundColor: '#800080', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }}>Battle</button>
    {winnerReady && (
        <p style={{ fontSize: '18px' }}>Winner: {localStorage.getItem("winner")}</p>
    )}
</div>
  );
}

export default Home;