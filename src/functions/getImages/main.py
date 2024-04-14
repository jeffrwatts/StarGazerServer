import functions_framework

import os
import json
import base64
from datetime import timedelta
from google.cloud import storage, secretmanager
from google.oauth2 import service_account # type: ignore

@functions_framework.http
def getImages(request):
    # Create the Secret Manager client - workaround since generate_signed_url needs credentials directly passed.
    secret_client = secretmanager.SecretManagerServiceClient()
    secret_name = os.getenv('SECRET_NAME', 'your-secret-name')
    response = secret_client.access_secret_version(request={"name": secret_name})
    service_account_info = json.loads(base64.b64decode(response.payload.data).decode('utf-8'))
    credentials = service_account.Credentials.from_service_account_info(service_account_info)

    # Initialize the Google Cloud Storage client with the credentials
    storage_client = storage.Client(credentials=credentials)

    # Get bucket name
    bucket_name = os.getenv('BUCKET_NAME', 'your-default-bucket-name')
    json_filename = 'images.json'  # assuming the JSON file is at the root of the bucket
    bucket = storage_client.bucket(bucket_name)

    # Fetch the JSON file from the bucket
    blob = bucket.blob(json_filename)
    data = blob.download_as_text()

    # Parse the JSON data
    images_info = json.loads(data)

    # Enhance the data with URLs
    enhanced_data = []
    for image in images_info:
        object_id = image['objectId']
        blob = bucket.blob(f"{object_id}.webp")

        try:
            signed_url = blob.generate_signed_url(
                version="v4",
                expiration=timedelta(minutes=15),  # URL valid for 15 minutes
                method="GET",
                credentials=credentials
                )
        except Exception as e:
            return json.dumps({"error": str(e)})

        image['url'] = signed_url
        enhanced_data.append(image)

    # Return the enhanced JSON
    return json.dumps(enhanced_data)
