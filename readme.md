A guitar chord analyzer

This is available at the following link: https://guitarchordanalyzer-lq9h.onrender.com/

OR

How to Run the Guitar Chord Analyzer Locally:

Prerequisites:
Install Python (3.8 or later).
Install Node.js (16.x or later).
Install a package manager like pip (for Python) and npm (for Node.js).
Install Git to clone the repository.

Clone the repository, by opening cmd and cloning it into where you desire it to be</br>
`git clone https://github.com/ethanprice38/guitarchordanalyzer.git`</br>
Move into the repository on your local system</br>
`cd ./guitarchordanalyzer`</br>
Navigate to the backend</br>
`cd backend`</br>
Create and activate a venv</br>
`python -m venv venv`</br>
`source venv/bin/activate  # On macOS/Linux`</br>
`venv\Scripts\activate     # On Windows`</br>
Create a new .txt file named requirements.txt within the ./backend/.venv/Scripts folder, paste the following in it:</br>
`Flask==3.0.3\ Flask-Cors==4.0.1\ music21==9.1.0\ pychord==1.2.2\ requests==2.32.3`</br>
Run these two commands while your venv is activated:</br>
`pip install -r requirements.txt`</br>
`flask run`</br>
Navigate to the frontend and run the following commands:</br>
`cd ./frontend`</br>
`npm install`</br>
`npm start`</br>

Open your browser and go to http://localhost:3000 to interact with the guitar chord analyzer. Enjoy!