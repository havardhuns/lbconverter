from flask import Flask, request, redirect, url_for, current_app, send_from_directory, jsonify
from werkzeug import secure_filename
from flask_cors import CORS
import os
from imdb import IMDb
import json
import requests



app = Flask(__name__)
CORS(app)

API_KEY = "52054b86a7c38893bedfad2b6e189d8c"
UPLOAD_FOLDER = 'tmp/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['API_KEY'] = API_KEY

@app.route('/movies', methods = ['GET'])
def getMovies():
    try:
        response = requests.get('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&page=1')
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  
    except Exception as err:
        print(f'Other error occurred: {err}') 
    else:
        print('Success!')
        wtf = jsonify(json.loads(response.content)["results"])
        return wtf


@app.route('/upload', methods = ['POST'])
def upload_file_return_data():
    file = request.files["file"]
    '''with open(app.config['UPLOAD_FOLDER'] + "test.txt", "w") as fo:
        fo.write("This is Test Data")'''
    #file_contents = file.stream.read().decode("utf-8")
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return {"filename": filename, "min": 10, "max" : 100, "amount": 546}


#@app.route('/convert/<filename>', methods= [''])

@app.route('/download/<filename>', methods = ['GET'])
def download(filename):
    uploads = os.path.join(current_app.root_path, app.config['UPLOAD_FOLDER'])
    return send_from_directory(directory=uploads, filename=filename, as_attachment=True)
