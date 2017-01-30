exApp.controller ('AddCtrl', function ($rootScope, $scope, $http, $routeParams, $location, NameService) {

	$scope.module = $routeParams.module;
	$scope.issue = { number: null, state: 'Active', minor: false };

	if ($scope.module === 'ex') {
		$scope.issue.handler = '김용권';
		$scope.names = NameService.ex;
	}
	else if ($scope.module === 'opt') {
		$scope.issue.handler = '문성욱';
		$scope.names = NameService.opt;
	}

	$scope.add = function () {
		if ($scope.issue.number !== null) {
			$http.put ('add', $scope.issue)
				.then (function (res) {
					$location.url ('/');
				});
		}
	};
});

exApp.controller ('HandlerCtrl', function ($rootScope, $scope, $http, $routeParams, $location) {

	$scope.name = $routeParams.handler;
	$scope.issues = [];

	$http.get ('handler/' + $scope.name)
	.success (function (data) {
		$scope.issues = data;

		for (var i in $scope.issues) {
			var issue = $scope.issues[i];
			if (issue.state === 'Active') {
				issue.order = 1;
				issue.style = 'danger';
			}
			else if (issue.state === 'Postponed') {
				issue.order = 2;
				issue.style = 'warning';
			}
			else {
				issue.order = 3;
			}
		}
	});

	$scope.edit = function (issue) {
		$location.url ('edit/' + issue._id);
	};
});

exApp.controller ('EditCtrl', function ($rootScope, $scope, $http, $routeParams, $location, NameService) {

	$scope.issue = {};
	$scope.modules = [];

	for (var i in NameService.modules) {
		var module = NameService.modules[i];
		$scope.modules.push ({ name: module, handlers: NameService[module] });
	}

	$http.get ('issue/' + $routeParams.number)
	.success (function (data) {
		$scope.issue = data;
		$scope.issue.number = $scope.issue._id;
	});
	
	$scope.edit = function () {
		$http.put ('edit', $scope.issue)
		.then (function (res) {
			$location.url ('/');
		});
	};
	
	$scope.delete = function () {
		var r = confirm("진짜 지워요?");

		if (r) {
			$http.put ('delete', $scope.issue)
				.then (function (res) {
					$location.url ('/');
				});
		}
	};
});

exApp.controller ('MetaCtrl', function ($rootScope, $scope, $http, $routeParams, $location, NameService) {
	
	$scope.modules = [];

	function addMeta (data, moduleName) {
		var i, row, index;
		var names = NameService[moduleName];
		var meta = [];
		var name;

		for (i in names) {
			name = names[i];

			meta[i] = {
				name: names[i],
				Active: 0,
				Done: 0,
				Postponed: 0,
				offset: 0,
				current: []
			};

			if (NameService.offset[name]) {
				meta[i].offset = NameService.offset[name]
			}
		}

		for (i in data.meta) {
			row = data.meta[i];
			index = names.indexOf (row.handler);

			if (index === -1)
				continue;
			
			if (row.state === 'Active' || !row.minor) {
				meta[index][row.state] += row.count;
			}
		}

		for (i in data.active) {
			row = data.active[i];
			index = names.indexOf (row.handler);

			if (index === -1)
				continue;

			meta[index].current.push (row._id);
		}

		var module = { name: moduleName, meta: meta };

		$scope.modules.push (module);
	}

	$http.get ('meta')
	.success (function (data) {
		for (var i in NameService.modules) {
			addMeta (data, NameService.modules[i]);
		}
	});
});
