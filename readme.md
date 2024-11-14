# Ai ChatBot test app
## Start Server
```
docker-compose build
docker-compose up app
```
## Start Client
``` 
docker build -t client .
docker run -p 3000:3000 client
```
