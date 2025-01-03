import React, { useState , useEffect, useRef, useCallback} from 'react';
import './App.css';
import axios from 'axios';
import InteractiveFretboard from './InteractiveFretboard';

function App() {
  const [chords, setChords] = useState([]);
  const [frettedNotes, setFrettedNotes] = useState([])
  const firstRenderRef = useRef(true);
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleAnalyzeChords = async (notes) => {
    try {
      const response = await axios.post('https://guitarchordanalyzer.onrender.com/analyze_chords', { notes });
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
        <h1 style={{fontFamily: 'Roboto', color: 'whitesmoke'}}>Guitar Chord Analyzer by Ethan Price</h1>
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
          <p style={{ marginTop: '90px', fontFamily: 'Roboto', fontSize: '14pt', fontWeight:'bold', color: 'whitesmoke'}}>
            IMPORTANT NOTE: This app is hosted on a free service, so it may take 15–60 seconds to start up when idle. Please click on the<br/>fretboard and allow some time for the app to respond before beginning to test chords. Thank you for your patience!
            <br/>Quick Start Guide:
          </p>
          <p style={{fontFamily: 'Roboto', fontSize: '12pt', color: 'whitesmoke', marginTop: '-10px'}}>
            <ol>
              <li>
                <ul>
                  <li style={{marginTop: '5px'}}>The bottom, thickest horizontal line represents the <b>low E string</b>.</li>
                  <li style={{marginTop: '5px'}}>The topmost horizontal line represents the <b>high E string</b>.</li>
                  <li style={{marginTop: '5px'}}>The vertical lines represent the <b>frets</b>.</li>
                </ul>
              </li>
              <li style={{marginTop: '10px'}}>
                <ul>
                  <li>Click or tap on any string between two frets 'play' a note, click again to remove that note</li>
                  <li style={{marginTop: '5px'}}>Names of common chords (i.e "Major 7") will appear, taking each note as the tonic, enjoy!</li>
                </ul>
              </li>
            </ol>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
