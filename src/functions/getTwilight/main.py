import functions_framework
from google.cloud import storage
import tempfile
import logging
import os

import json
from skyfield.api import load, wgs84
from skyfield import almanac
#from pytz import timezone, utc
from datetime import datetime

# Load the .bsp file from Google Cloud Storage
def load_planetary_ephemeris(bucket_name, file_name):
    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(file_name)

        with tempfile.NamedTemporaryFile(delete=False, suffix='.bsp') as temp_file:
            blob.download_to_filename(temp_file.name)
            ephemeris = load(temp_file.name)
        return ephemeris
    except Exception as e:
        logging.error(f"Error loading planetary ephemeris: {e}")
        raise ValueError(f"Could not load planetary ephemeris: {e}")

# Get the bucket name from the environment variable
bucket_name = os.getenv('BUCKET_NAME')
file_name = 'de421.bsp'

# Load the ephemeris file once outside the function
eph = load_planetary_ephemeris(bucket_name, file_name)
ts = load.timescale()

@functions_framework.http
def getTwilight(request):
    request_args = request.args

    latitude = None
    if request_args and 'latitude' in request_args:
        latitude_arg = request_args['latitude']
        latitude = float(latitude_arg)

    longitude = None
    if request_args and 'longitude' in request_args:
        longitude_arg = request_args['longitude']
        longitude = float(longitude_arg)

    start_date = None
    if request_args and 'start' in request_args:
        start_arg = request_args['start']
        start_date = float(start_arg)

    days = None
    if request_args and 'days' in request_args:
        days_arg = request_args['days']
        days = float(days_arg)


    start = ts.tt(jd=start_date)
    end = start + days

    location = wgs84.latlon(latitude, longitude)
    f = almanac.dark_twilight_day(eph, location)
    times, events = almanac.find_discrete(start, end, f)

    previous_e = f(start).item()
    results = []

    for t, e in zip(times, events):
        tstr = t.tt  # Julian Date
        
        event = f"{almanac.TWILIGHTS[e]}" if previous_e < e else f"{almanac.TWILIGHTS[previous_e]}"
        event_phase = "START" if previous_e < e else "END"
        
        # Only include astronomical twilight events
        if 'Astronomical' in event:
            results.append({
                "time": tstr,
                "event": event_phase
            })
        
        previous_e = e

    return json.dumps(results)
