var shortener = require('./lib/shortener'),
	express = require('express'),
	app = express();

app.use(require('express-promise')());
app.use(express.bodyParser());

app.get('/get/:id', function(req, res) {	
	res.json({
	    key: req.params.id,
	    url: shortener.getURL(req.params.id)
	  });
});

app.get('/:id', function(req, res) {
	shortener.getURL(req.param('id')).then(function (url) {
		res.redirect(url);
	});
});

app.post('/', function(req, res) {	
	res.json({
	    key: shortener.addURL(req.body.url),
	    url: req.body.url
	  });
});


app.listen(8000);
console.log("Listen on port 8000");