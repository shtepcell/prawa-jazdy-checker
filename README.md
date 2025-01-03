# prawa-jazdy-checker

Job for sending notifications to Telegram chanel about driver license readiness.

## Technologies

* Playwirght
* Google Cloud
* Telegram API
* Docker

## Build and publish Docker Image

```bash
docker buildx build --platform linux/amd64 -t prawa-jazdy-checker .
docker tag prawa-jazdy-checker europe-central2-docker.pkg.dev/{{project_id}}/prawa-jazdy-checker/{{version}}
docker push europe-central2-docker.pkg.dev/{{project_id}}/prawa-jazdy-checker/{{version}}
```
