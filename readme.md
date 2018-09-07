# urlLeveler
A simple example of using LevelDB to make a URL shortener, with Node.js, Express.js, and LevelDB

## Setup
`npm install`

## Running
`npm start`

## Usage

### REST Endpoints

`curl http://localhost:8000/<key>` - Will redirect to the URL for the give Key.

`curl -X POST http://localhost:8000/api -d "url=https://128bit.io"` - Will add the URL to the database and return JSON data with the Key and URL.

`curl http://localhost:8000/api/<key>` - Will return JSON data with Key and URL from the database.

`curl -X DELETE http://localhost:8000/api/<key>` - Will return JSON data with Key and URL from the database and remove the data from the database.


### GraphQL Endpoint

GraphQL Endpoint can be found at `http://localhost:8000/graphql`.

To create a new URL, use the `addURL` Mutation
```text
mutation {
  addURL(url: "https://128bit.io") {
    key
    url
  }
}
```

To get a URL with a key, use the `url` Query
```text
{
  url(key: "<key>") {
    key
    url
  }
}
```