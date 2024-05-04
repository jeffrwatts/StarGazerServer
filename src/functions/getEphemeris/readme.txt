Local Debug
functions-framework --target=getEphemeris --debug
curl 'http://localhost:8080/?start=2451545.0&length=2'

export BUCKET_NAME
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"

Check Function Available
gcloud functions describe get_ephemeris --gen2 --region us-central1 --format="value(serviceConfig.uri)"

Deploy
gcloud functions deploy get_ephemeris \
--gen2 \
--runtime=python312 \
--region=us-central1 \
--source=. \
--entry-point=getEphemeris \
--trigger-http 