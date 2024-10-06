import functions_framework

import os
import json
from google.cloud import storage

@functions_framework.http
def getStars(request):
    # Initialize the Google Cloud Storage client with the credentials
    storage_client = storage.Client()

    # Get bucket name
    bucket_name = os.getenv('BUCKET_NAME', 'your-default-bucket-name')
    bucket = storage_client.bucket(bucket_name)

    # Fetch the JSON file from the bucket
    json_filename = 'stars.json'  # assuming the JSON file is at the root of the bucket
    blob = bucket.blob(json_filename)
    data = blob.download_as_text()

    return data

