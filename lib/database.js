var level = require('level');
var Q = require('q');

module.exports = (function(database) {
	return {
		'read': function(key) {
			var deferred = Q.defer();
			database.get(key, function(err, data) {
				if (err) deferred.reject(err);
				else deferred.resolve(data)
			});
			return deferred.promise
		},
		'write': function(key, data) {
			var deferred = Q.defer();
			database.put(key, data, function(err) {
				if (err) deferred.reject(err);
				else deferred.resolve(data)
			});
			return deferred.promise
		}
	}
})(level(__dirname + '/../db'));