import pymongo
import os

client = pymongo.MongoClient(os.environ.get("DB_CONNECTION"))
db = client["movieFilter"]

dbMovieList = db["movieList"]
dbLbData = db["lbData"]
dbGenres = db["genres"]
dbCompanies = db["companies"]