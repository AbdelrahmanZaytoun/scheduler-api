## About

This is backend API for scheduler application you can find frontend application here [>>> Frontend](https://github.com/AbdelrahmanZaytoun/shceduler-web)

## Requirement

- NodeJS 16v (LTS)
- Postgresql DB

## Installation

- Clone this repo
- Run below command in terminal

```sh
npm i
```

- Make sure to create file with name `.env` copy `.env.example` content and update `DATABASE_URL` to url DB URI

- Now you can run below command to start the server

```sh
npm start
```

## Note

- Default port is `3001` if you changed that you need to make sure FE backend url is updated too
- Server is tested on MacOS if you are running on Windows you may need to install `dotenv` package using `npm i dotenv` make sure to follow docs here [dotenv](https://www.npmjs.com/package/dotenv)
