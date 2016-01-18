app.controller("headerController", ["$scope", "$state", "User", "$http", "$translate", function ($scope, $state, User, $http, $translate) {		
	$scope.user = User.isLoggedIn();
	$scope.photo = "assets/images/comment-avatar.png";

	$scope.refresh = function () {
		$scope.user = User.isLoggedIn();
		if($scope.user.photo) $scope.photo = $scope.user.photo;
		$scope.settings = "/";
    }

	$scope.myImage = '';
	$scope.croppedPhoto = '';
	$scope.myCroppedImage = '';

	$scope.file_change = function(evt){
		var file=evt.currentTarget.files[0];
		var reader = new FileReader();
		reader.onload = function(evt){
			$scope.$apply(function($scope){
				$scope.myImage=evt.target.result;
				$('.cropArea').css({'display':'block'});
				$('.croppedPhoto').css({'display':'block'});
				$(document).resize();
			});
		};
		reader.readAsDataURL(file);
	}

	$scope.photoChange = function(photo){
		$scope.croppedPhoto = photo;
	}

	$scope.upload = function(){
		console.log($scope.croppedPhoto);
		console.log($scope.myImage);
		if($scope.croppedPhoto == '' || $scope.myImage == '') return;
		var request = $http({ method : "POST", url : "user/changePhoto", api : true, data : { photo : $scope.croppedPhoto } });
		request.success(function(data){
			if(data.success){
				$scope.user.photo = data.photo;
				$scope.photo = data.photo;
				$('#photoUploadClose').click();
			}
		});
	}

	$scope.home = function(){
	}

	$scope.showUserMenu = function(){
		$("#user-menu").animate({
			opacity: 1,
			height: "toggle"
		}, 100);
	}

	$scope.logout = function(){
		User.logout();
		location.href = "/api/logout";
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);