# urlLeveler

## About

urlLeveler is a simple but powerful URL shortener built using Node.js, Express.js, and LevelDB. A URL shortener is a tool that takes a long URL and turns it into a much shorter one. Short URLs are easier to share and remember. The tool is handy for social media sharing where every character counts.

LevelDB is a fast key-value storage library that provides an ordered mapping from string keys to string values. It helps make urlLeveler efficient and performant.

## Prerequisites

- Node.js
- npm

## Setup

1. Clone the repository
2. Navigate into the project directory
3. Install dependencies using `npm install`

## Running the Project

Start the server using `npm start`. By default, the server will run on `http://localhost:8000`.

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

or as a curl command,

```bash
curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { addURL(url: \"https://128bit.io") { key url } }" }' http://localhost:8000/graphql
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

or as a curl command,

```bash
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ url(key: \"<key>"\") { key url } }" }' http://localhost:8000/graphql
```
