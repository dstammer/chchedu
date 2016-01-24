app.controller("loadCtrl", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {		
	$scope.refresh = function () {
		$scope.loaded = true;
    }

	$rootScope.$on("loaded", function(){
		$scope.loaded = false;
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);