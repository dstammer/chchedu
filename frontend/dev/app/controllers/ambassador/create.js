app.controller("createAmbassadorCtrl", ["$scope", "$http", "Utils", function ($scope, $http, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
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
					url : Config.api.endPoint + Config.slug.createAmbassador,
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
		getCategoryList : function(){
			var html = '';
			for(var i = 0; i < Nationality.length; i++){
				html = html + '"<option value="' + Nationality[i] + '">' + Nationality[i] + "</option>";
			}
			$('#categorySelector').html(html);
			$scope.action.initLayout();
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();
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