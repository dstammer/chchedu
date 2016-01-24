app.controller("createDealCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
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
		doCreate : function(){
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

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						html = html + '"<option value="' + $scope.list[i]._id + '">' + $scope.list[i].name + "</option>";
					}
					$('#categorySelector').html(html);
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

					var html = '';
					for(var i = 0; i < $scope.business.length; i++){
						html = html + '"<option value="' + $scope.business[i]._id + '">' + $scope.business[i].name + "</option>";
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