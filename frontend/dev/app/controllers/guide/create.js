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
			FormsWysiwyg.init();
		},
		validate : function(){
			$scope.guide.text = $('.note-editable').html();
			if(!$scope.guide.title || !$scope.guide.text || (!$('#inlineRadio1').prop('checked') && !$('#inlineRadio2').prop('checked'))){
				$('#warning_btn').click();
				return false;
			}

			$scope.guide.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));
			$scope.guide.type = $('#inlineRadio2').prop('checked');
			$scope.guide.category = $('#categorySelector').val();

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