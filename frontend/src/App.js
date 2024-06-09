import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState([]);
  const [chords, setChords] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAnalyzeChords = async () => {
    const notesArray = inputValue.split(',').map(note => note.trim());
    setNotes(notesArray);

    try {
      const response = await axios.post('/analyze_chords', { notes: notesArray });
      setChords(response.data.matching_chords);
    } catch (error) {
      console.error('Error analyzing chords:', error);
    }
  };

  return (
    <div className="App">
      <h1>Guitar Chord Analyzer</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter notes separated by commas (e.g., C, E, G)"
        />
        <button onClick={handleAnalyzeChords}>Analyze Chords</button>
      </div>
      <div>
        <h2>Matching Chords:</h2>
        {chords.map((chord, index) => (
          <div key={index}>{chord}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
