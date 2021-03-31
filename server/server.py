from flask import Flask
from flask_cors import CORS
from blueprints.filterData.routes import filterDataBlueprint
from blueprints.movies.routes import moviesBlueprint
from blueprints.letterboxdData.routes import letterboxdDataBlueprint

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(moviesBlueprint)
app.register_blueprint(filterDataBlueprint)
app.register_blueprint(letterboxdDataBlueprint)
