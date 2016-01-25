app.controller("ambassadorCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getAmbassadorList();
	}

	$scope.ambassador = {
		name : "",
		description : "",
		photo : "",
		nationality : "",
		course : "",
		institution : "",
		video : ""
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateAmbassador,
					data : $scope.ambassador
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listAmbassador";
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
			if(confirm("Do you want to delete this ambassador?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteAmbassador,
					data : {
						id : $scope.ambassador._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listAmbassador";
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		getAmbassadorList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getAmbassador,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.ambassador.length; i++){
						if($state.params.ambassador_id == data.ambassador[i]._id){
							$scope.ambassador = data.ambassador[i];
							$scope.ambassador.id = $scope.ambassador._id;
						}
					}

					var html = '';
					for(var i = 0; i < Nationality.length; i++){
						if(Nationality[i] == $scope.ambassador.nationality){
							html = html + '"<option value="' + Nationality[i] + '" selected>' + Nationality[i] + "</option>";
						} else {
							html = html + '"<option value="' + Nationality[i] + '">' + Nationality[i] + "</option>";
						}
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
		initLayout : function(){
			$('#categorySelector').val($scope.ambassador.nationality);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();

			if($scope.ambassador.photo != ""){
				$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.ambassador.photo);
				$('#previewPhoto').css({'display':'block'});
			} else {
				$('#previewPhoto').css({'display':'none'});
			}
			$rootScope.$broadcast("loaded");
		},
		validate : function(){
			if(!$scope.ambassador.name || !$scope.ambassador.description || !$scope.ambassador.course || !$scope.ambassador.institution || !$scope.ambassador.video){
				$('#warning_btn').click();
				return false;
			}

			$scope.ambassador.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));
			$scope.ambassador.nationality = $('#categorySelector').val();

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