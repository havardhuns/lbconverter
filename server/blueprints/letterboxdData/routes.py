from flask import Blueprint, request
import json
from db import dbLbData
import requests

letterboxdDataBlueprint = Blueprint('letterboxdData', __name__)

def getTitleAndImdbIdFromLbUrl(url):
    try:
        session = HTMLSession()
        response = session.get(url)
        url = str(response.html.find('a', containing='IMDb', first=True).links)
        title = response.html.find('.headline-1', first=True).text
        return (title, url.split("/")[4])
    except requests.exceptions.RequestException as e:
        print(e)
        print(url)
        return None
    

@letterboxdDataBlueprint.route('/upload', methods = ['POST'])
def upload_file_return_data():
    dbLbData.delete_many({})
    file = request.files["file"]
    movieTitles = {"titles": []}
    for line in file:
        line = line.rstrip()
        title = str(line).split(",")[1]
        movieTitles["titles"].append(title)
    dbLbData.insert_one(movieTitles)
    return json.dumps(movieTitles['titles'])

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