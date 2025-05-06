import { useState } from 'react';
import './App.css';
import Result from './components/Result';
import Error from './components/Error';
import Spinner from './components/Spinner';

function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [word, setWord] = useState('')
  const [phonetics, setPhonetics] = useState([])
  const [meanings, setMeanings] = useState([])


  const getWordData = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    setErrorMessage(''); // Clear previous error message
    setWord('');
    setPhonetics([]);
    setMeanings([]);

    const input = document.getElementById("word");

    // Get the word from the input field
    let wordInput = input.value.trim().toLowerCase();

    if (!wordInput) {
      setErrorMessage("Please enter a word to define");
      return;
    }

    if (wordInput.includes(" ")) {
      setErrorMessage("Please enter a single word without spaces");
      return;
    }

    try {
      setLoading(true);
      // Fetch the word data from the API
      const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordInput);

      if (!response.ok) {
        throw new Error("Word not found");
      }

      const data = await response.json();

      setWord(data[0].word);
      setPhonetics(data[0].phonetics);
      setMeanings(data[0].meanings);
      input.value = "";
      input.blur();

    } catch (err) {
      console.log(err.message);
      setErrorMessage("Word not found");
    }

    setLoading(false);
  }

  return (
    <>
      <h1>Dictionary</h1>

      <form id="dictionary-form" onSubmit={getWordData}>
        <div className='inputs'>
          <input id="word" type="text" name="word" placeholder="Enter a word" />
          <button id="define-button" type="submit" >Define</button>
        </div>
        <Error message={errorMessage} />
      </form>

      {loading && <Spinner />}

      <Result word={word} phonetics={phonetics} meanings={meanings} />
    </>
  )
}

export default App
