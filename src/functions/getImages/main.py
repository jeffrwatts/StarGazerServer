import functions_framework

import os
import json
from google.cloud import storage


@functions_framework.http
def getImages(request):
    bucket_name = os.getenv('BUCKET_NAME', 'your-default-bucket-name')
    json_filename = 'images.json'  # assuming the JSON file is at the root of the bucket

    # Create a client and reference the bucket
    client = storage.Client()
    bucket = client.bucket(bucket_name)

    # Fetch the JSON file from the bucket
    blob = bucket.blob(json_filename)
    data = blob.download_as_text()

    # Parse the JSON data
    images_info = json.loads(data)

    # Base URL for accessing the bucket objects
    base_url = f"https://storage.cloud.google.com/{bucket_name}/"

    # Enhance the data with URLs
    enhanced_data = []
    for image in images_info:
        object_id = image['objectId']
        image_url = f"{base_url}{object_id}.webp"
        image['url'] = image_url
        enhanced_data.append(image)

    # Return the enhanced JSON
    return json.dumps(enhanced_data)
