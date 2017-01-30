(function () {
	'use strict';

	module.exports = function (router, db) {
		var Issues = db.collection ('Issues');
		
		router.get ('/meta', function (req, res) {
			var meta = [];

			Issues.aggregate([
			{
				$group: {
					_id : { handler: '$handler', state: '$state', minor: '$minor' },
					count: { $sum : 1	}
				}
			},
			{
				$project: {
					_id: 0,
					handler: '$_id.handler',
					state: '$_id.state',
					minor: '$_id.minor',
					count: 1
				}
			}
			]).toArray ()
			.then (function (docs) {
				meta = docs;

				return Issues.find ({ state: 'Active' }, { _id: 1, handler: 1 }).toArray ();
			})
			.then (function (docs) {

				res.json ({ meta: meta, active: docs });
			});
		});
	};
}());
