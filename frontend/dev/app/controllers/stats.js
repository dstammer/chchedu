app.controller("statsCtrl", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getUsers();
	}

	$scope.action = {
		getUsers : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getUser,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.user = data.users;
					$scope.action.getBusiness();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusiness : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.business = data.business;
					$scope.action.getDeal();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getDeal : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDeal,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.deal = data.deals;
					$scope.action.getEvent();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getEvent : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEvent,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.event = data.event;
					$scope.action.getAmbassador();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getAmbassador : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getAmbassador,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.ambassador = data.ambassador;
					$scope.action.getGuide();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getGuide : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuide,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.guide = data.guide;
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
		getBusinessStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#business_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#business_range').val(),
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
				if($scope.stats[i].business == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getDealStats : function(d){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#deal_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#deal_range').val(),
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
				if($scope.stats[i].deal == d._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getEventStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#event_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#event_range').val(),
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
				if($scope.stats[i].event == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
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
		getWishlist : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2;

			if($('#deal_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#deal_range').val(),
					splt = filter.split(' - ');

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

			var d1, d2;

			if($('#deal_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#deal_range').val(),
					splt = filter.split(' - ');
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
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#business_range').change(function(){
		$scope.$apply();
	});

	$('#deal_range').change(function(){
		$scope.$apply();
	});

	$('#event_range').change(function(){
		$scope.$apply();
	});

	$('#guide_range').change(function(){
		$scope.$apply();
	});

	$('#ambassador_range').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);