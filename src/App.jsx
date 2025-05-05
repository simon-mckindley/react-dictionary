import { useState } from 'react'
import './App.css'
import Result from './components/Result.jsx'
import Error from './components/Error.jsx'

function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [word, setWord] = useState('')
  const [phonetics, setPhonetics] = useState([])
  const [meanings, setMeanings] = useState([])

  const input = document.getElementById("word");

  const getWordData = async () => {
    setErrorMessage(''); // Clear previous error message
    setWord('');
    setPhonetics([]);
    setMeanings([]);

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
      const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordInput);

      if (!response.ok) {
        throw new Error("Word not found");
      }

      const data = await response.json();

      setWord(data[0].word);
      setPhonetics(data[0].phonetics);
      setMeanings(data[0].meanings);
      input.value = "";
    } catch (err) {
      console.log(err.message);
      setErrorMessage("Word not found");
    }
  }

  return (
    <>
      <h1>Dictionary</h1>

      <form id="dictionary-form">
        <div className='inputs'>
          <input id="word" type="text" name="word" placeholder="Enter a word" required />
          <button type="button" onClick={getWordData}>Define</button>
        </div>
        <Error message={errorMessage} />
      </form>

      <Result word={word} phonetics={phonetics} meanings={meanings} />
    </>
  )
}

export default App
