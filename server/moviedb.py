import json
import requests
import pymongo
from imdb import IMDb




imdb = IMDb()
myclient = pymongo.MongoClient("mongodb+srv://havardhuns:dbpw@cluster0-iimwb.azure.mongodb.net/test?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE")
mydb = myclient["movieFilter"]
dbList = mydb["movieList"]



addedMoviesFile = open("addedMovies.txt", "r+")
addedMoviesListFromFile = addedMoviesFile.read().splitlines()

insertedAmount = 0
pagesNotInserted = 0

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

def getMovieFromID(id):
	movie = requestWithRetry('https://api.themoviedb.org/3/movie/' + str(id) + '?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&append_to_response=release_dates')
	if "imdb_id" not in movie or movie["imdb_id"] == "" or not movie["imdb_id"] or movie["status"] != "Released":
		return None
	###########
	imdbMovie = imdb.get_movie(movie["imdb_id"][2:])
	releaseDates = movie["release_dates"]
	movie["certifications"] = getNorwegianCertification(releaseDates, imdbMovie)
	############
	keys = ["id", "title", "poster_path", "backdrop_path", "release_date", "imdb_id", "budget", "genres", "original_language",
    "original_title", "overview", "popularity", "revenue", "runtime", "status", "tagline", "vote_average", "vote_count", "certifications"]
	movie = {key: movie[key] for key in keys}
	movie["_id"] = movie.pop("id")
	############
	
	return movie


for year in range(2019, 1849, -1): #1873
	instertedFromYear = 0
	pages = requestWithRetry("https://api.themoviedb.org/3/discover/movie?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + str(year))["total_pages"]
	if pages > 10:
		pages = 50
	for page in range(1,pages+1):
		print ("\n\n\n----- Inserting movies from", year, ", page: ", page,"------")
		movies = requestWithRetry("https://api.themoviedb.org/3/discover/movie?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&sort_by=popularity.desc&page=" + str(page) + "&primary_release_year=" + str(year))["results"]
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
				dbList.insert_many(jsonFilmer)
				insertedAmount += len(jsonFilmer)
				instertedFromYear += len(jsonFilmer)
				for movie in jsonFilmer:
					addedMoviesFile.write(str(movie["_id"])+"\n")
			except:
				pagesNotInserted += 1
				print("Error inserting movies from", year, ", page", page, " - Skipping for now. ")
				print("Pages not inserted:", pagesNotInserted)
				continue
	print("\n!-------------------\nInserted", instertedFromYear, "movies from", year, "-", insertedAmount, "total this execution\n-------------------!\n")
print("Inserted", insertedAmount, "movies :)")
