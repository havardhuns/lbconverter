from flask import Blueprint, request
import json
from db import dbLbData


letterboxdDataBlueprint = Blueprint('letterboxdData', __name__)

@letterboxdDataBlueprint.route('/upload', methods = ['POST'])
def upload_file_return_data():
    dbLbData.delete_many({})
    file = request.files["file"]
    movieTitles = {"titles": []}
    for line in file:
        movieTitles["titles"].append(str(line).split(",")[1].strip('"'))
    print(movieTitles)
    dbLbData.insert_one((movieTitles))
    return "lol"

@letterboxdDataBlueprint.route('/clearlb', methods= ['POST'])
def clearLb():
    dbLbData.delete_many({})
    return "deleted"

@letterboxdDataBlueprint.route('/lbmovies', methods = ['GET'])
def getLbMovies():
    try:
        return json.dumps(list(dbLbData.find())[0]["titles"])
    except:
        return json.dumps([])


'''@letterboxdDataBlueprint.route('/download/<filename>', methods = ['GET'])
def download(filename):
    uploads = os.path.join(current_app.root_path, app.config['UPLOAD_FOLDER'])
    return send_from_directory(directory=uploads, filename=filename, as_attachment=True)'''