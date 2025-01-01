A guitar chord analyzer

How to Run the Guitar Chord Analyzer Locally:

Prerequisites:
Install Python (3.8 or later).
Install Node.js (16.x or later).
Install a package manager like pip (for Python) and npm (for Node.js).
Install Git to clone the repository.

Clone the repository, by opening cmd and cloning it into where you desire it to be
git clone https://github.com/ethanprice38/guitarchordanalyzer.git
Move into the repository on your local system
cd ./guitarchordanalyzer
Navigate to the backend
cd backend
Create and activate a venv
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
Create a new .txt file named requirements.txt within the ./backend/.venv/Scripts folder, paste the following in it:
Flask==3.0.3\ Flask-Cors==4.0.1\ music21==9.1.0\ pychord==1.2.2\ requests==2.32.3
Run these two commands while your venv is activated:
pip install -r requirements.txt
flask run
Navigate to the frontend and run the following commands:
cd ./frontend
npm install
npm start

Open your browser and go to http://localhost:3000 to interact with the guitar chord analyzer. Enjoy!