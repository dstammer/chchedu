app.factory("User", [
		"$http",
		function($http) {
			var user = localStorage.getItem("user");
			return {
				isLoggedIn : function() {
					return localStorage.getItem("user");
				},
				logout : function() {
					user = null;
					localStorage.setItem("user", "");
				}
			}
		} ]);
