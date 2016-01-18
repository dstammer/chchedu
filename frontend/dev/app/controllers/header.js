app.controller("headerCtrl", ["$scope", "$state", function ($scope, $state) {		
	$scope.refresh = function () {
		if($state.current.name == "index"){
			$scope.page = {"title": "Dashboard", "subtitle":"App Stats"};
		} else if($state.current.name == "createBusiness") {
			$scope.page = {"title": "Dashboard", "subtitle":"Create Business"};
		} else if($state.current.name == "listBusiness") {
			$scope.page = {"title": "Dashboard", "subtitle":"Business List"};
		} else if($state.current.name == "categoryBusiness") {
			$scope.page = {"title": "Dashboard", "subtitle":"Business Category"};
		} else if($state.current.name == "business") {
			$scope.page = {"title": "Dashboard", "subtitle":"Manage Business"};
		} else if($state.current.name == "createDeal") {
			$scope.page = {"title": "Dashboard", "subtitle":"Create Deal"};
		} else if($state.current.name == "listDeal") {
			$scope.page = {"title": "Dashboard", "subtitle":"Deal List"};
		} else if($state.current.name == "categoryDeal") {
			$scope.page = {"title": "Dashboard", "subtitle":"Deal Category"};
		} else if($state.current.name == "deal") {
			$scope.page = {"title": "Dashboard", "subtitle":"Manage Deal"};
		} else if($state.current.name == "createEvent") {
			$scope.page = {"title": "Dashboard", "subtitle":"Create Event"};
		} else if($state.current.name == "listEvent") {
			$scope.page = {"title": "Dashboard", "subtitle":"Event List"};
		} else if($state.current.name == "categoryEvent") {
			$scope.page = {"title": "Dashboard", "subtitle":"Event Category"};
		} else if($state.current.name == "event") {
			$scope.page = {"title": "Dashboard", "subtitle":"Manage Event"};
		} else {
			$scope.page = {"title": "Dashboard"};
		}

		console.log($state.current.name);
    }

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);