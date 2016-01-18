app.controller("userCtrl", ["$scope", "$http", "$state", "Utils", function ($scope, $http, $state, Utils) {	
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
					url : Config.api.endPoint + Config.slug.updateUser,
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
		doDelete : function(c){
			if(confirm("Do you want to delete this user?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteUser,
					data : {
						id : $scope.user._id
					}
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
					$scope.action.getUserList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getUserList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getUser,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.users.length; i++){
						if($state.params.user_id == data.users[i]._id){
							$scope.user = data.users[i];
							$scope.user.id = $scope.user._id;
						}
					}

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
			$('#categorySelector').val($scope.user.settings.preference);
			$('#switcher1').prop('checked', $scope.user.settings.enter == "YES");
			$('#switcher2').prop('checked', $scope.user.settings.new_deal == "YES");
			$('#switcher3').prop('checked', $scope.user.settings.redeem == "YES");
			$('#nationalitySelector').val($scope.user.nationality);
			$('#birthday').val($scope.user.date_of_birth);
			$('#addressAutoComplete').val($scope.user.address);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();		
		},
		validate : function(){
			if(!$scope.user.name || !$scope.user.email || !$scope.user.address || !$scope.user.mobile || !$scope.user.institution){
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