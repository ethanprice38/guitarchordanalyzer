import React, { useEffect, useState } from 'react';


const chromaticScale = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const openStrings = ['E', 'B', 'G', 'D', 'A', 'E']

const getNote = (startNote, steps) => {
  const startIndex = chromaticScale.indexOf(startNote);
  const noteIndex = (startIndex + steps) % chromaticScale.length
  return chromaticScale[noteIndex]
}

function InteractiveFretboard({ className, onFretboardChanges }) {
  const frets = 15;
  const strings = 6;
  const fretWidth = 40;
  const stringSpacing = 20;
  const margin = 30;

  const [frettedPositions, setFrettedPositions] = useState({});

  const handleFretClick = (stringIndex, fretIndex) => {
    setFrettedPositions(prevPositions => {
      if (prevPositions[stringIndex] === fretIndex) {
        const { [stringIndex]: removed, ...rest } = prevPositions;
        return rest;
      }
      return {
        ...prevPositions,
        [stringIndex]: fretIndex
      }
    })
  };

  useEffect(() => {
    const notes = Object.keys(frettedPositions).map((stringIndex) => {
      const fretIndex = frettedPositions[stringIndex]
      return getNote(openStrings[stringIndex], fretIndex)
    });
    onFretboardChanges(notes)
  }, [frettedPositions, onFretboardChanges]);


  return (
    <svg
      width={(frets * fretWidth) + (margin * 2)}
      height={(strings) * stringSpacing + 20}
      style={{ border: 'none' }}
    >
      {/* Draw frets */}
      {Array.from({ length: frets + 1 }).map((_, fretIndex) => (
        <line
          key={fretIndex}
          x1={fretIndex * fretWidth + margin}
          y1={margin}
          x2={fretIndex * fretWidth + margin}
          y2={strings * stringSpacing + 10}
          stroke="black"
          strokeWidth={1.5}
        />
      ))}

      {/* Draw strings */}
      {Array.from({ length: strings }).map((_, stringIndex) => (
        <line
          key={stringIndex}
          x1={margin - 20}
          y1={stringIndex * stringSpacing + margin}
          x2={frets * fretWidth + margin}
          y2={stringIndex * stringSpacing + margin}
          stroke="black"
        />
      ))}

       {/* Draw interactive frets */}
       {Array.from({ length: strings }).map((_, stringIndex) => (
        <React.Fragment key={`string-${stringIndex}`}>
          {/* Draw frets including open string */}
          {Array.from({ length: frets + 1 }).map((_, fretIndex) => (
            <g
              key={`fret-${stringIndex}-${fretIndex}`}
              onClick={() => handleFretClick(stringIndex, fretIndex)}
            >
              <circle
                cx={fretIndex * fretWidth + margin - 20}
                cy={stringIndex * stringSpacing + margin}
                r={8}
                fill={frettedPositions[stringIndex] === fretIndex ? 'white' : 'transparent'}
                stroke={frettedPositions[stringIndex] === fretIndex ? 'black' : 'transparent'}
                strokeWidth={1}
              />
              {frettedPositions[stringIndex] === fretIndex && (
                <text
                  x={fretIndex * fretWidth + margin - 20}
                  y={stringIndex * stringSpacing + margin + 4} // Adjusted y position for centering
                  fontSize="10"
                  textAnchor="middle"
                  fill='black'
                  style={{ userSelect: 'none' }} // Prevent text selection
                >
                  {getNote(openStrings[stringIndex], fretIndex)}
                </text>
              )}
            </g>
          ))}
        </React.Fragment>
      ))}
    </svg>
  );
}

export default InteractiveFretboard;