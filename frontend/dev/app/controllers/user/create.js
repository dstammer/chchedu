app.controller("createUserCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.user = {
		name : "",
		email : "",
		password : "",
		nationality : "",
		date_of_birth : "",
		address : "",
		mobile : "",
		institution : "",
		settings : {
			"enter" : true,
			"new_deal" : true,
			"preference" : "",
			"redeem" : true,
		}
		
	}

	$scope.map = {
		autoCompleteInput : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });

		}
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createUser,
					data : $scope.user
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listUser";
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
						html = html + '"<option value="' + $scope.list[i] + '">' + $scope.list[i].name + "</option>";
					}

					$scope.user.settings.preference = $scope.list[0].name;
					$('#categorySelector').html(html);

					html = '';
					for(var i = 0; i < Nationality.length; i++){
						html = html + '"<option value="' + Nationality[i] + '">' + Nationality[i] + "</option>";
					}
					$('#nationalitySelector').html(html);
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
			if(!$scope.user.name || !$scope.user.email || !$scope.user.address || !$scope.user.mobile || !$scope.user.institution || !$scope.user.password){
				$('#warning_btn').click();
				return false;
			}

			$scope.user.address = $('#addressAutoComplete').val();
			$scope.user.date_of_birth = $('#birthday').val();
			$scope.user.nationality = $('#nationalitySelector').val();
			$scope.user.settings.preference = $('#categorySelector').val();
			$scope.user.settings.enter = ($('#switcher1').prop('checked'))?"YES":"NO";
			$scope.user.settings.new_deal = ($('#switcher2').prop('checked'))?"YES":"NO";
			$scope.user.settings.redeem = ($('#switcher3').prop('checked'))?"YES":"NO";

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