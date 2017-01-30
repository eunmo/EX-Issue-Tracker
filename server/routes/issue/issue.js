(function () {
	'use strict';

	module.exports = function (router, db) {
		var Issues = db.collection ('Issues');

		router.get ('/issue/:_issue', function (req, res) {
			var issue = Number(req.params._issue);

			Issues.find ({ _id: issue }).toArray ()
			.then (function (docs) {
				if (docs.length > 0) {
					res.json (docs[0]);
				}
				else {
					res.json ({});
				}
			});
		});
	};
}());
