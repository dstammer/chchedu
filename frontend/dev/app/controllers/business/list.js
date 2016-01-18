app.controller("listBusinessCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getBusinessList();
	}

	$scope.action = {
		getBusinessList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.business;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToBusiness : function(business_id){
			$state.go('business', {business_id : business_id});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);