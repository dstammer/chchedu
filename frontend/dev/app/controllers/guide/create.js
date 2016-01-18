app.controller("createGuideCtrl", ["$scope", "$http", "Utils", function ($scope, $http, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
	}

	$scope.guide = {
		title : "",
		text : "",
		photo : "",
		category : "",
		type : false
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createGuide,
					data : $scope.guide
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listGuide";
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
				url : Config.api.endPoint + Config.slug.getGuideCategory,
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
		},
		validate : function(){
			if(!$scope.guide.name || !$scope.guide.description || !$scope.guide.address || !$scope.guide.location.lng || !$scope.guide.location.lat || !$scope.guide.place){
				$('#warning_btn').click();
				return false;
			}

			var price = $("#price").html();
			price = price.replace("($)", "");

			$scope.guide.start_date = $("#start_date").val() + " " + $('#start_time').val();
			$scope.guide.price = price;
			$scope.guide.address = $('#addressAutoComplete').val();
			$scope.guide.category = $('#categorySelector').val();
			$scope.guide.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));

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