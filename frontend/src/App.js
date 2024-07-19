import React, { useState , useEffect, useRef} from 'react';
import './App.css';
import axios from 'axios';
import InteractiveFretboard from './InteractiveFretboard';

function App() {
  const [chords, setChords] = useState([]);
  const [frettedNotes, setFrettedNotes] = useState([])
  const firstRenderRef = useRef(true);

  const handleAnalyzeChords = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze_chords', { notes: frettedNotes });
      setChords(response.data.matching_chords);
    } catch (error) {
      console.error('Error analyzing chords:', error);
    }
  };


  const handleFretboardChanges = (updatedFretboardNotes) => {
    setFrettedNotes(updatedFretboardNotes)
  };

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    handleAnalyzeChords();
  }, [frettedNotes]);

  return (
    <div className="App">
      <h1>Guitar Chord Analyzer</h1>
      <div>
        
      </div>
      <div>
        <h2>Matching Chords:</h2>
        {chords.map((chord, index) => (
          <div key={index}>{chord}</div>
        ))}
      </div>
      
      <InteractiveFretboard className="fretboard" onFretboardChanges={handleFretboardChanges}/>
    </div>
  );
}

export default App;
