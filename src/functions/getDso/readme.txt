Local Debug
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
export BUCKET_NAME="BUCKET_NAME"

functions-framework --target=getDso --debug

Check Function Available
gcloud functions describe get_dso --gen2 --region us-central1 --format="value(serviceConfig.uri)"

Deploy
gcloud functions deploy get_dso \
    --gen2 \
    --runtime=python312 \
    --region=us-central1 \
    --source=. \
    --entry-point=getDso \
    --trigger-http 