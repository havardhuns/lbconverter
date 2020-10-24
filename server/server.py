from flask import Flask, request, redirect, url_for, current_app, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from imdb import IMDb
import json
import requests
import pymongo
from bson.json_util import dumps
from math import ceil
import sys



app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

myclient = pymongo.MongoClient("mongodb+srv://havardhuns:dbpw@cluster0-iimwb.azure.mongodb.net/test?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE")
mydb = myclient["movieFilter"]
dbList = mydb["movieList"]
dbLbData = mydb["lbData"]
dbGenres = mydb["genres"]
dbCompanies = mydb["companies"]

API_KEY = "52054b86a7c38893bedfad2b6e189d8c"
UPLOAD_FOLDER = 'tmp/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['API_KEY'] = API_KEY


@app.route('/movies', methods = ['GET'])
def getMovies():
    page = int(request.args.get('page', default=1))
    lbFilter = request.args.get('lbfilter')
    sort = request.args.get('sort', default="popularity")
    filter = json.loads(request.args.get('filter', default="{}"))

    print(sort)
    query = {"status": "Released"}
    query.update(filter)
    if lbFilter is not None:
        filterList = list(dbLbData.find())[0]["titles"]
        query["title"] = { "$nin": filterList }
    print(query)
    length = dbList.count(query)
    skip, numberOfPages = getPage(page, length)
    moviesFromDB = list(dbList.find(query).sort(sort, -1).limit(60).skip(skip))
    return dumps({"total_results" : length, "page": page, "total_pages": numberOfPages, "results" : moviesFromDB})
    
@app.route('/movies/search', methods = ['GET'])
def searchMovies():
    searchString = request.args.get('search_string', default = "", type = str).strip("\"")
    limit = int(request.args.get('limit', default = "60", type = str))
    page = 2
    length = dbList.count({"title":  {"$regex": searchString}})
    skip, numberOfPages = getPage(page, length)
    print(skip)
    mydoc = list(dbList.find({"title":  {"$regex": searchString, '$options' : 'i'}}).sort("popularity", -1).limit(limit))
    return dumps({"total_results" : length, "total_pages": numberOfPages, "results" : mydoc})
    #length = dbList.count()
    #return mydoc
    #return dumps({"total_results" : length, "results" : mydoc})


def getPage(page, movieListLength):
    skip = 60*(page-1)
    numberOfPages = ceil(movieListLength/60)
    return (skip, numberOfPages)



@app.route('/upload', methods = ['POST'])
def upload_file_return_data():
    dbLbData.delete_many({})
    file = request.files["file"]
    movieTitles = {"titles": []}
    for line in file:
        movieTitles["titles"].append(str(line).split(",")[1].strip('"'))
    print(movieTitles)
    dbLbData.insert_one((movieTitles))
    return "lol"

@app.route('/download/<filename>', methods = ['GET'])
def download(filename):
    uploads = os.path.join(current_app.root_path, app.config['UPLOAD_FOLDER'])
    return send_from_directory(directory=uploads, filename=filename, as_attachment=True)

@app.route('/clearlb', methods= ['POST'])
def clearLb():
    dbLbData.delete_many({})
    return "deleted"


@app.route('/lbmovies', methods = ['GET'])
def getLbMovies():
    try:
        return json.dumps(list(dbLbData.find())[0]["titles"])
    except:
        return json.dumps([])
   

@app.route('/genres', methods = ['GET'])
def getGenres():
    genresFromDb = list(dbGenres.find())
    for genre in genresFromDb:
        genre["value"] = str(genre.pop("_id"))
    return dumps(genresFromDb)

@app.route('/companydata', methods = ['GET'])
def getProductionCompaniesData():
    allMovies = dbList.find()
    productionCompanies = []
    for movie in allMovies:
        for prodComp in movie["production_companies"]:
            company = {key: prodComp[key] for key in ["id", "name"]}
            if company not in productionCompanies:
                productionCompanies.append(company)
    return dumps(productionCompanies)

@app.route('/company', methods = ['GET'])
def getProductionCompaniesFromDb():
    prodCompFromDb = list(dbCompanies.find())
    for company in prodCompFromDb:
        company["value"] = str(company.pop("_id"))
    return dumps(prodCompFromDb)

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

