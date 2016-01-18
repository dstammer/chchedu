app.controller("statsCtrl", ["$scope", function ($scope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);