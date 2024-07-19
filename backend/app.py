import music21
from flask import Flask, request, jsonify
from flask_cors import CORS
from pychord import *

app = Flask(__name__)
CORS(app)

chords = {
    'major': [[0, 4, 7]], # 0 is root, 4 is major 3rd, 7 is perfect 5th
    'major 7': [[0, 4, 7, 11], [0, 4, 11]],
    'augmented': [[0, 4, 8]],
    '6': [[0, 4, 9]],
    'dominant 7': [[0, 4, 10]],
    '(add 9)': [[0, 2, 4], [0, 2, 4, 7]],
    'sus (add 9)': [[0, 2, 5]],

    'minor': [[0, 3, 7]], # 0 is root, 3 is minor 3rd, 7 is perfect 5th
    'minor (add 9)': [[0, 2, 3]],
    'minor (add 11)': [[0, 3, 5]],
    'dim': [[0, 3, 6]],
    'dim 7': [[0, 3, 6, 9]],
    'minor b6': [[0, 3, 8]],
    'minor 6': [[0, 3, 9]],
    'minor 7': [[0, 3, 10]],
    'minor major 7': [[0, 3, 11]],

    'sus2': [[0, 2, 7]],
    'sus4': [[0, 5, 7]],
    'sus2 (b6)': [[0, 2, 8]],
    '6 sus2': [[0, 2, 9]],
    '7 sus2': [[0, 2, 10]],
    'major 7 sus2': [[0, 2, 11]]
}

all_notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
notes_to_numbers = {note: index for index, note in enumerate(all_notes)}
# Assigns all notes a number starting at A (i.e A = 1, B = 3)

def find_interval(root_note: str, note: str):
    my_interval = (notes_to_numbers[note] - notes_to_numbers[root_note]) % len(all_notes)
    return my_interval

def analyze_all_intervals(*notes: str):
    intervals = []
    for root in notes:
        root_intervals = []
        for note in notes:
            current_interval = find_interval(root, note)
            if current_interval not in root_intervals:
                root_intervals.append(current_interval)
                root_intervals.sort()
        intervals.append(root_intervals)

    return intervals # intervals is an array that contains arrays of intervals when each note in notes is considered the tonic

@app.route('/analyze_chords', methods=['POST'])
def analyze_chords():
    data = request.get_json()
    notes = data['notes']
    intervals = analyze_all_intervals(*notes)
    matching_chords = []
    used_notes = []
    for current_interval, current_note in zip(intervals, notes):
        if current_note in used_notes:
            continue
        for chord_name, chord_intervals_list in chords.items():
            for chord_intervals in chord_intervals_list:
                if set(chord_intervals) == set(current_interval):
                    matching_chords.append(f"{current_note} {chord_name}")
                    used_notes.append(current_note)
                #else:
                    #find_chords_from_notes() # Need to provide chord name in the case it's not in my predefined list
                   # used_notes.append(current_note)

    return jsonify({'matching_chords': matching_chords})

if __name__ == '__main__':
    app.run(debug=True)