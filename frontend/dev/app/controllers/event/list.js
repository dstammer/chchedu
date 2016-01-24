app.controller("listEventCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getEventList();
	}

	$scope.action = {
		getEventList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEvent,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.event;
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getMyEvent : function(e){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2;

			if($('#event_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#event_range').val(),
					splt = filter.split(' - ');
				d1 = new Date(splt[0]).getTime();
				d2 = new Date(splt[1]).getTime();
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].events && $scope.user[i].events.events && $scope.user[i].events.events.length){
					var events = $scope.user[i].events.events;
					for(var j = 0; j < events.length; j++){
						if(events[j]._id == e._id){
							if($scope.user[i].event_timestamp && $scope.user[i].event_timestamp){
								if($scope.user[i].event_timestamp[e._id] > d1 && $scope.user[i].event_timestamp[e._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		getEventStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2, filter = $('#event_range').val();

			if(filter == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var splt = filter.split(' - ');
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
				if($scope.stats[i].event == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
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
		isExpired : function(d){
			var date = new Date(Date.parse(d.start_date));
			if(date.getTime() > new Date().getTime()){
				return true;
			}

			return false;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#event_range_1').change(function(){
		$scope.$apply();
	});

	$('#event_range_2').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);