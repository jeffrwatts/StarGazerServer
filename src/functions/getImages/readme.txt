Local Debug
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
functions-framework --target=getImages --debug

Check Function Available
gcloud functions describe get_images --gen2 --region us-central1 --format="value(serviceConfig.uri)"

Deploy
gcloud functions deploy get_images \
    --gen2 \
    --runtime=python312 \
    --region=us-central1 \
    --source=. \
    --entry-point=getImages \
    --trigger-http \
    --set-env-vars BUCKET_NAME='your-bucket-name'
