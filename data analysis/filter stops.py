import csv

# Path to the CSV file
csv_file = '/Users/lijiayuan/Desktop/Transpiration-GTFS/NSW/NSW-stops.csv'

# Read the CSV file and convert to JSON objects
data = []
with open(csv_file, 'r', encoding='utf-8-sig') as file:  # Specify 'utf-8-sig' encoding
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

# Filter out duplicate entries based on 'stop_id'
unique_data = []
existing_ids = set()
coordinates = []

for entry in data:
    stop_id = entry.get('stop_id')
    lat, lon = entry.get('stop_lat'), entry.get('stop_lon')
    if stop_id is not None and stop_id not in existing_ids and lat is not None and lon is not None:
        formatted_lat = round(float(lat), 1)
        formatted_lon = round(float(lon), 1)
        coordinate = (formatted_lat, formatted_lon)
        unique_data.append(entry)
        existing_ids.add(stop_id)
        coordinates.append(coordinate)

# Helper function to count duplicate coordinates
def count_duplicate_coordinates(coordinates):
    counts = {}
    for coordinate in coordinates:
        if coordinate in counts:
            counts[coordinate] += 1
        else:
            counts[coordinate] = 1
    return counts

# Count duplicate coordinates and store the results in a CSV file
counts = count_duplicate_coordinates(coordinates)
total_count = 0

output_file = 'clear_nsw.csv'
with open(output_file, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['coordinate', 'count'])
    for coordinate, count in counts.items():
        writer.writerow([list(coordinate), int(count)])
        total_count += count

print("Total Count:", total_count)
print("Total Location:", len(counts))
print("Output saved to:", output_file)


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
coordinates = []

for entry in data:
    stop_id = entry.get('stop_id')
    lat, lon = entry.get('stop_lat'), entry.get('stop_lon')
    if stop_id is not None and stop_id not in existing_ids and lat is not None and lon is not None:
        formatted_lat = round(float(lat), 1)
        formatted_lon = round(float(lon), 1)
        coordinate = (formatted_lat, formatted_lon)
        unique_data.append(entry)
        existing_ids.add(stop_id)
        coordinates.append(coordinate)

# Helper function to count duplicate coordinates
def count_duplicate_coordinates(coordinates):
    counts = {}
    for coordinate in coordinates:
        if coordinate in counts:
            counts[coordinate] += 1
        else:
            counts[coordinate] = 1
    return counts

# Count duplicate coordinates and print the results
counts = count_duplicate_coordinates(coordinates)
total_count = 0

for coordinate, count in counts.items():
    print({"coordinate": list(coordinate) ,"count": count})
    total_count += count

print("Total Count:", total_count)

print("Total Location:", len(counts))

