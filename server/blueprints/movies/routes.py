from flask import Blueprint, request
import json
import math
from db import dbMovieList, dbLbData

moviesBlueprint = Blueprint('movies', __name__)


@moviesBlueprint.route('/movies', methods = ['GET'])
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
    length = dbMovieList.count(query)
    skip, numberOfPages = getPage(page, length)
    moviesFromDB = list(dbMovieList.find(query).sort(sort, -1).limit(60).skip(skip))
    return json.dumps({"total_results" : length, "page": page, "total_pages": numberOfPages, "results" : moviesFromDB})
    
@moviesBlueprint.route('/movies/search', methods = ['GET'])
def searchMovies():
    searchString = request.args.get('search_string', default = "", type = str).strip("\"")
    limit = int(request.args.get('limit', default = "60", type = str))
    page = 2
    length = dbMovieList.count({"title":  {"$regex": searchString}})
    skip, numberOfPages = getPage(page, length)
    print(skip)
    mydoc = list(dbMovieList.find({"title":  {"$regex": searchString, '$options' : 'i'}}).sort("popularity", -1).limit(limit))
    return json.dumps({"total_results" : length, "total_pages": numberOfPages, "results" : mydoc})
    #length = dbList.count()
    #return mydoc
    #return dumps({"total_results" : length, "results" : mydoc})


def getPage(page, movieListLength):
    skip = 60*(page-1)
    numberOfPages = math.ceil(movieListLength/60)
    return (skip, numberOfPages)
