var loginApp = angular.module("chcheduLogin", ["ngCookies"]);

loginApp.controller("loginCtrl", ["$scope", "$http", function ($scope, $http) {
	//Authentication Error Message to Display
	$scope.authError = null;
	
	//Login Module
	$scope.login = {
		/* Attributes Start */
		email: "",
		password: "",
		submitting: false,
		/* Attributes End */
		
		/* Function Start */
		doLogin: function(){
			//If already calling server api
			if(this.submitting) return;
			this.submitting = true;
			
			if(!this.validate()){			//If validation fails
				this.submitting = false;
				return;
			}

			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.login,
				data : {
					password : this.password,
					email : this.email
				}
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					localStorage.setItem("user", JSON.stringify({email: this.email, password: this.password}));
					$('#success_btn').click();
					setTimeout(function(){
						location.href = "/";
					}, 1000);
				} else {
					$('#err_btn').click();
				}
				$scope.login.submitting = false;
			}).error(function() {
				$scope.login.submitting = false;
			});
		},
		validate: function(){
			if(this.email == "" || this.password == ""){
				$('#warning_btn').click();
				return false;
			}
			
			return true;
		}
		/* Function End */
	};
	
	//Helper functions inside scope
	$scope.helpers = {
		//Clear any alerts inside page
		refresh: function(){
			//If user is already logged in.
			if(User.isLoggedIn()){
				location.href = "/";
			}
		}
	};
	
	//When state changes to 'login'
	$scope.$on('$stateChangeSuccess', function() {
		$scope.helpers.refresh();
	});
}]);