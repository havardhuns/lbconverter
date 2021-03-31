import json
import requests
import pymongo
from imdb import IMDb

imdb = IMDb()
client = pymongo.MongoClient(os.environ.get("DB_CONNECTION"))
db = client["movieFilter"]
dbList = db["movieList"]
dbGenres = db["genres"]
dbCompanies = db["companies"]

addedMoviesFile = open("addedMovies.txt", "r+")
addedMoviesListFromFile = addedMoviesFile.read().splitlines()

apiKey = "52054b86a7c38893bedfad2b6e189d8c"

def clearDatabase():
	dbList.delete_many({})
	addedMoviesFile.truncate(0)
	print("Cleared database")

def requestWithRetry(query):
	while True:
		try:
			return requests.get(query).json()
		except:
			continue
		break

def getNorwegianCertification(release_dates, imdbMovie):
	certifications = {'US' : '', 'NO': ''}
	for release_date in release_dates["results"]:
		if release_date["iso_3166_1"] == "US":
			certifications["US"] = release_date["release_dates"][-1]["certification"]
		if release_date["iso_3166_1"] == "NO":
			certifications["NO"] = release_date["release_dates"][-1]["certification"]
	if certifications["NO"] == '':
			try: 
				imdbCerts = imdbMovie["certifications"]
				norwegianCert = [cert for cert in imdbCerts if "Norway" in cert]
				if norwegianCert:
					norwegianCert = norwegianCert[0]
					for i in range(len(norwegianCert)):
						if norwegianCert[i] == ":":
							for j in range(i+1, len(norwegianCert)):
								if norwegianCert[j] != ":":
									certifications["NO"] += norwegianCert[j]
								else:
									break
							break
			except(KeyError):
				print("[No certification] - ", end='')
			
	return certifications

def getDirector(imdbMovie):
	directors = []
	if "director" in imdbMovie:
		for director in imdbMovie["director"]:
			directors.append(director["name"])
	return directors

def getTopCast(imdbMovie, amount):
	cast = []
	if "cast" in imdbMovie:
		for index, castMember in enumerate(imdbMovie["cast"]):
			if index < amount:
				cast.append(castMember["name"])
	return cast

def getMovieFromID(id):
	movie = requestWithRetry('https://api.themoviedb.org/3/movie/' + str(id) + '?api_key=' + apiKey + '&language=en-US&append_to_response=release_dates')
	if "imdb_id" not in movie or movie["imdb_id"] == "" or not movie["imdb_id"] or movie["status"] != "Released":
		return None
	###########
	imdbMovie = imdb.get_movie(movie["imdb_id"][2:])
	releaseDates = movie["release_dates"]
	movie["certifications"] = getNorwegianCertification(releaseDates, imdbMovie)
	movie["director"] = getDirector(imdbMovie)
	if "rating" in imdbMovie:
		movie["rating"] = imdbMovie["rating"]
	else: 
		movie["rating"] = 0
	if "votes" in imdbMovie:
		movie["votes"] = imdbMovie["votes"]
	else: 
		movie["votes"] = 0
	movie["cast"] = getTopCast(imdbMovie, 3)
	############
	keys = ["id", "title", "poster_path", "backdrop_path", "release_date", "imdb_id", "budget", "genres", "original_language",
    "original_title", "overview", "popularity", "revenue", "runtime", "status", "tagline", "certifications", "director", "rating", "votes", "production_companies", "cast"]
	movie = {key: movie[key] for key in keys}
	movie["_id"] = movie.pop("id")
	############
	
	return movie

def insertMovies(yearStart, yearEnd):
	insertedAmount = 0
	pagesNotInserted = 0
	for year in range(yearEnd, yearStart-1, -1): #1873
		instertedFromYear = 0
		pages = requestWithRetry("https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + str(year))["total_pages"]
		if pages > 10:
			pages = 10
		for page in range(1,pages+1):
			print ("\n\n\n----- Inserting movies from", year, ", page: ", page,"------")
			movies = requestWithRetry("https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&page=" + str(page) + "&primary_release_year=" + str(year))["results"]
			jsonFilmer = []
			for movie in movies:
				if str(movie["id"]) not in addedMoviesListFromFile:
					formattedMovie = getMovieFromID(movie["id"])
					if formattedMovie:
						print(formattedMovie["title"], "- id:", formattedMovie["_id"])
						jsonFilmer.append(formattedMovie)
					else:
						print("[No imdb id or not released] -", movie["title"], "- Not inserted")
			if len(jsonFilmer) > 0:
				try:
					if len(jsonFilmer) == 1:
						dbList.insert_one(jsonFilmer[0])
					else:
						dbList.insert_many(jsonFilmer)
					insertedAmount += len(jsonFilmer)
					instertedFromYear += len(jsonFilmer)
					for movie in jsonFilmer:
						addedMoviesFile.write(str(movie["_id"])+"\n")
				except Exception as err:
					print(err )
					pagesNotInserted += 1
					print("Error inserting movies from", year, ", page", page, " - Skipping for now. ")
					print("Pages not inserted:", pagesNotInserted)
					continue
		print("\n!-------------------\nInserted", instertedFromYear, "movies from", year, "-", insertedAmount, "total this execution\n-------------------!\n")
	print("Inserted", insertedAmount, "movies :)")



def insertGenres():
	genres = requests.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US').json()["genres"]
	for genre in genres:
		genre["_id"] = genre.pop("id")
	print(genres)
	print("\n\n----- inserting genres: ------")
	dbGenres.insert_many(genres)

def insertProductionCompanies():
	productionCompanies = requests.get('http://localhost:5000/companydata').json()
	for company in productionCompanies:
		company["_id"] = company.pop("id")
	try:
		dbCompanies.insert_many(productionCompanies, ordered=False, bypass_document_validation=True)
	except pymongo.errors.BulkWriteError as e:
  		print(e.details['writeErrors'])


#clearDatabase()
#dbGenres.delete_many({})
#insertGenres()
#dbCompanies.delete_many({})
#insertMovies(1849, 2020)
insertProductionCompanies()