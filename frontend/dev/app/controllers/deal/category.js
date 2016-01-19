app.controller("categoryDealCtrl", ["$scope", "$http", function ($scope, $http) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.category = {_id:"", name:""};
		$scope.action.getCategoryList();
	}
	
	$scope.action = {
		doCreate : function(){
			if($scope.category.name){
				var url = Config.api.endPoint;
				if($scope.category._id){
					url = url + Config.slug.updateDealCategory;
				} else {
					url = url + Config.slug.createDealCategory;
				}

				console.log($scope.category);

				$http({
					method : "POST",
					url : url,
					data : {
						id : $scope.category._id,
						name : $scope.category.name
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {
				$("#warning_btn").click();
			}
		},
		doEdit : function(c){
			$scope.category = c;
		},
		doDelete : function(c){
			if(confirm("Do you want to delete this category?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteDealCategory,
					data : {
						id : c._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCancel : function(){
			$scope.category = {_id:"", name:""};
		},
		getCategoryList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDealCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
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