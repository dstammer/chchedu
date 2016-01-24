app.controller("listUserCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();
		$rootScope.$broadcast("loaded");

		$scope.action.getUserList();
	}

	$scope.action = {
		getUserList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getUser,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.users;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToUser : function(user_id){
			$state.go('user', {user_id : user_id});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);