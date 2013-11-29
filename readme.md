# A simple example of using LevelDB to make a URL shortener

## Dependencies
* [Express](http://expressjs.com) is used for API layer.
* [LevelUp](https://github.com/rvagg/node-levelup) is used for working with the database.
* [Q](https://github.com/kriskowal/q) is used to deal with callbacks. 
* [shortid](https://github.com/dylang/shortid) is used for generating keys.

## Setup
``npm install``

## Usage
``curl http://localhost:8000/get/<key>`` - Will return JSON data with Key and URL from the database

``curl http://localhost:8000/<key>`` - Will redirect to the URL for the give Key

``curl -X POST http://localhost:8000/ -d "url=http://128bit.io"`` - Will add the URL to the database and return JSON data with the Key and URL