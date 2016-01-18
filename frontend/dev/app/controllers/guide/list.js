app.controller("listGuideCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getGuideList();
	}

	$scope.action = {
		getGuideList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuide,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.guide;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);