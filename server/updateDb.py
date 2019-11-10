import json
import requests
import pymongo
from imdb import IMDb




imdb = IMDb()
myclient = pymongo.MongoClient("mongodb+srv://havardhuns:dbpw@cluster0-iimwb.azure.mongodb.net/test?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE")
mydb = myclient["movieFilter"]
dbList = mydb["movieList"]



addedMoviesFile = open("changedMovies.txt", "r+")
addedMoviesListFromFile = addedMoviesFile.read().splitlines()

insertedAmount = 0
pagesNotInserted = 0


def getMovieFromId(id):
	movie = requests.get('https://api.themoviedb.org/3/movie/' + str(id) + '?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&append_to_response=release_dates').json()
    return movie
	
