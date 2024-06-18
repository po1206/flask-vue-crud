############################
Run Server:

python -m venv env
pip install Flask==3.0.3 Flask-Cors==3.0.10
flask run --port=5001 --debug

Run Client:

cd client
npm install
npm run dev