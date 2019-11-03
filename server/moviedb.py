import json
import requests
import pymongo
from imdb import IMDb

# create an instance of the IMDb class
imdb = IMDb()



myclient = pymongo.MongoClient("mongodb+srv://havardhuns:dbpw@cluster0-iimwb.azure.mongodb.net/test?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE")
mydb = myclient["movieFilter"]
dbList = mydb["movieList"]

def requestWithRetry(query):
	while True:
		try:
			return requests.get(query).json()
		except:
			continue
		break

def getCertification(release_dates, imdbId):
	certifications = {'US' : '', 'NO': ''}
	for release_date in release_dates["results"]:
		if release_date["iso_3166_1"] == "US":
			certifications["US"] = release_date["release_dates"][-1]["certification"]
		if release_date["iso_3166_1"] == "NO":
			certifications["NO"] = release_date["release_dates"][-1]["certification"]
	if certifications["NO"] == '':
			try: 
				imdbCerts = imdb.get_movie(imdbId[2:])["certifications"]
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
				print("!!!!!!!!!!!No certifications for", imdbId)
			
	return certifications

def getMovieFromID(id):
	movie = requestWithRetry('https://api.themoviedb.org/3/movie/' + str(id) + '?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&append_to_response=release_dates')
	print(movie["title"], movie["id"])
	movie["_id"] = movie.pop(movie["id"])
	if movie["imdb_id"] == "" or not movie["imdb_id"]:
		return None
	releaseDates = movie["release_dates"]
	keys = ["_id", "title", "poster_path", "backdrop_path", "release_date", "imdb_id", "budget", "genres", "original_language",
    "original_title", "overview", "popularity", "revenue", "runtime", "status", "tagline", "vote_average", "vote_count"]
	movie = {key: movie[key] for key in keys}
	movie["certifications"] = getCertification(releaseDates, movie["imdb_id"])
	return movie

	


for year in range(1911, 1899, -1): #1873
	pages = requestWithRetry("https://api.themoviedb.org/3/discover/movie?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + str(year))["total_pages"]
	if pages > 10:
		pages = 2
	for page in range(1,pages+1):
		print ("\n\n\n----- Inserting movies from", year, ", page: ", page,"------")
		movies = requestWithRetry("https://api.themoviedb.org/3/discover/movie?api_key=52054b86a7c38893bedfad2b6e189d8c&language=en-US&sort_by=popularity.desc&page=" + str(page) + "&primary_release_year=" + str(year))["results"]
		jsonFilmer = []
		for movie in movies:
			formattedMovie = getMovieFromID(movie["id"])
			if formattedMovie:
				jsonFilmer.append(formattedMovie)
			else:
				print("No imdb id")
			
		dbList.insert_many(jsonFilmer)



