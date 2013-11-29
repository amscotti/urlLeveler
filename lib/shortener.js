var db = require('./database');
var shortId = require('shortid');
var Q = require('q');

module.exports = {
	'addURL': function (url) {
		var deferred = Q.defer();
		db.read(url).then(function (val) {
			deferred.resolve(val);
		}, function (err) {
			var key = shortId.generate();
			db.write(url, key).then(db.write(key, url)).then(function (val) {
				deferred.resolve(val)
			});	
		});
		return deferred.promise;
	},
	'getURL': function (key) {
		var deferred = Q.defer();
		db.read(key).then(function (url) {
			deferred.resolve(url);
		});
		return deferred.promise;
	}	
}
