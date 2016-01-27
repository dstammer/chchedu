app.controller("dealCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
	}

	$scope.deal = {
		name : "",
		description : "",
		business : "",
		category : "",
		expiry_date : "",
		redeem_enforced : false,
	}

	$scope.action = {
		doDelete : function(c){
			if(confirm("Do you want to delete this business?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteDeal,
					data : {
						id : $scope.deal._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listDeal";
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateDeal,
					data : $scope.deal
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listDeal";
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {

			}
		},
		doCreateNew : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createDeal,
					data : $scope.deal
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listDeal";
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {

			}
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
					$scope.action.getBusinessList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusinessList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.business = data.business;
					$scope.action.getDealList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getDealList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDeal,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.deals.length; i++){
						if($state.params.deal_id == data.deals[i]._id){
							$scope.deal = data.deals[i];
							if($scope.deal.category && $scope.deal.category._id){
								$scope.deal.category = $scope.deal.category._id;
							}
							if($scope.deal.business && $scope.deal.business._id){
								$scope.deal.business = $scope.deal.business._id;
							}
							$scope.deal.id = $scope.deal._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						if($scope.list[i] == $scope.deal.category){
							html = html + '"<option value="' + $scope.list[i]._id + '" selected>' + $scope.list[i].name + "</option>";
						} else {
							html = html + '"<option value="' + $scope.list[i]._id + '">' + $scope.list[i].name + "</option>";
						}
					}
					$('#categorySelector').html(html);

					html = '';
					for(var i = 0; i < $scope.business.length; i++){
						if($scope.business[i] == $scope.deal.business){
							html = html + '"<option value="' + $scope.business[i]._id + '" selected>' + $scope.business[i].name + "</option>";
						} else {
							html = html + '"<option value="' + $scope.business[i]._id + '">' + $scope.business[i].name + "</option>";
						}
					}
					$('#businessSelector').html(html);

					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		initLayout : function(){
			$('#categorySelector').val($scope.deal.category);
			$('#businessSelector').val($scope.deal.business);
			$('#switcher1').prop('checked', $scope.deal.redeem_enforced == "YES");
			$('#expiry_date').val($scope.deal.expiry_date);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		},
		validate : function(){
			if(!$scope.deal.name || !$scope.deal.description){
				$('#warning_btn').click();
				return false;
			}

			$scope.deal.category = $('#categorySelector').val();
			$scope.deal.business = $('#businessSelector').val();
			$scope.deal.redeem_enforced = $('#switcher1').prop('checked');
			$scope.deal.expiry_date = $('#expiry_date').val();

			return true;
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);