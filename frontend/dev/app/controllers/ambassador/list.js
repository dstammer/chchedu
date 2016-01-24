app.controller("listAmbassadorCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getAmbassadorList();
	}

	$scope.action = {
		getAmbassadorList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getAmbassador,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.ambassador;
					$scope.action.getStats();
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
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getAmbassadorStats : function(a){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#ambassador_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#ambassador_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].ambassador == a._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#ambassador_range').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);