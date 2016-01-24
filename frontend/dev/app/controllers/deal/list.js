app.controller("listDealCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
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
		goToDeal : function(business_id){
			$state.go('business', {business_id : business_id});
		},
		isExpired : function(d){
			var date = new Date(Date.parse(d.expiry_date));
			if(date.getTime() < new Date().getTime()){
				return true;
			}

			return false;
		},
		getWishlist : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2, filter;
			if(exp){
				filter = $('#deal_range_1').val();
			} else {
				filter = $('#deal_range_2').val();
			}

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

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].deals && $scope.user[i].deals.wishlist && $scope.user[i].deals.wishlist.length){
					var wishlist = $scope.user[i].deals.wishlist;
					for(var j = 0; j < wishlist.length; j++){
						if(wishlist[j] == d._id){
							if($scope.user[i].deal_timestamp && $scope.user[i].deal_timestamp.wishlist){
								if($scope.user[i].deal_timestamp.wishlist[d._id] > d1 && $scope.user[i].deal_timestamp.wishlist[d._id] < d2){
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
		getRedeemed : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2, filter;
			if(exp){
				filter = $('#deal_range_1').val();
			} else {
				filter = $('#deal_range_2').val();
			}

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

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].deals && $scope.user[i].deals.redeemed && $scope.user[i].deals.redeemed.length){
					var redeemed = $scope.user[i].deals.redeemed;
					for(var j = 0; j < redeemed.length; j++){
						if(redeemed[j] == d._id){
							if($scope.user[i].deal_timestamp && $scope.user[i].deal_timestamp.redeemed){
								if($scope.user[i].deal_timestamp.redeemed[d._id] > d1 && $scope.user[i].deal_timestamp.redeemed[d._id] < d2){
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
		getDealStats : function(d, exp){
			if(!$scope.stats) return 0;

			var d1, d2, filter;
			if(exp){
				filter = $('#deal_range_1').val();
			} else {
				filter = $('#deal_range_2').val();
			}

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
				if($scope.stats[i].deal == d._id){
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

	$('#deal_range_1').change(function(){
		$scope.$apply();
	});

	$('#deal_range_2').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);