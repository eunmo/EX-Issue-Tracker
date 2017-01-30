(function () {
	'use strict';

	module.exports = function (router, db) {
		var Issues = db.collection ('Issues');

		router.put ('/edit', function (req, res) {
			var issue = req.body;

			var newIssue = {
				_id: issue.number,
				name: issue.name,
				handler: issue.handler,
				state: issue.state,
				minor: issue.minor
			};

			if (issue.handler !== 'null') {
			}

			if (issue._id !== issue.number) {
				Issues.remove ({ _id: issue._id })
				.then (function () {
					Issues.insert (newIssue).then (function () {
						res.sendStatus (200);
					});
				});
			} else {
				Issues.update ({ _id: issue._id }, { $set: newIssue }).then (function () {
					res.sendStatus (200);
				});
			}
		});
	};
}());
