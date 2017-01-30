exApp = angular.module ('exApp', ['ngRoute'])
.config (function ($routeProvider) {
	$routeProvider
	.when ('/', {
		templateUrl: '/partials/meta.html',
		controller: 'MetaCtrl'
	})
	.when ('/add/:module', {
		templateUrl: '/partials/add.html',
		controller: 'AddCtrl'
	})
	.when ('/edit/:number', {
		templateUrl: '/partials/edit.html',
		controller: 'EditCtrl'
	})
	.when ('/handler/:handler', {
		templateUrl: '/partials/handler.html',
		controller: 'HandlerCtrl'
	})
	.otherwise ({
		redirectTo: '/'
	});
});

exApp.factory ('NameService', function () {
	return {
		modules: ['ex'],
		ex: ['김동현', '김세환', '김승걸', '김용권', '신주한', '양은모', '홍윤기'],
		offset: { '김세환': 9, '신주한':48, '홍윤기': 48 }
	};
});
