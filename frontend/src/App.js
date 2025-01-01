import React, { useState , useEffect, useRef, useCallback} from 'react';
import './App.css';
import axios from 'axios';
import InteractiveFretboard from './InteractiveFretboard';

function App() {
  const [chords, setChords] = useState([]);
  const [frettedNotes, setFrettedNotes] = useState([])
  const firstRenderRef = useRef(true);

  const handleAnalyzeChords = async (notes) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze_chords', { notes });
      setChords(response.data.matching_chords);
    } catch (error) {
      console.error('Error analyzing chords:', error);
    }
  };

  const handleFretboardChanges = useCallback((updatedFretboardNotes) => {
    setFrettedNotes(updatedFretboardNotes);
  }, []);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (frettedNotes.length > 2) {
      handleAnalyzeChords(frettedNotes);
    }
  }, [frettedNotes]);

  return (
    <div style={{backgroundColor: '#1B1B1B'}}>
      <div className="App">
        <h1 style={{fontFamily: 'Roboto', color: 'whitesmoke'}}>Guitar Chord Analyzer</h1>
        <div>
          <InteractiveFretboard className="fretboard" onFretboardChanges={handleFretboardChanges}/>
        </div>
        <div style={{marginTop: '20px'}}>
          <span style={{fontFamily: 'Roboto', fontSize: '14pt', fontWeight:'bold', color: 'whitesmoke'}}>
            Possible Chord Names:
            {chords.slice().reverse().map((chord, index) => (
              <div key={index}>{chord}</div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
