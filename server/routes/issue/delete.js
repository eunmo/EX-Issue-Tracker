(function () {
	'use strict';

	module.exports = function (router, db) {
		var Issues = db.collection ('Issues');

		router.put ('/delete', function (req, res) {
			var issue = req.body;
				
			Issues.remove ({ _id: issue._id })
			.then (function () {
				res.sendStatus (200);
			});
		});
	};
}());
