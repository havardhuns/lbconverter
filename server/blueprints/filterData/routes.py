from flask import Blueprint
import json
from db import dbGenres, dbMovieList, dbCompanies

filterDataBlueprint = Blueprint('filterData', __name__)

@filterDataBlueprint.route('/genres', methods = ['GET'])
def getGenres():
    genresFromDb = list(dbGenres.find())
    for genre in genresFromDb:
        genre["value"] = str(genre.pop("_id"))
    return json.dumps(genresFromDb)

@filterDataBlueprint.route('/companydata', methods = ['GET'])
def getProductionCompaniesData():
    allMovies = dbMovieList.find()
    productionCompanies = []
    for movie in allMovies:
        for prodComp in movie["production_companies"]:
            company = {key: prodComp[key] for key in ["id", "name"]}
            if company not in productionCompanies:
                productionCompanies.append(company)
    return json.dumps(productionCompanies)

@filterDataBlueprint.route('/company', methods = ['GET'])
def getProductionCompaniesFromDb():
    prodCompFromDb = list(dbCompanies.find())
    for company in prodCompFromDb:
        company["value"] = str(company.pop("_id"))
    return json.dumps(prodCompFromDb)