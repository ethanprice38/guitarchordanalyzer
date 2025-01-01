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

  useEffect(() => {
    const notes = Object.keys(frettedPositions).map((stringIndex) => {
      const fretIndex = frettedPositions[stringIndex];
      return getNote(openStrings[stringIndex], fretIndex);
    });
    onFretboardChanges(notes);
  }, [frettedPositions, onFretboardChanges]);

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
    },
  )
  };

  return (
    <svg
      width={(frets * fretWidth) + (margin * 2)}
      height={(strings) * stringSpacing + 40}
      style={{ border: 'none', color:'#FFFFFF', display: 'block', margin: '0 auto'}}
    >
      {/* Rounded background rectangle */}
      <rect
        x={0}
        y={0}
        width={(frets * fretWidth) + (margin * 2)}
        height={strings * stringSpacing + 40}
        rx={20}              // Rounded corner radius (horizontal)
        ry={20}                // Rounded corner radius (vertical)
        fill="#333333"         // Background color
      />
      {/* Draw frets */}
      <g transform="translate(8, -5)">
        {Array.from({ length: frets + 1 }).map((_, fretIndex) => (
          <line
            key={fretIndex}
            x1={fretIndex * fretWidth + margin}
            y1={margin}
            x2={fretIndex * fretWidth + margin}
            y2={strings * stringSpacing + 10}
            stroke="#FFF"
            strokeWidth={2}
          />
        ))}
        {/*Draw fret numbers */}
        {Array.from({length: frets + 1}).map((_,fretIndex) => (

          <text
          fill='white'
          x={fretIndex * fretWidth + margin - 22}
          y={strings * stringSpacing + margin + 4}
          fontSize="14px"
          fontFamily='Roboto'
          textAnchor="middle"
          style={{position:'relative', top: 20}}
          
          >
            {fretIndex}
          </text>

        ))}

        {/* Draw strings */}
        {Array.from({ length: strings }).map((_, stringIndex) => (
          <line
            key={stringIndex}
            x1={margin - 20}
            y1={stringIndex * stringSpacing + margin}
            x2={frets * fretWidth + margin}
            y2={stringIndex * stringSpacing + margin}
            stroke="#AAA"
            strokeWidth={.5 + .15*stringIndex}
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
                  r={9}
                  fill={frettedPositions[stringIndex] === fretIndex ? 'white' : 'transparent'}
                  stroke={frettedPositions[stringIndex] === fretIndex ? 'black' : 'transparent'}
                  strokeWidth={1}
                />
                {frettedPositions[stringIndex] === fretIndex && (
                  <text
                    fontFamily='Roboto'
                    x={fretIndex * fretWidth + margin - 20}
                    y={stringIndex * stringSpacing + margin + 4} // Adjusted y position for centering
                    fontSize="11"
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
      </g>
  </svg>
  );
}

export default InteractiveFretboard;