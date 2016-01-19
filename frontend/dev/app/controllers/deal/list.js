app.controller("listDealCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getDealList();
	}

	$scope.action = {
		getDealList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDeal,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.deals;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToDeal : function(business_id){
			$state.go('business', {business_id : business_id});
		},
		isExpired : function(d){
			var date = new Date(Date.parse(d.expiry_date));
			if(date.getTime() < new Date().getTime()){
				return true;
			}

			return false;
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);