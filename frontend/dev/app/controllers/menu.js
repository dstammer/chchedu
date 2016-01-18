app.controller("menuCtrl", ["$scope", "$state", function ($scope, $state) {		
	$scope.refresh = function () {
		
    }

    $scope.goTo = {
    	index : function(){
    		location.href = "/";
    	},
    	categoryBusiness : function(){
    		location.href = "/categoryBusiness";
    	},
    	createBusiness : function(){
    		location.href = "/createBusiness";
    	},
    	listBusiness : function(){
    		location.href = "/listBusiness";
    	},
    	categoryDeal : function(){
    		location.href = "/categoryDeal";
    	},
    	createDeal : function(){
    		location.href = "/createDeal";
    	},
    	listDeal : function(){
    		location.href = "/listDeal";
    	},
    	categoryEvent : function(){
    		location.href = "/categoryEvent";
    	},
    	createEvent : function(){
    		location.href = "/createEvent";
    	},
    	listEvent : function(){
    		location.href = "/listEvent";
    	},
    	categoryGuide : function(){
    		location.href = "/categoryGuide";
    	},
    	createGuide : function(){
    		location.href = "/createGuide";
    	},
    	listGuide : function(){
    		location.href = "/listGuide";
    	},
    	listUsers : function(){
    		location.href = "/listUser";
    	},
    	createAmbassador : function(){
    		location.href = "/createAmbassador";
    	},
    	listAmbassador : function(){
    		location.href = "/listAmbassador";
    	},

    }

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);