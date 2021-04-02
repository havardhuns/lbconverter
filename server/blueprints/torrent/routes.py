from flask import Blueprint, request
import json
import rarbgapi

client = rarbgapi.RarbgAPI()
client._options['retries'] = 10
torrentBlueprint = Blueprint('torrent', __name__)

def getSize(size):
    if size > 1073741824:
        return str('{:.2f}'.format(round(size/1073741824, 2))) + " GB"
    else:
        return str('{:.2f}'.format(round(size/1048576, 2))) + " MB"



@torrentBlueprint.route('/torrent/<imdb_id>', methods = ['GET'])
def getTorrents(imdb_id):
    tries = 0
    torrents = []
    while(len(torrents) == 0 and tries < 10):
        torrents = client.search(search_imdb=imdb_id, extended_response=True, limit=5, sort="seeders")
        tries += 1
    torrentList = []
    for torrent in torrents:
        torrentList.append({"filename": torrent.filename, "download": torrent.download, "seeders" : torrent.seeders, "leechers": torrent.leechers, "size": getSize(torrent.size)})
    return json.dumps(torrentList)