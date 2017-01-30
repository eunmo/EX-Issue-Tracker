exApp.directive('navi', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/navi.html'
	};
});

exApp.directive('moduleMeta', function () {
	return {
		restrict: 'E',
		scope: {
			module: '=module'
		},
		templateUrl: 'partials/module-meta.html'
	};
});
