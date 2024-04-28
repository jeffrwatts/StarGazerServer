Local Debug
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
export BUCKET_NAME="BUCKET_NAME"

functions-framework --target=getVariableStars --debug

Check Function Available
gcloud functions describe get_variable_stars --gen2 --region us-central1 --format="value(serviceConfig.uri)"

Deploy
gcloud functions deploy get_variable_stars \
    --gen2 \
    --runtime=python312 \
    --region=us-central1 \
    --source=. \
    --entry-point=getVariableStars \
    --trigger-http 