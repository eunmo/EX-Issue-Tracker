(function () {
	'use strict';

	module.exports = function (router, db) {
		var Issues = db.collection ('Issues');

		router.get ('/handler/:_handler', function (req, res) {
			var handler = req.params._handler;

			Issues.find ({ handler: handler }).toArray ()
			.then (function (docs) {
				res.json (docs);
			});
		});
	};
}());
