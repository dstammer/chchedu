app.controller("homeCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getHome();
	}

	$scope.home = {
		caption : "",
		image : ""
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createHome,
					data : $scope.home
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						$('#success_btn').click();
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {

			}
		},
		getHome : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getHome,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					$scope.home = data.home;
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

			if($scope.home && $scope.home.image != ""){
				$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.home.image);
				$('#previewPhoto').css({'display':'block'});
			} else {
				$('#previewPhoto').css({'display':'none'});
			}
			$rootScope.$broadcast("loaded");
		},
		validate : function(){
			if(!$scope.home.caption){
				$('#warning_btn').click();
				return false;
			}

			$scope.home.image = Utils.getBase64Image(document.getElementById('previewPhoto'));

			return true;
		}
	}

	$("#photoFile").change(function(){
		$scope.showPhoto = true;
	    Utils.readURL(this, '#previewPhoto');
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);