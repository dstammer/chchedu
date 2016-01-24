app.controller("listGuideCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
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
					$scope.action.getStats();
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
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
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
		filter : function(){
			if(!$scope.category || !$scope.list) return [];
			var filtered = [],
				category = $('#categorySelector').val(),
				type = $('#typeSelector').val();

			for(var i = 0; i < $scope.list.length; i++){
				var skip = false;
				if(type != "All"){
					if($scope.list[i].type == "YES" && type == "true"){
						skip = true;
					}
					if(!$scope.list[i].type == "NO" && type == "false"){
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
			FormsPickers.init();

			$rootScope.$broadcast("loaded");
		},
		getGuideStats : function(g){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#guide_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#guide_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			console.log(d1);
			console.log(d2);

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].guide == g._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
	}

	$('#typeSelector').change(function(){
		$scope.$apply();
	});

	$('#categorySelector').change(function(){
		$scope.$apply();
	});

	$('#guide_range').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);