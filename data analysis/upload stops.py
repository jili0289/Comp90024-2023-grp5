import csv
import json
import couchdb
import os
import re

admin = 'admin'
password = 'admin'
url = f'http://{admin}:{password}@172.26.129.246:5984/'

couch = couchdb.Server(url)

# indicate the database name
db_name = 'transport_nswstops'

# if not exist, create one
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

csv_file = '/Users/lijiayuan/Desktop/Transpiration-GTFS/NSW/NSW-stops.csv'

data = []
with open(csv_file, 'r', encoding='utf-8-sig') as file:  # Specify 'utf-8-sig' encoding
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

unique_data = []
existing_ids = set()

for entry in data:
    stop_id = entry.get('stop_id')  # Access 'stop_id' with '\ufeff' prefix
    if stop_id is not None and stop_id not in existing_ids:
        unique_data.append(entry)
        existing_ids.add(stop_id)

for entry in unique_data:
    station_name = entry['stop_name']
    json_data = json.dumps([entry], ensure_ascii=False)

    station_name_update = re.sub(r'[\\/:"*?<>|]', '_', station_name)
    file_name = f"{station_name_update.replace(' ', '_')}.json"

    with open(file_name, 'w', encoding='utf-8') as file:
        file.write(json_data)

    with open(file_name, 'r', encoding='utf-8') as file:
        json_obj = json.load(file)
        db.save(json_obj[0])
        print(f"Uploaded {file_name} to CouchDB.")

    os.remove(file_name)


# authentication
admin = 'admin'
password = 'admin'
url = f'http://{admin}:{password}@172.26.129.246:5984/'


# get CouchDB instance
couch = couchdb.Server(url)

# indicate the database name
db_name = 'transport_vicstops'

# if not exist, create one
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# Path to the CSV file
csv_file = '/Users/lijiayuan/Desktop/Transpiration-GTFS/VIC/VIC-stops.csv'

# Read the CSV file and convert to JSON objects
data = []
with open(csv_file, 'r', encoding='utf-8-sig') as file:  # Specify 'utf-8-sig' encoding
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

# Filter out duplicate entries based on 'stop_id'
unique_data = []
existing_ids = set()

for entry in data:
    stop_id = entry.get('stop_id')  # Access 'stop_id' with '\ufeff' prefix
    if stop_id is not None and stop_id not in existing_ids:
        unique_data.append(entry)
        existing_ids.add(stop_id)

# Save each station as a separate JSON file and upload to CouchDB
for entry in unique_data:
    station_name = entry['stop_name']
    json_data = json.dumps([entry], ensure_ascii=False)

    # Create file name (ensure it is a valid file name)
    station_name_update = re.sub(r'[\\/:"*?<>|]', '_', station_name)
    file_name = f"{station_name_update.replace(' ', '_')}.json"

    # Save JSON data to file
    with open(file_name, 'w', encoding='utf-8') as file:
        file.write(json_data)

    # Upload JSON data to CouchDB
    with open(file_name, 'r', encoding='utf-8') as file:
        json_obj = json.load(file)
        db.save(json_obj[0])
        print(f"Uploaded {file_name} to CouchDB.")

    # Cleanup: Delete the temporary JSON file
    os.remove(file_name)

