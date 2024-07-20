Local Debug
functions-framework --target=getTwilight --debug
curl 'http://localhost:8080/?latitude=19.639994&longitude=-155.996926&start=2451545.0&days=2'

export BUCKET_NAME
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"

Check Function Available
gcloud functions describe get_twilight --gen2 --region us-central1 --format="value(serviceConfig.uri)"

Deploy
gcloud functions deploy get_twilight \
--gen2 \
--runtime=python312 \
--region=us-central1 \
--source=. \
--entry-point=getTwilight \
--trigger-http 