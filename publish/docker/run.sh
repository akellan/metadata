docker stop metadata-ui
docker rm metadata-ui
docker run --name metadata-ui -d -p 8081:80 akella/metadata-ui:latest