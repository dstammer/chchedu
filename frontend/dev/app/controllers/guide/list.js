app.controller("listGuideCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
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
					var html = '';
					html = html + '<option value="All">All</option>';
					for(var i = 0; i < $scope.category.length; i++){
						html = html + '"<option value="' + $scope.category[i]._id + '">' + $scope.category[i].name + "</option>";
					}
					$('#categorySelector').html(html);
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getCategoryList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuideCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.category = data.cat;
					$scope.action.getGuideList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		filter : function(){
			if(!$scope.category || !$scope.list) return [];
			var filtered = [],
				category = $('#categorySelector').val(),
				type = $('#typeSelector').val();

			for(var i = 0; i < $scope.list.length; i++){
				var skip = false;
				if(type != "All"){
					if($scope.list[i].type && type == "true"){
						skip = true;
					}
					if(!$scope.list[i].type && type == "false"){
						skip = true;
					}
				}
				if(category != "All"){
					if($scope.list[i].category._id != category){
						skip = true;
					}
				}
				if(skip){
					continue;
				}
				filtered.push($scope.list[i]);
			}

			return filtered;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
		}
	}

	$('#typeSelector').change(function(){
		$scope.$apply();
	});

	$('#categorySelector').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);