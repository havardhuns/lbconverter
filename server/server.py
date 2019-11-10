from flask import Flask, request, redirect, url_for, current_app, send_from_directory, jsonify
from werkzeug import secure_filename
from flask_cors import CORS
import os
from imdb import IMDb
import json
import requests
import pymongo
from bson.json_util import dumps
from math import ceil



app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

myclient = pymongo.MongoClient("mongodb+srv://havardhuns:dbpw@cluster0-iimwb.azure.mongodb.net/test?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE")
mydb = myclient["movieFilter"]
dbList = mydb["movieList"]

API_KEY = "52054b86a7c38893bedfad2b6e189d8c"
UPLOAD_FOLDER = 'tmp/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['API_KEY'] = API_KEY

@app.route('/movies', methods = ['GET'])
def getMovies():
    page = request.args.get('page', default = 1, type = int)
    page_size = request.args.get('page_size', default = 60, type = int)
    year = request.args.get('year', default = 2014, type = int)
    length = dbList.count({"release_date":  {"$regex": str(year)}})
    skip, numberOfPages = getPage(page, length, page_size)
    moviesFromDB = list(dbList.find({"release_date":  {"$regex": str(year)}}).sort("popularity", -1).limit(page_size).skip(skip))
    return dumps({"total_results" : length, "total_pages": numberOfPages, "results" : moviesFromDB})
    
@app.route('/movies/search', methods = ['GET'])
def searchMovies():
    searchString = request.args.get('search_string', default = "", type = str).strip("\"")
    limit = int(request.args.get('limit', default = "60", type = str))
    page = 2
    length = dbList.count({"title":  {"$regex": searchString}})
    skip, numberOfPages = getPage(page, length, 60)
    print(skip)
    mydoc = list(dbList.find({"title":  {"$regex": searchString, '$options' : 'i'}}).sort("popularity", -1).limit(limit))
    return dumps({"total_results" : length, "total_pages": numberOfPages, "results" : mydoc})
    #length = dbList.count()
    #return mydoc
    #return dumps({"total_results" : length, "results" : mydoc})


def getPage(page, movieListLength, page_size):
    skip = page_size*(page-1)
    numberOfPages = ceil(movieListLength/60)
    return (skip, numberOfPages)

    

'''@app.route('/movies', methods = ['GET'])
def getMovies():
    page = request.args.get('page', default = 1, type = int)
    pageto = request.args.get('pageto', default = page+1, type = int)
    movies= []
    for i in range(page, pageto):
        movies.extend(getMoviesFromPage('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&sort_by=popularity.desc', i))
    return jsonify(movies)

def getMoviesFromPage(query, page):
    try:
        response = requests.get(query + "&page=" + str(page))
    except Exception as err:
        print(f'Other error occurred: {err}') 
    else:
        print('Success!')
        movies = json.loads(response.content)["results"]
        keys = ["title", "poster_path", "backdrop_path", "release_date", "id"]
        for i in range(len(movies)):
            movies[i] = {key: movies[i][key] for key in keys}
        return movies

@app.route('/movie', methods=['GET'])
def getMovieDetails():
    movieId = request.args.get('movieid', type= str)
    print(movieId)
    try:
        return requests.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY+'&language=en-US').json()
    except Exception as err:
        print(f'Other error occurred: {err}')'''




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
