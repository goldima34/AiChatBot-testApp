# Ai ChatBot test app
## Start Server

Before starting the project we need to create a file called .env.local in the client folder and then create there a variable NEXT_PUBLIC_API_KEY with our OpenAI APIKEY.

Open the server folder and start a new terminal inside it and enter the following commands: 
You may need to enter the second command 2 times (first time only)
(the first time may take some time)
```
docker-compose build
docker-compose up app
```

Open the client folder and start a new terminal inside it and enter the following commands: 
## Start Client
``` 
docker build -t client .
docker run -p 3000:3000 client
```
