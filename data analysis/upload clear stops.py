import csv
import json
import requests

# CouchDB configuration
couchdb_url = 'http://172.26.129.246:5984'
database_name = 'trans_combined_nsw'
username = 'admin'
password = 'admin'

# Path to the CSV file
csv_file_path = 'clear_nsw.csv'

# Read the CSV file
csv_data = []
with open(csv_file_path, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Modify the coordinate value
        coordinate = row['coordinate']
        modified_coordinate = coordinate.replace('(', '[').replace(')', ']')
        row['coordinate'] = modified_coordinate

        csv_data.append(row)

# Convert CSV data to individual JSON files and upload to CouchDB
for index, row in enumerate(csv_data, start=1):
    # Create a unique filename for each JSON file
    json_file_name = f"data_{index}.json"

    # Convert the row data to JSON
    json_data = json.dumps(row)

    # Write the JSON data to a file
    with open(json_file_name, 'w') as json_file:
        json_file.write(json_data)

    # Upload the JSON file to CouchDB
    url = f'{couchdb_url}/{database_name}/{json_file_name}'
    headers = {'Content-Type': 'application/json'}
    auth = (username, password)
    with open(json_file_name, 'rb') as file:
        response = requests.put(url, data=file, headers=headers, auth=auth)

    if response.status_code == 201:
        print(f'JSON file {json_file_name} uploaded successfully to CouchDB.')
    else:
        print(f'Error uploading JSON file {json_file_name} to CouchDB:', response.status_code)
        print(response.text)


# CouchDB configuration
couchdb_url = 'http://172.26.129.246:5984'
database_name = 'trans_combined'
username = 'admin'
password = 'admin'

# Path to the CSV file
csv_file_path = 'clear_vic.csv'

# Read the CSV file
csv_data = []
with open(csv_file_path, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Modify the coordinate value
        coordinate = row['coordinate']
        modified_coordinate = coordinate.replace('(', '[').replace(')', ']')
        row['coordinate'] = modified_coordinate

        csv_data.append(row)

# Convert CSV data to individual JSON files and upload to CouchDB
for index, row in enumerate(csv_data, start=1):
    # Create a unique filename for each JSON file
    json_file_name = f"data_{index}.json"

    # Convert the row data to JSON
    json_data = json.dumps(row)

    # Write the JSON data to a file
    with open(json_file_name, 'w') as json_file:
        json_file.write(json_data)

    # Upload the JSON file to CouchDB
    url = f'{couchdb_url}/{database_name}/{json_file_name}'
    headers = {'Content-Type': 'application/json'}
    auth = (username, password)
    with open(json_file_name, 'rb') as file:
        response = requests.put(url, data=file, headers=headers, auth=auth)

    if response.status_code == 201:
        print(f'JSON file {json_file_name} uploaded successfully to CouchDB.')
    else:
        print(f'Error uploading JSON file {json_file_name} to CouchDB:', response.status_code)
        print(response.text)
