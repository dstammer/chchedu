app.controller("guideCtrl", ["$scope", "$http", "$state", "Utils", function ($scope, $http, $state, Utils) {	
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
					url : Config.api.endPoint + Config.slug.updateGuide,
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
		doDelete : function(c){
			if(confirm("Do you want to delete this guide?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteGuide,
					data : {
						id : $scope.guide._id
					}
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
					$scope.action.getGuideList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getGuideList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuide,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.guide.length; i++){
						if($state.params.guide_id == data.guide[i]._id){
							$scope.guide = data.guide[i];
							if($scope.guide.category && $scope.guide.category._id){
								$scope.guide.category = $scope.guide.category._id;
							}
							$scope.guide.id = $scope.guide._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						if($scope.list[i] == $scope.guide.category){
							html = html + '"<option value="' + $scope.list[i]._id + '" selected>' + $scope.list[i].name + "</option>";
						} else {
							html = html + '"<option value="' + $scope.list[i]._id + '">' + $scope.list[i].name + "</option>";
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
			$('#categorySelector').val($scope.guide.category);
			$('#guide_text').html($scope.guide.text);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();
			FormsWysiwyg.init();

			$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.guide.photo);
			$('#previewPhoto').css({'display':'block'});

			$('#inlineRadio1').prop('checked', $scope.guide.type == "NO");
			$('#inlineRadio2').prop('checked', $scope.guide.type == "YES");
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