from flask import Flask
from flask_cors import CORS
from blueprints.filterData.routes import filterDataBlueprint
from blueprints.movies.routes import moviesBlueprint
from blueprints.letterboxdData.routes import letterboxdDataBlueprint
from blueprints.torrent.routes import torrentBlueprint


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(moviesBlueprint, url_prefix='/api')
app.register_blueprint(filterDataBlueprint, url_prefix='/api')
app.register_blueprint(letterboxdDataBlueprint, url_prefix='/api')
app.register_blueprint(torrentBlueprint, url_prefix='/api')
