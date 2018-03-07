import googlemaps
import csv
import json

locations = {
    'file': 'locaties.csv',
    'addressColumn': 6,
    'infoTextColumn': 5,
    'storeNameColumn': 1
}
exhibitions = []

gmaps = googlemaps.Client(key='AIzaSyA7g2inijoh5NVHqaoKjE7dgpR6kRXI6Ls')

def read_locationdata():
    with open(locations['file'], 'r') as csvfile:
        next(csvfile) # skip first row
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in reader:
            exhibitions.append({ 'address': row[locations['addressColumn']],
                                'infoText': row[locations['infoTextColumn']],
                                'storeName': row[locations['storeNameColumn']]
                                })
    print("Read " + str(len(exhibitions)) + " exhibitions")

def geocode_locations():
    print("Geolocating exhibitions...")
    for exhibition in exhibitions:
        geocode_result = gmaps.geocode(exhibition['address'] + ', Delft, Nederland')
        exhibition['location'] = geocode_result[0]['geometry']['location']
        exhibition['formatted_address'] = geocode_result[0]['formatted_address']
    print("Done")

read_locationdata()
geocode_locations()
