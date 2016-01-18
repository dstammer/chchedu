var app = angular.module("chchedu", ["ngRoute", "ui.router", "ngCookies", "ngImgCrop"]);
var config = {
	siteurl : 'https://www.taskflight.com/'
}

app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$httpProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
    $stateProvider.state("index", {
       url: "/",
       views: {
          "main-content" : { 
            templateUrl: "partials/stats.html",
            controller: "statsCtrl"
          }
       },
       requireLogin : true
    }).state("business", {
       url: "/business/:business_id",
       views: {
          "main-content" : { 
            templateUrl: "partials/business/business.html",
            controller: "businessCtrl"
          }
       },
       requireLogin : true
    }).state("categoryBusiness", {
       url: "/categoryBusiness",
       views: {
          "main-content" : { 
            templateUrl: "partials/business/category.html",
            controller: "categoryBusinessCtrl"
          }
       },
       requireLogin : true
    }).state("createBusiness", {
       url: "/createBusiness",
       views: {
          "main-content" : { 
            templateUrl: "partials/business/create.html",
            controller: "createBusinessCtrl"
          }
       },
       requireLogin : true
    }).state("listBusiness", {
       url: "/listBusiness",
       views: {
          "main-content" : { 
            templateUrl: "partials/business/list.html",
            controller: "listBusinessCtrl"
          }
       },
       requireLogin : true
    }).state("deal", {
       url: "/deal/:deal_id",
       views: {
          "main-content" : { 
            templateUrl: "partials/deal/deal.html",
            controller: "dealCtrl"
          }
       },
       requireLogin : true
    }).state("categoryDeal", {
       url: "/categoryDeal",
       views: {
          "main-content" : { 
            templateUrl: "partials/deal/category.html",
            controller: "categoryDealCtrl"
          }
       },
       requireLogin : true
    }).state("createDeal", {
       url: "/createDeal",
       views: {
          "main-content" : { 
            templateUrl: "partials/deal/create.html",
            controller: "createDealCtrl"
          }
       },
       requireLogin : true
    }).state("listDeal", {
       url: "/listDeal",
       views: {
          "main-content" : { 
            templateUrl: "partials/deal/list.html",
            controller: "listDealCtrl"
          }
       },
       requireLogin : true
    }).state("event", {
       url: "/event/:event_id",
       views: {
          "main-content" : { 
            templateUrl: "partials/event/event.html",
            controller: "eventCtrl"
          }
       },
       requireLogin : true
    }).state("categoryEvent", {
       url: "/categoryEvent",
       views: {
          "main-content" : { 
            templateUrl: "partials/event/category.html",
            controller: "categoryEventCtrl"
          }
       },
       requireLogin : true
    }).state("createEvent", {
       url: "/createEvent",
       views: {
          "main-content" : { 
            templateUrl: "partials/event/create.html",
            controller: "createEventCtrl"
          }
       },
       requireLogin : true
    }).state("listEvent", {
       url: "/listEvent",
       views: {
          "main-content" : { 
            templateUrl: "partials/event/list.html",
            controller: "listEventCtrl"
          }
       },
       requireLogin : true
    }).state("guide", {
       url: "/guide/:guide_id",
       views: {
          "main-content" : { 
            templateUrl: "partials/guide/guide.html",
            controller: "guideCtrl"
          }
       },
       requireLogin : true
    }).state("categoryGuide", {
       url: "/categoryGuide",
       views: {
          "main-content" : { 
            templateUrl: "partials/guide/category.html",
            controller: "categoryGuideCtrl"
          }
       },
       requireLogin : true
    }).state("createGuide", {
       url: "/createGuide",
       views: {
          "main-content" : { 
            templateUrl: "partials/guide/create.html",
            controller: "createGuideCtrl"
          }
       },
       requireLogin : true
    }).state("listGuide", {
       url: "/listGuide",
       views: {
          "main-content" : { 
            templateUrl: "partials/guide/list.html",
            controller: "listGuideCtrl"
          }
       },
       requireLogin : true
    })
    
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    
    //$httpProvider.interceptors.push('middleware');
}]);

app.run(["$rootScope", "$http", "$location", "User", function ($rootScope, $http, $location, User) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 
        if (toState.requireLogin && !User.isLoggedIn()) {
    			location.href = "/login";
        }
    });
}]);
var Config = {
	api: {
		endPoint : "http://chchedu.herokuapp.com/api/"
		endPoint : "http://172.16.1.52:9010/api/"
	},
	slug: {
		login : "admin/login",
		createBusiness : "business/create",
		updateBusiness : "business/update",
		getBusiness : "business/get",
		deleteBusiness : "business/delete",

		createBusinessCategory : "category/create",
		updateBusinessCategory : "category/update",
		getBusinessCategory : "category/get",
		deleteBusinessCategory : "category/delete",

		createDeal : "deal/create",
		updateDeal : "deal/update",
		getDeal : "deal/get",
		deleteDeal : "deal/delete",

		createDealCategory : "deal_category/create",
		updateDealCategory : "deal_category/update",
		getDealCategory : "deal_category/get",
		deleteDealCategory : "deal_category/delete",

		createEvent : "event/create",
		updateEvent : "event/update",
		getEvent : "event/get",
		deleteEvent : "event/delete",

		createEventCategory : "event_category/create",
		updateEventCategory : "event_category/update",
		getEventCategory : "event_category/get",
		deleteEventCategory : "event_category/delete",

		createGuide : "guide/create",
		updateGuide : "guide/update",
		getGuide : "guide/get",
		deleteGuide : "guide/delete",

		createGuideCategory : "guide_category/create",
		updateGuideCategory : "guide_category/update",
		getGuideCategory : "guide_category/get",
		deleteGuideCategory : "guide_category/delete",
	}
}
app.controller("businessCtrl", ["$scope", "$http", "$state", "Utils", function ($scope, $http, $state, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.business = {
		name : "",
		description : "",
		phone : "",
		website : "",
		photo : "",
		category : "",
		price_range : {
			min: "0",
			max: "0"
		},
		address : "",
		location : {lat: 0, lng: 0},
		redeem_enforced : true,
		open_time : {
			"0" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"1" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"2" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"3" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"4" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"5" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"6" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}]
		}
	}

	$scope.map = {
		autoCompleteInput : null,
		mapDiv : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });
			this.mapDiv = google.maps.event.addListener($scope.map.autoCompleteInput, 'place_changed', function() {
				$scope.map.changeMap();
			});

			this.mapDiv = new google.maps.Map(document.getElementById('mapDiv'), {
				zoom: 13,
				center: this.perth,
				disableDoubleClickZoom: true,
			});
		},
		changeMap : function(){
			var place = this.autoCompleteInput.getPlace();
			this.mapDiv.setCenter(place.geometry.location);

			$scope.business.location.lat = place.geometry.location.lat();
			$scope.business.location.lng = place.geometry.location.lng();

			var marker = new google.maps.Marker({
    			position: $scope.business.location,
    			map: this.mapDiv
  			});
		},
		initMap : function(){
			this.mapDiv.setCenter($scope.business.location);

			var marker = new google.maps.Marker({
    			position: $scope.business.location,
    			map: this.mapDiv
  			});
		}
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateBusiness,
					data : $scope.business
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listBusiness";
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
			if(confirm("Do you want to delete this business?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteBusiness,
					data : {
						id : $scope.business._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listBusiness";
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
				url : Config.api.endPoint + Config.slug.getBusinessCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
					$scope.action.getBusinessList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusinessList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.business.length; i++){
						if($state.params.business_id == data.business[i]._id){
							$scope.business = data.business[i];
							if($scope.business.category && $scope.business.category._id){
								$scope.business.category = $scope.business.category._id;
							}
							$scope.business.id = $scope.business._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						if($scope.list[i] == $scope.business.category){
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
			$('#categorySelector').val($scope.business.category);
			$('#switcher1').prop('checked', $scope.business.redeem_enforced == "YES");

			$('#start00').val($scope.business.open_time["0"][0].start);
			$('#start01').val($scope.business.open_time["0"][1].start);
			$('#start10').val($scope.business.open_time["1"][0].start);
			$('#start11').val($scope.business.open_time["1"][1].start);
			$('#start20').val($scope.business.open_time["2"][0].start);
			$('#start21').val($scope.business.open_time["2"][1].start);
			$('#start30').val($scope.business.open_time["3"][0].start);
			$('#start31').val($scope.business.open_time["3"][1].start);
			$('#start40').val($scope.business.open_time["4"][0].start);
			$('#start41').val($scope.business.open_time["4"][1].start);
			$('#start50').val($scope.business.open_time["5"][0].start);
			$('#start51').val($scope.business.open_time["5"][1].start);
			$('#start60').val($scope.business.open_time["6"][0].start);
			$('#start61').val($scope.business.open_time["6"][1].start);

			$('#end00').val($scope.business.open_time["0"][0].end);
			$('#end01').val($scope.business.open_time["0"][1].end);
			$('#end10').val($scope.business.open_time["1"][0].end);
			$('#end11').val($scope.business.open_time["1"][1].end);
			$('#end20').val($scope.business.open_time["2"][0].end);
			$('#end21').val($scope.business.open_time["2"][1].end);
			$('#end30').val($scope.business.open_time["3"][0].end);
			$('#end31').val($scope.business.open_time["3"][1].end);
			$('#end40').val($scope.business.open_time["4"][0].end);
			$('#end41').val($scope.business.open_time["4"][1].end);
			$('#end50').val($scope.business.open_time["5"][0].end);
			$('#end51').val($scope.business.open_time["5"][1].end);
			$('#end60').val($scope.business.open_time["6"][0].end);
			$('#end61').val($scope.business.open_time["6"][1].end);

			$('#priceRange').attr('from', $scope.business.price_range.min);
			$('#priceRange').attr('to', $scope.business.price_range.max);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();

			$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.business.photo);
			$('#previewPhoto').css({'display':'block'});

			$scope.map.initMap();		
		},
		validate : function(){
			if(!$scope.business.name || !$scope.business.description || !$scope.business.phone || !$scope.business.address || !$scope.business.location.lng || !$scope.business.location.lat){
				$('#warning_btn').click();
				return false;
			}

			$scope.business.address = $('#addressAutoComplete').val();
			$scope.business.category = $('#categorySelector').val();
			$scope.business.redeem_enforced = $('#switcher1').prop('checked');
			$scope.business.open_time = {
				"0" : [{"start" : $('#start00').val(), "end" : $('#end00').val()}, {"start" : $('#start01').val(), "end" : $('#end01').val()}],
				"1" : [{"start" : $('#start10').val(), "end" : $('#end10').val()}, {"start" : $('#start11').val(), "end" : $('#end11').val()}],
				"2" : [{"start" : $('#start20').val(), "end" : $('#end20').val()}, {"start" : $('#start21').val(), "end" : $('#end21').val()}],
				"3" : [{"start" : $('#start30').val(), "end" : $('#end30').val()}, {"start" : $('#start31').val(), "end" : $('#end31').val()}],
				"4" : [{"start" : $('#start40').val(), "end" : $('#end40').val()}, {"start" : $('#start41').val(), "end" : $('#end41').val()}],
				"5" : [{"start" : $('#start50').val(), "end" : $('#end50').val()}, {"start" : $('#start51').val(), "end" : $('#end51').val()}],
				"6" : [{"start" : $('#start60').val(), "end" : $('#end60').val()}, {"start" : $('#start61').val(), "end" : $('#end61').val()}]
			};

			var min = $('.irs-from').html(), max = $('.irs-to').html();
			min = min.replace('$', '');
			max = max.replace('$', '');

			$scope.business.price_range = {"min" : min, "max" : max};
			$scope.business.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));

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
app.controller("categoryBusinessCtrl", ["$scope", "$http", function ($scope, $http) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.category = {_id:"", name:""};
		$scope.action.getCategoryList();
	}
	
	$scope.action = {
		doCreate : function(){
			if($scope.category.name){
				var url = Config.api.endPoint;
				if($scope.category._id){
					url = url + Config.slug.updateBusinessCategory;
				} else {
					url = url + Config.slug.createBusinessCategory;
				}

				console.log($scope.category);

				$http({
					method : "POST",
					url : url,
					data : {
						id : $scope.category._id,
						name : $scope.category.name
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {
				$("#warning_btn").click();
			}
		},
		doEdit : function(c){
			$scope.category = c;
		},
		doDelete : function(c){
			if(confirm("Do you want to delete this category?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteBusinessCategory,
					data : {
						id : c._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCancel : function(){
			$scope.category = {_id:"", name:""};
		},
		getCategoryList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusinessCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("createBusinessCtrl", ["$scope", "$http", "Utils", function ($scope, $http, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.business = {
		name : "",
		description : "",
		phone : "",
		website : "",
		photo : "",
		category : "",
		price_range : {
			min: "0",
			max: "0"
		},
		address : "",
		location : {lat: 0, lng: 0},
		redeem_enforced : false,
		open_time : {
			"0" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"1" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"2" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"3" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"4" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"5" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}],
			"6" : [{"start" : "8:00 AM", "end" : "12:00 PM"}, {"start" : "2:00 PM", "end" : "6:00 PM"}]
		}
	}

	$scope.map = {
		autoCompleteInput : null,
		mapDiv : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });
			this.mapDiv = google.maps.event.addListener($scope.map.autoCompleteInput, 'place_changed', function() {
				$scope.map.changeMap();
			});

			this.mapDiv = new google.maps.Map(document.getElementById('mapDiv'), {
				zoom: 13,
				center: this.perth,
				disableDoubleClickZoom: true,
			});
		},
		changeMap : function(){
			var place = this.autoCompleteInput.getPlace();
			this.mapDiv.setCenter(place.geometry.location);

			$scope.business.location.lat = place.geometry.location.lat();
			$scope.business.location.lng = place.geometry.location.lng();

			var marker = new google.maps.Marker({
    			position: $scope.business.location,
    			map: this.mapDiv
  			});
		},
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createBusiness,
					data : $scope.business
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listBusiness";
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
				url : Config.api.endPoint + Config.slug.getBusinessCategory,
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
			if(!$scope.business.name || !$scope.business.description || !$scope.business.phone || !$scope.business.address || !$scope.business.location.lng || !$scope.business.location.lat){
				$('#warning_btn').click();
				return false;
			}

			$scope.business.address = $('#addressAutoComplete').val();
			$scope.business.category = $('#categorySelector').val();
			$scope.business.redeem_enforced = $('#switcher1').prop('checked');
			$scope.business.open_time = {
				"0" : [{"start" : $('#start00').val(), "end" : $('#end00').val()}, {"start" : $('#start01').val(), "end" : $('#end01').val()}],
				"1" : [{"start" : $('#start10').val(), "end" : $('#end10').val()}, {"start" : $('#start11').val(), "end" : $('#end11').val()}],
				"2" : [{"start" : $('#start20').val(), "end" : $('#end20').val()}, {"start" : $('#start21').val(), "end" : $('#end21').val()}],
				"3" : [{"start" : $('#start30').val(), "end" : $('#end30').val()}, {"start" : $('#start31').val(), "end" : $('#end31').val()}],
				"4" : [{"start" : $('#start40').val(), "end" : $('#end40').val()}, {"start" : $('#start41').val(), "end" : $('#end41').val()}],
				"5" : [{"start" : $('#start50').val(), "end" : $('#end50').val()}, {"start" : $('#start51').val(), "end" : $('#end51').val()}],
				"6" : [{"start" : $('#start60').val(), "end" : $('#end60').val()}, {"start" : $('#start61').val(), "end" : $('#end61').val()}]
			};

			var min = $('.irs-from').html(), max = $('.irs-to').html();
			min = min.replace('$', '');
			max = max.replace('$', '');

			$scope.business.price_range = {"min" : min, "max" : max};
			$scope.business.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));

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
app.controller("listBusinessCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getBusinessList();
	}

	$scope.action = {
		getBusinessList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.business;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToBusiness : function(business_id){
			$state.go('business', {business_id : business_id});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("categoryDealCtrl", ["$scope", "$http", function ($scope, $http) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.category = {_id:"", name:""};
		$scope.action.getCategoryList();
	}
	
	$scope.action = {
		doCreate : function(){
			if($scope.category.name){
				var url = Config.api.endPoint;
				if($scope.category._id){
					url = url + Config.slug.updateDealCategory;
				} else {
					url = url + Config.slug.createDealCategory;
				}

				console.log($scope.category);

				$http({
					method : "POST",
					url : url,
					data : {
						id : $scope.category._id,
						name : $scope.category.name
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {
				$("#warning_btn").click();
			}
		},
		doEdit : function(c){
			$scope.category = c;
		},
		doDelete : function(c){
			if(confirm("Do you want to delete this category?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteDealCategory,
					data : {
						id : c._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCancel : function(){
			$scope.category = {_id:"", name:""};
		},
		getCategoryList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDealCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("createDealCtrl", ["$scope", "$http", "Utils", function ($scope, $http, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
	}

	$scope.deal = {
		name : "",
		description : "",
		business : "",
		category : "",
		expiry_date : "",
		redeem_enforced : false,
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createDeal,
					data : $scope.deal
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listDeal";
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
				url : Config.api.endPoint + Config.slug.getDealCategory,
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
					$scope.action.getBusinessList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusinessList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.business = data.business;

					var html = '';
					for(var i = 0; i < $scope.business.length; i++){
						html = html + '"<option value="' + $scope.business[i]._id + '">' + $scope.business[i].name + "</option>";
					}
					$('#businessSelector').html(html);
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
			if(!$scope.deal.name || !$scope.deal.description){
				$('#warning_btn').click();
				return false;
			}

			$scope.deal.category = $('#categorySelector').val();
			$scope.deal.business = $('#businessSelector').val();
			$scope.deal.redeem_enforced = $('#switcher1').prop('checked');
			$scope.deal.expiry_date = $('#expiry_date').val();

			return true;
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("dealCtrl", ["$scope", "$http", "$state", "Utils", function ($scope, $http, $state, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
	}

	$scope.deal = {
		name : "",
		description : "",
		business : "",
		category : "",
		expiry_date : "",
		redeem_enforced : false,
	}

	$scope.action = {
		doDelete : function(c){
			if(confirm("Do you want to delete this business?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteDeal,
					data : {
						id : $scope.deal._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listDeal";
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateDeal,
					data : $scope.deal
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listDeal";
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
				url : Config.api.endPoint + Config.slug.getDealCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
					$scope.action.getBusinessList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusinessList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.business = data.business;
					$scope.action.getDealList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getDealList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDeal,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.deals.length; i++){
						if($state.params.deal_id == data.deals[i]._id){
							$scope.deal = data.deals[i];
							if($scope.deal.category && $scope.deal.category._id){
								$scope.deal.category = $scope.deal.category._id;
							}
							if($scope.deal.business && $scope.deal.business._id){
								$scope.deal.business = $scope.deal.business._id;
							}
							$scope.deal.id = $scope.deal._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						if($scope.list[i] == $scope.deal.category){
							html = html + '"<option value="' + $scope.list[i]._id + '" selected>' + $scope.list[i].name + "</option>";
						} else {
							html = html + '"<option value="' + $scope.list[i]._id + '">' + $scope.list[i].name + "</option>";
						}
					}
					$('#categorySelector').html(html);

					html = '';
					for(var i = 0; i < $scope.business.length; i++){
						if($scope.business[i] == $scope.deal.business){
							html = html + '"<option value="' + $scope.business[i]._id + '" selected>' + $scope.business[i].name + "</option>";
						} else {
							html = html + '"<option value="' + $scope.business[i]._id + '">' + $scope.business[i].name + "</option>";
						}
					}
					$('#businessSelector').html(html);

					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		initLayout : function(){
			$('#categorySelector').val($scope.deal.category);
			$('#businessSelector').val($scope.deal.business);
			$('#switcher1').prop('checked', $scope.deal.redeem_enforced == "YES");
			$('#expiry_date').val($scope.deal.expiry_date);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();
		},
		validate : function(){
			if(!$scope.deal.name || !$scope.deal.description){
				$('#warning_btn').click();
				return false;
			}

			$scope.deal.category = $('#categorySelector').val();
			$scope.deal.business = $('#businessSelector').val();
			$scope.deal.redeem_enforced = $('#switcher1').prop('checked');
			$scope.deal.expiry_date = $('#expiry_date').val();

			return true;
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("listDealCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getDealList();
	}

	$scope.action = {
		getDealList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDeal,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.deals;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToDeal : function(business_id){
			$state.go('business', {business_id : business_id});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("categoryEventCtrl", ["$scope", "$http", function ($scope, $http) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.category = {_id:"", name:""};
		$scope.action.getCategoryList();
	}
	
	$scope.action = {
		doCreate : function(){
			if($scope.category.name){
				var url = Config.api.endPoint;
				if($scope.category._id){
					url = url + Config.slug.updateEventCategory;
				} else {
					url = url + Config.slug.createEventCategory;
				}

				console.log($scope.category);

				$http({
					method : "POST",
					url : url,
					data : {
						id : $scope.category._id,
						name : $scope.category.name
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {
				$("#warning_btn").click();
			}
		},
		doEdit : function(c){
			$scope.category = c;
		},
		doDelete : function(c){
			if(confirm("Do you want to delete this category?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteEventCategory,
					data : {
						id : c._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCancel : function(){
			$scope.category = {_id:"", name:""};
		},
		getCategoryList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEventCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("createEventCtrl", ["$scope", "$http", "Utils", function ($scope, $http, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.event = {
		name : "",
		description : "",
		photo : "",
		category : "",
		price : "",
		address : "",
		start_date : "",
		location : {lat: 0, lng: 0},
		place : ""
	}

	$scope.map = {
		autoCompleteInput : null,
		mapDiv : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });
			this.mapDiv = google.maps.event.addListener($scope.map.autoCompleteInput, 'place_changed', function() {
				$scope.map.changeMap();
			});

			this.mapDiv = new google.maps.Map(document.getElementById('mapDiv'), {
				zoom: 13,
				center: this.perth,
				disableDoubleClickZoom: true,
			});
		},
		changeMap : function(){
			var place = this.autoCompleteInput.getPlace();
			this.mapDiv.setCenter(place.geometry.location);

			$scope.event.location.lat = place.geometry.location.lat();
			$scope.event.location.lng = place.geometry.location.lng();

			var marker = new google.maps.Marker({
    			position: $scope.event.location,
    			map: this.mapDiv
  			});
		},
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createEvent,
					data : $scope.event
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listEvent";
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
				url : Config.api.endPoint + Config.slug.getEventCategory,
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
			if(!$scope.event.name || !$scope.event.description || !$scope.event.address || !$scope.event.location.lng || !$scope.event.location.lat || !$scope.event.place){
				$('#warning_btn').click();
				return false;
			}

			var price = $("#price").html();
			price = price.replace("($)", "");

			$scope.event.start_date = $("#start_date").val() + " " + $('#start_time').val();
			$scope.event.price = price;
			$scope.event.address = $('#addressAutoComplete').val();
			$scope.event.category = $('#categorySelector').val();
			$scope.event.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));

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
app.controller("eventCtrl", ["$scope", "$http", "$state", "Utils", function ($scope, $http, $state, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.event = {
		name : "",
		description : "",
		photo : "",
		category : "",
		price : "",
		address : "",
		start_date : "",
		location : {lat: 0, lng: 0},
		place : ""
	}

	$scope.map = {
		autoCompleteInput : null,
		mapDiv : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });
			this.mapDiv = google.maps.event.addListener($scope.map.autoCompleteInput, 'place_changed', function() {
				$scope.map.changeMap();
			});

			this.mapDiv = new google.maps.Map(document.getElementById('mapDiv'), {
				zoom: 13,
				center: this.perth,
				disableDoubleClickZoom: true,
			});
		},
		changeMap : function(){
			var place = this.autoCompleteInput.getPlace();
			this.mapDiv.setCenter(place.geometry.location);

			$scope.event.location.lat = place.geometry.location.lat();
			$scope.event.location.lng = place.geometry.location.lng();

			var marker = new google.maps.Marker({
    			position: $scope.event.location,
    			map: this.mapDiv
  			});
		},
		initMap : function(){
			this.mapDiv.setCenter($scope.event.location);

			var marker = new google.maps.Marker({
    			position: $scope.event.location,
    			map: this.mapDiv
  			});
		}
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateEvent,
					data : $scope.event
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listEvent";
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
			if(confirm("Do you want to delete this event?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteEvent,
					data : {
						id : $scope.event._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listEvent";
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
				url : Config.api.endPoint + Config.slug.getEventCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
					$scope.action.getEventList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getEventList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEvent,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.event.length; i++){
						if($state.params.event_id == data.event[i]._id){
							$scope.event = data.event[i];
							if($scope.event.category && $scope.event.category._id){
								$scope.event.category = $scope.event.category._id;
							}
							$scope.event.id = $scope.event._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						if($scope.list[i] == $scope.event.category){
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
			$('#categorySelector').val($scope.event.category);
			$('.nouislider-formatting').attr('start', $scope.event.price * 1000);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();

			$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.event.photo);
			$('#previewPhoto').css({'display':'block'});

			$scope.map.initMap();		
		},
		validate : function(){
			if(!$scope.event.name || !$scope.event.description || !$scope.event.address || !$scope.event.location.lng || !$scope.event.location.lat || !$scope.event.place){
				$('#warning_btn').click();
				return false;
			}

			var price = $("#price").html();
			price = price.replace("($)", "");

			$scope.event.start_date = $("#start_date").val() + " " + $('#start_time').val();
			$scope.event.price = price;
			$scope.event.address = $('#addressAutoComplete').val();
			$scope.event.category = $('#categorySelector').val();
			$scope.event.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));

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
app.controller("listEventCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getEventList();
	}

	$scope.action = {
		getEventList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEvent,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.event;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("categoryGuideCtrl", ["$scope", "$http", function ($scope, $http) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.category = {_id:"", name:""};
		$scope.action.getCategoryList();
	}
	
	$scope.action = {
		doCreate : function(){
			if($scope.category.name){
				var url = Config.api.endPoint;
				if($scope.category._id){
					url = url + Config.slug.updateGuideCategory;
				} else {
					url = url + Config.slug.createGuideCategory;
				}

				console.log($scope.category);

				$http({
					method : "POST",
					url : url,
					data : {
						id : $scope.category._id,
						name : $scope.category.name
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			} else {
				$("#warning_btn").click();
			}
		},
		doEdit : function(c){
			$scope.category = c;
		},
		doDelete : function(c){
			if(confirm("Do you want to delete this category?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteGuideCategory,
					data : {
						id : c._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = location.href;
					} else {
						$('#err_btn').click();
					}
				}).error(function() {
					$('#err_btn').click();
				});
			}
		},
		doCancel : function(){
			$scope.category = {_id:"", name:""};
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
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
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
app.controller("eventCtrl", ["$scope", "$http", "$state", "Utils", function ($scope, $http, $state, Utils) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.event = {
		name : "",
		description : "",
		photo : "",
		category : "",
		price : "",
		address : "",
		start_date : "",
		location : {lat: 0, lng: 0},
		place : ""
	}

	$scope.map = {
		autoCompleteInput : null,
		mapDiv : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });
			this.mapDiv = google.maps.event.addListener($scope.map.autoCompleteInput, 'place_changed', function() {
				$scope.map.changeMap();
			});

			this.mapDiv = new google.maps.Map(document.getElementById('mapDiv'), {
				zoom: 13,
				center: this.perth,
				disableDoubleClickZoom: true,
			});
		},
		changeMap : function(){
			var place = this.autoCompleteInput.getPlace();
			this.mapDiv.setCenter(place.geometry.location);

			$scope.event.location.lat = place.geometry.location.lat();
			$scope.event.location.lng = place.geometry.location.lng();

			var marker = new google.maps.Marker({
    			position: $scope.event.location,
    			map: this.mapDiv
  			});
		},
		initMap : function(){
			this.mapDiv.setCenter($scope.event.location);

			var marker = new google.maps.Marker({
    			position: $scope.event.location,
    			map: this.mapDiv
  			});
		}
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateEvent,
					data : $scope.event
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listEvent";
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
			if(confirm("Do you want to delete this event?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteEvent,
					data : {
						id : $scope.event._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listEvent";
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
				url : Config.api.endPoint + Config.slug.getEventCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
					$scope.action.getEventList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getEventList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEvent,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.event.length; i++){
						if($state.params.event_id == data.event[i]._id){
							$scope.event = data.event[i];
							if($scope.event.category && $scope.event.category._id){
								$scope.event.category = $scope.event.category._id;
							}
							$scope.event.id = $scope.event._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						if($scope.list[i] == $scope.event.category){
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
			$('#categorySelector').val($scope.event.category);
			$('.nouislider-formatting').attr('start', $scope.event.price * 1000);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();

			$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.event.photo);
			$('#previewPhoto').css({'display':'block'});

			$scope.map.initMap();		
		},
		validate : function(){
			if(!$scope.event.name || !$scope.event.description || !$scope.event.address || !$scope.event.location.lng || !$scope.event.location.lat || !$scope.event.place){
				$('#warning_btn').click();
				return false;
			}

			var price = $("#price").html();
			price = price.replace("($)", "");

			$scope.event.start_date = $("#start_date").val() + " " + $('#start_time').val();
			$scope.event.price = price;
			$scope.event.address = $('#addressAutoComplete').val();
			$scope.event.category = $('#categorySelector').val();
			$scope.event.photo = Utils.getBase64Image(document.getElementById('previewPhoto'));

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
app.controller("listGuideCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();

		$scope.action.getGuideList();
	}

	$scope.action = {
		getGuideList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuide,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.guide;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
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
app.controller("objectiveController", ["$scope", "$rootScope", "$http", "$location", "User", '$route', '$q', '$timeout', 'HtmlGenerator', 'Utils', "$translate", "$compile", function ($scope, $rootScope, $http, $location, User, $route, $q, $timeout, HtmlGenerator, Utils, $translate, $compile) {	
	/* Variables Used In This Scope */
	$scope.user = User.isLoggedIn();
	$scope.entities = {
		objectives: [],
		users: [],
		tasks: [],
	};
	$scope.comment_files = [];
	$scope.selectedEntity = {
		objective: -1,
		eObjective: {},
		task: {},

	};
	$scope.selectedCompany = User.getCurrentCompanyId();
	$scope.selectedFiles = "";
	$scope.newData = {
		objData: {},
		taskData: {},
		taskObj: {},
		commentData: {
			'comment': '',
			'placeholder': 'controller.objective.Type a comment'
		}
	};
	$scope.searchData = {text:"", active:false, objectives:[], tasks:[], files:[], comments: [], title: "OBJECTIVES", tab: 0};
	$scope.flags = {
		objTab: 0,
		taskTab: 0,
		showChangeOptions: false,
		loading: true
	}

	/* Main Function of this Scope */
	$scope.refresh = function (force) {
		var tzs = Utils.tzdetect.matches();
		
		if(!force){
			if(User.isLoggedIn().timezone){
				if(tzs.length){
					for(var i = 0; i < tzs.length; i++){
						if(tzs[i] == User.isLoggedIn().timezone){
							break;
						} else if( i == tzs.length - 1){
							$rootScope.$broadcast('flash:confirm', {message: 'controller.objective.Taskflight would like to use your location.', 
								params: {timezone: tzs[0]}});
							return;
						}
					}
				}			
			} else {
				$rootScope.$broadcast('flash:confirm', {message: 'controller.objective.You do not have any timezone set yet. Do you want Taskflight to detect and set the timezone for you?', 
					params: {timezone: tzs[0]}});
				return;
			}
		}
		/* Initialize Variables */
		$scope.user = User.isLoggedIn();
		window.Intercom('boot', {
			app_id: 'f465e25ba5fbfd52a337b0fe90b3e3e04c6e8ad6',
			email: $scope.user.email,
			widget: {
				activator: '#IntercomDefaultWidget'
			}
		});
		window.Intercom('reattach_activator');
		
		$scope.entities = {
			objectives: [],
			users: [],
			tasks: [],
		};
		$scope.selectedEntity = {
			objective: -1,
			task: {},

		};
		$scope.selectedFiles = "";
		$scope.newData = {
			objData: {},
			taskData: {},
			taskObj: {},
			commentData: {
				'comment': '',
				'placeholder': 'controller.objective.Type a comment'
			}
		};
		$scope.selectedCompany = User.getCurrentCompanyId();
		$scope.searchData = {text:"", active:false, objectives:[], tasks:[], files:[], comments: [], title: "OBJECTIVES", tab: 0};
		$scope.flags = {
			objTab: 0,
			taskTab: 0,
			showChangeOptions: false,
			loading: true
		}
		/* Variable Initialization Ends */

		// Open Loading Modal
		initJquery();
		initLightbox();
		setTimeout(function(){
			$('#loadingOpen').click(); }, 100);
		
		/* Fetch Entities from Server */
		$scope.getCompanyMembers().then(function(){
			return $scope.getTasks();
		}).then(function(){
			return $scope.getObjectives();
		}).then(function(){
			setTimeout(function(){
				$scope.flags.loading = false;
				$('#loadingClose').click();
				setTimeout(function(){
					$scope.makeAssigneeHtml();
					$scope.makeObjectiveHtml();
					$scope.makeTaskObjListHtml();
					$scope.makeTaskHtml();
					
					setTimeout(function(){
						$(".hamburglar").show(400);
						if($('#wrapper').css("display") == "none"){
							$("#wrapper").animate({
								opacity: 1,
								height: "toggle"
							}, 1500, function(){
								$rootScope.$broadcast('html5:requestPermission');
								$scope.initObjCreateForm();
								$scope.initTaskCreateForm();
								if(!$scope.user.tutorialPassed){ 
									$scope.tutorial.initVideo();								
									$('#tutorialOpen').click();
								}
							});
						} else {
							$rootScope.$broadcast('html5:requestPermission');
							$scope.initObjCreateForm();
							$scope.initTaskCreateForm();
							if(!$scope.user.tutorialPassed){
								$scope.tutorial.initVideo();							
								$('#tutorialOpen').click();
							}
						}
					});
				}, 1000);
			}, 500);
		});
    }

	// Fetch Tasks Related To Me
	$scope.getTasks = function() {
		var request = $http({ method : "POST", url : "task/getTasks", api : true, data : { company : $scope.selectedCompany } });
		var deferred = $q.defer();

        request.success(function (data) {
            $scope.entities.tasks = data.tasks;
        }).then(function(){
			deferred.resolve();
		});

		return deferred.promise;
	}

	// Fetch Objectives Related To Me
	$scope.getObjectives = function() {
		var request = $http({ method : "POST", url : "objective/getObjectives", api : true, data : { company : $scope.selectedCompany } });
		var deferred = $q.defer();
        request.success(function (data) {
            $scope.entities.objectives = data.objectives;
        }).then(function(){
			deferred.resolve();
		});

		return deferred.promise;
	}

	// Fetch Users In My Company
	$scope.getCompanyMembers = function () {
		var deferred = $q.defer();
        var request = $http({ method : "POST", url : "company/getMembers", api : true, data : { company : $scope.selectedCompany } });
        request.success(function (data) {
			$scope.entities.users = data.members;
        }).then(function(){
			deferred.resolve();
		});

		return deferred.promise;
    }

	// Generate Html For Objective List in "New Objective" Form
	$scope.makeTaskObjListHtml = function(){
		var task_obj_html = HtmlGenerator.getTaskObjectiveHtml($scope.entities.objectives, $scope.entities.users);

		$('#task-objective').html($compile(task_obj_html)($scope));
		jcf.customForms.replaceAll('#task-objective-form, #task-objective');
	}

	// Generate Html For Main Side Bar
	$scope.makeObjectiveHtml = function(){
		var data = HtmlGenerator.getObjectiveHtml($scope.entities.objectives, {tab: 2});
		$('#objective-container').html($compile(data.html)($scope));
		initCycleCarousel($scope.selectObjective);
		initDottedOpenClose();
		/*
		 * if($scope.selectedEntity.objective < 0) var obj_id =
		 * data.first_index; else var obj_id = $scope.selectedEntity.objective;
		 * $scope.selectObjective(obj_id);
		 */
		if($scope.selectedEntity.objective < 0) $scope.selectObjective(data.first_index);
		$scope.sameHeight();
	}

	// Generate Html For Task Tab Page
	$scope.makeTaskHtml = function(){
		var html = HtmlGenerator.getTaskHtml($scope.entities.tasks, {tab: $scope.flags.taskTab});
		
		$('#task-container').html($compile(html)($scope));
		jcf.customForms.replaceAll('#task-container');

		initLightbox();

		setTimeout(
			function(){
				$scope.sameHeight();
		}, 100);		
	}

	// Generat Html For Assignee Lists in "New Task", "New Objective", "Task
	// Detail" Form
	$scope.makeAssigneeHtml = function(){
		$('#obj-assignee-name').val($scope.entities.users[0].firstname + ' ' + $scope.entities.users[0].lastname);
		$('#task-assignee-name').val($scope.entities.users[0].firstname + ' ' + $scope.entities.users[0].lastname);
		$('#task-assignee-list-container').html($compile(HtmlGenerator.getTaskAssigneeHtml($scope.entities.users))($scope));
		$('#task-assignee-change-list-container').html($compile(HtmlGenerator.getTaskAssigneeChangeOptions($scope.entities.users))($scope));
// $('#objective-assignee-change-list-container').html(HtmlGenerator.getTaskAssigneeChangeOptions($scope.entities.users));
		$('#obj-assignee-list-container').html($compile(HtmlGenerator.getObjectiveAssigneeHtml($scope.entities.users))($scope));

		jcf.customForms.replaceAll('#add-obj-title, #obj-ass-list, #add-task-title, #task-ass-list');
		initFormValidation();
		$scope.initCalendar();
		initSlideShow();

		setTimeout(
			function(){
				$scope.sameHeight();
		}, 100);
	}

	// Generate Html For Lounge Tab
	$scope.makeEventHtml = function(){
		if($scope.selectedEntity.objective < 0){
			$('#event-container').html('');
			return;
		}
		/*
		var events = $scope.entities.objectives[$scope.selectedEntity.objective].events;
		events = (events)?events:[];
		var html = HtmlGenerator.getEventHtml(events, $scope.entities.users, $scope);*/
		
		var obj = $scope.entities.objectives[$scope.selectedEntity.objective];
		var html = HtmlGenerator.getEventHtml(obj, $scope.entities.users, $scope);

		$('#event-container').html($compile(html)($scope));

		setTimeout(
			function(){
				$scope.sameHeight();
		}, 100);
	}

	// Generate Html For File Tab
	$scope.makeFileHtml = function(){
		if($scope.selectedEntity.objective < 0){ 
			$('#file_container').html('');
			return;
		}
		var files = $scope.entities.objectives[$scope.selectedEntity.objective].files;
		files = (files)?files:[];
		var html = HtmlGenerator.getFileHtml(files, $scope.entities.users);

		$('#file_container').html($compile(html)($scope));
	};

	// Various Event Handlers
	$scope.eventHandlers = {
		// Event Handler For Task Status Change
		taskCheckboxChange : function(elem){
			var checked = !$(elem).prop('checked');
			$(elem).prop('checked', checked);
			$(elem).prev().removeClass('chk-checked');
			$(elem).prev().removeClass('chk-unchecked');
			var cls = (checked)?'chk-checked':'chk-unchecked';
			$(elem).prev().addClass(cls);

			if($scope.flags.loading){
				return false;
			}
			$scope.flags.loading = true;
			var id = $(elem).attr('id');
			var splt = id.split('_');
			if(!splt.length) return;
			var index = splt[splt.length - 1];
			
			$scope.updateTaskStatus(index, !checked);
		},
		
		// Event Handler For Task Box Click - Opens Task Flash Page
		taskBoxClick : function(elem){
			var splt = $(elem).attr('id').split('_');
			if(splt.length == 0) return;
			var id = splt[splt.length-1];
			$scope.selectedEntity.task = {};
			$('#task-assignee-change-list-container').css({'display': 'none'});
			$scope.flags.showChangeOptions = false;

			for(var i = 0; i < $scope.entities.tasks.length; i++){
				if($scope.entities.tasks[i]._id == id){
					$scope.$apply(function(){
						$scope.selectedEntity.task.index = i;
						$scope.selectedEntity.task._id = $scope.entities.tasks[i]._id;
						$scope.selectedEntity.task.name = $scope.entities.tasks[i].name;
						$scope.selectedEntity.task.description = $scope.entities.tasks[i].description;
						$scope.selectedEntity.task.edit = false;
						$scope.selectedEntity.task.editDesc = false;
						$scope.selectedEntity.task.deadline = Utils.format_date($scope.entities.tasks[i].end);
						$scope.selectedEntity.task.completedDate = Utils.format_date($scope.entities.tasks[i].updateDate);
						$scope.selectedEntity.task.assigner = $scope.entities.tasks[i].assigner;
						$scope.selectedEntity.task.author = Utils.find_user_name($scope.entities.tasks[i].assigner, $scope.entities.users);
						$scope.selectedEntity.task.assignee = Utils.find_user_name($scope.entities.tasks[i].assignee, $scope.entities.users);
						$scope.selectedEntity.task.status = Utils.getStatusText($scope.entities.tasks[i]);

						if($scope.entities.tasks[i].archived) $scope.selectedEntity.task.status = "controller.objective.Archived";
					});
				}
			}
		},
		
		find_user_name : function(user){
			return Utils.find_user_name(user, $scope.entities.users);
		},
		
		isCurrentObjectiveAssignee : function(u){
			if(!$scope.selectedEntity.eObjective || !$scope.selectedEntity.eObjective.assignee) return false;
			for(var i = 0; i < $scope.selectedEntity.eObjective.assignee.length; i++){
				if($scope.selectedEntity.eObjective.assignee[i] == u._id) return true;
			}
			return false;
		},
		
		updateCurrentObjectiveAssignee : function(u){
			for(var i = 0; i < $scope.selectedEntity.eObjective.assignee.length; i++){
				if($scope.selectedEntity.eObjective.assignee[i] == u._id){
					if($scope.selectedEntity.eObjective.assignee.length <= 1) return;
					$scope.selectedEntity.eObjective.assignee.splice(i, 1);
					break;
				} else if(i == $scope.selectedEntity.eObjective.assignee.length - 1){
					$scope.selectedEntity.eObjective.assignee.push(u._id); break;
				}
			}
			
			$scope.eventHandlers.editObjective();
		},
		
		editObjective: function(){
			$scope.selectedEntity.eObjective.edit = false;
			$scope.selectedEntity.eObjective.editDesc = false;
			var index = $scope.selectedEntity.eObjective.index,
				eObjective= $scope.selectedEntity.eObjective,
				objective = $scope.entities.objectives[$scope.selectedEntity.eObjective.index],
				name = objective.name,
				desc = objective.description,
				submit = {};
			
			$scope.entities.objectives[index].name = eObjective.name;
			$scope.entities.objectives[index].description = eObjective.description;
			submit.name = eObjective.name;
			submit.description = eObjective.description;
			submit.assignee = eObjective.assignee;
			submit._id = objective._id;
			$scope.makeObjectiveHtml();
			setTimeout(function(){
				$scope.goToObjectiveSlide(index);
			}, 500);
			$http({	method : "POST", url : "objective/update", api : true, data : {	
				objective : eObjective,
				company : $scope.selectedCompany } });
		},
		
		objectiveClick : function(index){
			$scope.selectedEntity.eObjective = {};
			$scope.$apply(function(){
				$scope.selectedEntity.eObjective.index = index;
				$scope.selectedEntity.eObjective._id = $scope.entities.objectives[index]._id;
				$scope.selectedEntity.eObjective.name = $scope.entities.objectives[index].name;
				$scope.selectedEntity.eObjective.description = $scope.entities.objectives[index].description;
				$scope.selectedEntity.eObjective.edit = false;
				$scope.selectedEntity.eObjective.editDesc = false;
				$scope.selectedEntity.eObjective.deadline = Utils.format_date($scope.entities.objectives[index].end);
				$scope.selectedEntity.eObjective.completedDate = Utils.format_date($scope.entities.objectives[index].updateDate);
				$scope.selectedEntity.eObjective.assigner = $scope.entities.objectives[index].assigner;
				$scope.selectedEntity.eObjective.author = Utils.find_user_name($scope.entities.objectives[index].assigner, $scope.entities.users);
				$scope.selectedEntity.eObjective.assignee = $scope.entities.objectives[index].assignee;
				$scope.selectedEntity.eObjective.status = $scope.entities.objectives[index].completeness + " %";
				$scope.selectedEntity.eObjective.task = $scope.entities.objectives[index].tasks.completed + "/" + $scope.entities.objectives[index].tasks.count;
				if($scope.selectedEntity.eObjective.assignee.length == $scope.entities.users.length) $scope.selectedEntity.eObjective.assigneedToAll = true;
				else $scope.selectedEntity.eObjective.assigneedToAll = false;
			});
			$('#objectiveDetailOpen').click();
		},
		
		taskTitleClick : function(){
			$scope.selectedEntity.task.edit = true;
			$('#task-title-edit-input')[0].focus();
		},
		editTaskTitle : function(e){
			if(e.keyCode == 10 || e.keyCode == 13){
				$scope.eventHandlers.editTask();
			}
		},
		editTask : function(){
			$scope.selectedEntity.task.edit = false;
			$scope.selectedEntity.task.editDesc = false;
			var index = $scope.selectedEntity.task.index,
				task = $scope.entities.tasks[index],
				name = task.name,
				desc = task.description;
			
			task.name = $scope.selectedEntity.task.name;
			task.description = $scope.selectedEntity.task.description;
			$scope.entities.tasks[index].name = task.name;
			$scope.entities.tasks[index].description = task.description;
			$scope.makeTaskHtml();

			$http({	method : "POST", url : "task/update", api : true, data : {	
				task : task,
				company : $scope.selectedCompany } });
		},
		taskDescClick : function(){
			$scope.selectedEntity.task.editDesc = true;
			$('#task-description-edit-input')[0].focus();
		},
		editTaskDescription: function(e){
			if((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey){
				$scope.eventHandlers.editTask();
			}
		},
		
		objectiveTitleClick : function(){
			$scope.selectedEntity.eObjective.edit = true;
		},
		editObjectiveTitle : function(e){
			if(e.keyCode == 10 || e.keyCode == 13){
				$scope.eventHandlers.editObjective();
			}
		},
		objectiveDescClick : function(){
			$scope.selectedEntity.eObjective.editDesc = true;
		},
		editObjectiveDescription: function(e){
			if((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey){
				$scope.eventHandlers.editObjective();
			}
		},
		// Event Handler For Assignee Change in "New Objective" Form
		objectiveAssigneeListChange : function(){
			$('#obj-assignee-name').val('');
			$('#obj-assignee-list option:selected').each(function(index, value){
				var txt = $('#obj-assignee-name').val();
				if(index == 0) $('#obj-assignee-name').val($(value).text());
				else $('#obj-assignee-name').val(txt + ", " + $(value).text());
			});
		},

		// Event Handler For Assignee Change in "New Task" Form
		taskAssigneeListChange : function(){
			$('#task-assignee-name').val($('#task-assignee-list option:selected').text());
		},
		
		// Show/Hide Task Assignee Change Options Tooltip in Task Flash Page
		showTaskAssigneeChangeOptions : function(){
			$scope.flags.showChangeOptions = !$scope.flags.showChangeOptions;

			if($scope.flags.showChangeOptions) $('#task-assignee-change-list-container').css({'display': 'inline-block'});
			else $('#task-assignee-change-list-container').css({'display': 'none'});
		},
		
		// Show/Hide Objective Assignee Change Options Tooltip in Task Flash
		// Page
		showObjectiveAssigneeChangeOptions : function(){
			$scope.flags.showChangeOptions = !$scope.flags.showChangeOptions;
			if($scope.flags.showChangeOptions) $('#objective-assignee-change-list-container').css({'display': 'inline-block'});
			else $('#objective-assignee-change-list-container').css({'display': 'none'});
		},
		
		selectAllObjectiveAssignee : function(){
			if($scope.selectedEntity.eObjective.assigneedToAll){
				$scope.selectedEntity.eObjective.assignee = [$scope.user._id];
				$scope.selectedEntity.eObjective.assigneedToAll = false;
				$scope.eventHandlers.editObjective();
				return;
			} else {
				$scope.selectedEntity.eObjective.assignee = [];
				for(var i = 0; i < $scope.entities.users.length; i++)
					$scope.selectedEntity.eObjective.assignee.push($scope.entities.users[i]._id);
				$scope.selectedEntity.eObjective.assigneedToAll = true;
				$scope.eventHandlers.editObjective();
				return;
			}
		},

		// Download File
		fileBoxClick : function(elem){
			if($scope.selectedEntity.objective < 0) return;
			var obj = $scope.entities.objectives[$scope.selectedEntity.objective];
			var splt = $(elem).attr('id').split("_");
			if(splt.length != 2) return;
			var id = splt[1];

			if(obj.files && obj.files.length){
				for(var i = 0; i < obj.files.length; i++){
					if(obj.files[i]._id == id){
						var link = document.createElement('a');
						document.body.appendChild(link);
						link.style = "display: none";
						link.href = obj.files[i].url;
						if(typeof link.download != "undefined") link.download = obj.files[i].name;
						link.target = '_blank';								
						link.click();
						window.URL.revokeObjectURL(obj.files[i].url);
					}
				}
			}
		},

		// When user clicks files for a comment, go to files tab
		eventBoxClick : function(str){
			$('#tab-files').click();

			var ids = str.split(":");
			for(var i = 0; i < ids.length; i++){
				$('#file_' + ids[i]).addClass('active');
			}
			
			setTimeout(function(){
				$('#file_container').animate({
					scrollTop: $('#file_container').scrollTop() + $('#file_' + ids[0]).position().top - 10
				}, 500);
			}, 100);

			$scope.selectTab();
		},
		newTask : function(){
			$('#new_task_button').click();
			var obj = $scope.entities.objectives[$scope.selectedEntity.objective];
			$('#task-obj-id').val(obj._id);
			$('#task-obj-id').attr('value', obj._id);


			var event; // The custom event that will be created

			  if (document.createEvent) {
			    event = document.createEvent("HTMLEvents");
			    event.initEvent("change", true, true);
			  } else {
			    event = document.createEventObject();
			    event.eventType = "change";
			  }

			  event.eventName = "change";

			  if (document.createEvent) {
			    document.getElementById('task-obj-id').dispatchEvent(event);
			  } else {
				document.getElementById('task-obj-id').fireEvent("on" + event.eventType, event);
			  }
		},
	};

	/* Tab Switch Events */
	$scope.goToLounge = function(){
		$scope.selectTab();
	}

	$scope.goToTask = function(){
		$scope.taskTabClick();
	}

	$scope.goToFiles = function(){
		$('.file-box').removeClass('active');
		$scope.selectTab();
	}
	/* Tab Switch Events Ends */

	// Go to specific objective slide in the main sidebar
	$scope.goToObjectiveSlide = function(index){
		$('#objective-container .slide').each(function(i, item){
			if($(item).attr('data-id') == index){
				if( $('div.cycle-gallery').data('ScrollAbsoluteGallery') ){
					if($('div.cycle-gallery').data('ScrollAbsoluteGallery').currentIndex == i) $scope.selectObjective(i);
					else $('div.cycle-gallery').data('ScrollAbsoluteGallery').numSlide(i);
				}
			}
		});
	}

	// Set the current selected objective
	$scope.selectObjective = function(id){
		$scope.selectedEntity.objective = id;

		$scope.makeEventHtml();
		$scope.makeFileHtml();

		setTimeout(
			function(){
				$scope.drawGraph();
		}, 100);
	}

	// Draw Objective Completeness Graph
	$scope.drawGraph = function(){
		if($scope.selectedEntity.objective < 0) return;

		var percent = parseFloat($scope.entities.objectives[$scope.selectedEntity.objective].completeness) / 100;

		function draw(p){
			if(p > percent) p = percent;
			$('.chart-holder').circleProgress({
				value: p,
				startAngle: Math.PI / 2,
				animation: false,
				size: 118,
				thickness: 10,
				fill: {
					gradient:['#f07824', '#e88e37', '#f86f0e'],
					image: 'assets/images/progress.png'
				}
			});
			$('.obj-completeness').html(parseInt(parseFloat(p) * 100) + '%');
			if(p == percent) return;
			setTimeout(function(){draw(parseFloat(p) + 0.01);}, 5);
		}

		draw(0);
	}

	/* Rest "New Objective", "New Task" Form */
	$scope.initObjCreateForm = function(){
		$scope.newData.objData.name = $scope.newData.objData.description = "";
		$scope.initCalendar();
		if($('.objective-form').data('FadeGallery')){
			$('.objective-form').data('FadeGallery').prevSlide();
			$('.objective-form').data('FadeGallery').prevSlide();
		}
		$scope.makeAssigneeHtml();
	}
	
	$scope.initTaskCreateForm = function(){
		$scope.newData.taskData.name = $scope.newData.taskData.description = "";
		$scope.initCalendar();
		if($('.task-form').data('FadeGallery')){
			$('.task-form').data('FadeGallery').prevSlide();
			$('.task-form').data('FadeGallery').prevSlide();
		}
		$scope.makeTaskObjListHtml();
		$scope.makeAssigneeHtml();
	}
	/* Rest "New Objective", "New Task" Form Ends */


	// Create New Objective
	$scope.createObjective = function(){
		var assignee = $('#obj-assignee-list').val();
		// If No Assignee Is Selected
		if(!assignee || assignee.length == 0){
			if($('.objective-form').data('FadeGallery')){
				var currSlide = $('.objective-form').data('FadeGallery').slides.eq($('.objective-form').data('FadeGallery').currentIndex);			
				if(currSlide.data('FormValidation')) currSlide.data('FormValidation').doValidation();
			}
			$('#new_objective_button').click();
			return;
		}
		// If Current Slide is Not The Last Slide
		if($('.objective-form').data('FadeGallery')){
			var currIndex = $('.objective-form').data('FadeGallery').currentIndex;
			if(currIndex != 2){
				var currSlide = $('.objective-form').data('FadeGallery').slides.eq(currIndex);
				if(currSlide.data('FormValidation')) currSlide.data('FormValidation').doValidation();
				if(currSlide.data('FormValidation').successFlag && currSlide.hasClass($('.objective-form').data('FadeGallery').options.skipClass)) {
					$('.objective-form').data('FadeGallery').nextSlide();
					currSlide = $('.objective-form').data('FadeGallery').slides.eq(currIndex + 1);
					if(currSlide.data('FormValidation')) currSlide.data('FormValidation').doValidation();
				}

				$('#new_objective_button').click();
				return;
			}
		}

		var day = $('#obj-deadline .day li.active').html(),
			month = $('#obj-deadline .month li.active').attr('month-val'),/*.html(),*/
			year =$('#obj-deadline .year li.active').html(),
			assignee = $('#obj-assignee-list').val(),	
			request = $http({	method : "POST", url : "objective/create", api : true, data : {	
																						name: $scope.newData.objData.name, 
																						description: $scope.newData.objData.description, 
																						assignee: assignee, 
																						deadline: day + '-' + month + '-' + year, 
																						company : $scope.selectedCompany } });

		$scope.initObjCreateForm();
		request.success(function(data){
			if(data.success){
				$scope.entities.objectives.push(data.objective);
				$scope.makeObjectiveHtml();
				$scope.makeTaskObjListHtml();
				$scope.makeAssigneeHtml();
				setTimeout(function(){
					$scope.goToObjectiveSlide($scope.entities.objectives.length - 1);
				}, 500);
			}
		}).then(function(data){
			
		});
	}

	// Create New Task
	$scope.createTask = function(){
		// If Current Slide is Not The Last Slide
		if($('.task-form').data('FadeGallery')){
			var currIndex = $('.task-form').data('FadeGallery').currentIndex;
			if(currIndex != 2){
				var currSlide = $('.task-form').data('FadeGallery').slides.eq(currIndex);
				if(currSlide.data('FormValidation')) currSlide.data('FormValidation').doValidation();
				if(currSlide.data('FormValidation').successFlag && currSlide.hasClass($('.objective-form').data('FadeGallery').options.skipClass)) {
					$('.task-form').data('FadeGallery').nextSlide();
					currSlide = $('.task-form').data('FadeGallery').slides.eq(currIndex + 1);
					if(currSlide.data('FormValidation')) currSlide.data('FormValidation').doValidation();
				}

				$('#new_task_button').click();
				return;
			}
		}

		var objective = $('#task-obj-id').val();
		var day = $('#task-deadline .day li.active').html(),
			month = $('#task-deadline .month li.active').html(),
			year =$('#task-deadline .year li.active').html();
		var assignee = $('#task-assignee-list').val();
		var request = $http({ method : "POST", url : "task/create", api : true, 
			data : { name: $scope.newData.taskData.name, description: $scope.newData.taskData.description, assignee: assignee, deadline: day + '-' + month + '-' + year, objective: objective, company : $scope.selectedCompany } });

		$scope.initTaskCreateForm();
		request.success(function(data){
			$scope.loading = false;

			if(data.success){
				for(var i = 0; i < $scope.entities.objectives.length; i++){
					if($scope.entities.objectives[i]._id == objective){
						$scope.entities.objectives[i].tasks.count++;
						$scope.entities.objectives[i].completeness = parseInt(parseFloat($scope.entities.objectives[i].tasks.completed) / parseFloat($scope.entities.objectives[i].tasks.count) * 100);
						var index = i;
						$('#task-complete-status_' + i).html($scope.entities.objectives[i].tasks.completed + '/' + $scope.entities.objectives[i].tasks.count);
						setTimeout(function(){
							$scope.goToObjectiveSlide(index);
							$scope.entities.tasks.push(data.task);			
							$scope.makeTaskHtml();
						}, 100);
					}
				}
			}
		}).then(function(data){
			$scope.loading = false;
		});
	}
	
	// Change Status of a Task
	$scope.updateTaskStatus = function(index, val){
		if(index < 0 || index > $scope.entities.tasks.length) return;
		var task = $scope.entities.tasks[index];
		task.status = (val)?1:0;
		var request = $http({ method : "POST", url : "task/update", api : true, data : { task: task, company : $scope.selectedCompany } });
		var num = index;

		request.success(function(data){
			$scope.flags.loading = false;
			if(data.success){
				$('#task_' + num).prop('checked', val);
				$('#task_' + num).prev().removeClass('chk-checked');
				$('#task_' + num).prev().removeClass('chk-unchecked');
				var cls = (val)?'chk-checked':'chk-unchecked';
				$('#task_' + num).prev().addClass(cls);

				for(var i = 0; i < $scope.entities.objectives.length; i++){
					if($scope.entities.objectives[i]._id == task.objective){
						var completed = parseInt($scope.entities.objectives[i].tasks.completed);
						if(val) completed++;
						else completed--;
						$scope.entities.objectives[i].tasks.completed = completed;
						$scope.entities.objectives[i].completeness = parseInt(parseInt($scope.entities.objectives[i].tasks.completed) / parseInt($scope.entities.objectives[i].tasks.count) * 100);
						var index = i;
						$('#task-complete-status_' + i).html($scope.entities.objectives[i].tasks.completed + '/' + $scope.entities.objectives[i].tasks.count);
						setTimeout(function(){
							$scope.goToObjectiveSlide(index);
						}, 100);
					}
				}
				$scope.entities.tasks[num] = task;
			}
		}).then(function(data){
			$scope.flags.loading = false;
		});
	}

	// Change the Assignee of the Selected Task
	$scope.updateCurrentTaskAssignee = function(index){
		if(index < 0 || index > $scope.entities.users.length) return;
		if($scope.selectedEntity.task.index == undefined || $scope.selectedEntity.task.index  < 0) return;
		if($scope.flags.loading) return;
		$scope.flags.loading = true;
		var task = $scope.entities.tasks[$scope.selectedEntity.task.index];
		task.assignee = $scope.entities.users[index]._id;

		var request = $http({ method : "POST", url : "task/update", api : true, data : { task: task, company : $scope.selectedCompany } });
		request.success(function(data){
			$scope.flags.loading = false;

			if(data.success){
				if($scope.searchData.active){
					for(var i = 0; i < $scope.searchData.tasks.length; i++){
						if($scope.searchData.tasks[i]._id == $scope.selectedEntity.task._id){
							$scope.searchData.tasks[i].toName = $scope.entities.users[index].firstname + ' ' + $scope.entities.users[index].lastname;
							break;
						}
					}
				}
				setTimeout(function(){
					$('#taskDetailClose').click();
					setTimeout(function(){
						$scope.makeTaskHtml();
						$scope.entities.tasks[$scope.selectedEntity.task.index] = task;
					}, 500);
				}, 500);
				
				// $scope.entities.task.assignee =
				// $scope.entities.users[index].firstname + ' ' +
				// $scope.entities.users[index].lastname;
			}
		}).then(function(data){
		});
	}
	
	// Delete Selected Objective
	$scope.deleteCurrentObjective = function(){
		if($scope.selectedEntity.eObjective.index === undefined || $scope.selectedEntity.eObjective.index  < 0) return;
		if($scope.flags.loading) return;
		$scope.flags.loading = true;
		var objective = $scope.entities.objectives[$scope.selectedEntity.eObjective.index];

		var request = $http({ method : "POST", url : "objective/delete", api : true, data : { objective: objective._id, company : $scope.selectedCompany } });
		request.success(function(data){
			$scope.flags.loading = false;

			if(data.success){
				/*
				 * //If user's is on the search page
				 * if($scope.searchData.active){ for(var i = 0; i <
				 * $scope.searchData.tasks.length; i++){
				 * if($scope.searchData.tasks[i]._id ==
				 * $scope.selectedEntity.task._id){
				 * $scope.searchData.tasks.splice(i, 1); break; } } }
				 */
				$scope.entities.objectives.splice($scope.selectedEntity.eObjective.index, 1);
				setTimeout(function(){
					$('#objectiveDetailClose').click();
					setTimeout(function(){
						$scope.makeObjectiveHtml();
						$scope.goToObjectiveSlide($scope.selectedEntity.eObjective.index);
					}, 500);
				}, 500);
			}
		}).then(function(data){
		});
	}

	// Delete Selected Task
	$scope.deleteCurrentTask = function(){
		if($scope.selectedEntity.task.index === undefined || $scope.selectedEntity.task.index  < 0) return;
		if($scope.flags.loading) return;
		$scope.flags.loading = true;
		var task = $scope.entities.tasks[$scope.selectedEntity.task.index];

		var request = $http({ method : "POST", url : "task/delete", api : true, data : { id: task._id, company : $scope.selectedCompany } });
		request.success(function(data){
			$scope.flags.loading = false;

			if(data.success){			
				// If user's is on the search page
				if($scope.searchData.active){
					for(var i = 0; i < $scope.searchData.tasks.length; i++){
						if($scope.searchData.tasks[i]._id == $scope.selectedEntity.task._id){
							$scope.searchData.tasks.splice(i, 1);
							break;
						}
					}
				}
				$scope.entities.tasks.splice($scope.selectedEntity.task.index, 1);
				setTimeout(function(){
					$('#taskDetailClose').click();
					setTimeout(function(){
						$scope.makeTaskHtml();
						for(i = 0; i < $scope.entities.objectives.length; i++){
							if($scope.entities.objectives[i]._id == task.objective){
								var completed = parseInt($scope.entities.objectives[i].tasks.completed);
								if(task.status == 1) completed--;
								$scope.entities.objectives[i].tasks.completed = completed;
								$scope.entities.objectives[i].tasks.count--;
								if($scope.entities.objectives[i].tasks.count == 0) $scope.entities.objectives[i].completeness = 0;
								else $scope.entities.objectives[i].completeness = parseInt(parseInt($scope.entities.objectives[i].tasks.completed) / parseInt($scope.entities.objectives[i].tasks.count) * 100);
								var index = i;
								$('#task-complete-status_' + i).html($scope.entities.objectives[i].tasks.completed + '/' + $scope.entities.objectives[i].tasks.count);
								setTimeout(function(){
									$scope.goToObjectiveSlide(index);
								}, 100);
							}
						}
					}, 500);
				}, 500);
			}
		}).then(function(data){
		});
	}

	// Archive Current Task
	$scope.archiveCurrentTask = function(){
		if($scope.selectedEntity.task.index === undefined || $scope.selectedEntity.task.index  < 0) return;
		if($scope.flags.loading) return;
		$scope.flags.loading = true;
		var task = $scope.entities.tasks[$scope.selectedEntity.task.index];
		task.archived = true;

		var request = $http({ method : "POST", url : "task/update", api : true, data : { task: task, company : $scope.selectedCompany } });
		request.success(function(data){
			$scope.flags.loading = false;
			if(data.success){
				$scope.entities.tasks[$scope.selectedEntity.task.index].archived = true;
				if($scope.searchData.active){
					for(var i = 0; i < $scope.searchData.tasks.length; i++){
						if($scope.searchData.tasks[i]._id == $scope.selectedEntity.task._id){
							$scope.searchData.tasks[i].statusText = Utils.getStatusText($scope.entities.tasks[$scope.selectedEntity.task.index]);
							break;
						}
					}
				}
				setTimeout(function(){
					$('#taskDetailClose').click();
					setTimeout(function(){
						$scope.makeTaskHtml();
					}, 500);
				}, 500);
			}
		}).then(function(data){
			$scope.flags.loading = false;
		});
	}

	// Restore Current Task
	$scope.unarchiveCurrentTask = function(){
		if($scope.selectedEntity.task.index === undefined || $scope.selectedEntity.task.index  < 0) return;
		if($scope.flags.loading) return;
		$scope.flags.loading = true;
		var task = $scope.entities.tasks[$scope.selectedEntity.task.index];
		task.archived = false;

		var request = $http({ method : "POST", url : "task/update", api : true, data : { task: task, company : $scope.selectedCompany } });
		request.success(function(data){
			$scope.flags.loading = false;
			if(data.success){
				$scope.entities.tasks[$scope.selectedEntity.task.index].archived = false;
				if($scope.searchData.active){
					for(var i = 0; i < $scope.searchData.tasks.length; i++){
						if($scope.searchData.tasks[i]._id == $scope.selectedEntity.task._id){
							$scope.searchData.tasks[i].statusText = Utils.getStatusText($scope.entities.tasks[$scope.selectedEntity.task.index]);
							break;
						}
					}
				}
				setTimeout(function(){
					$('#taskDetailClose').click();
					setTimeout(function(){
						$scope.makeTaskHtml();
					}, 500);
				}, 500);
			}
		}).then(function(data){
			$scope.flags.loading = false;
		});

	}

	// Add a Comment
	$scope.addComment = function(){
		// Check If Comment Is Empty
		if($scope.newData.commentData.comment === undefined || $scope.newData.commentData.comment == ""){
			$scope.newData.commentData.placeholder = "controller.objective.Comment should not be empty!";
			return;
		}

		if($scope.selectedEntity.objective < 0) return;
		if($scope.flags.loading) return;
		$scope.loading = true;

		function newCommentHandler(data, files){
			if(files === undefined) files = [];
			if(data.success){
				setTimeout(function(){
					$scope.entities.objectives[$scope.selectedEntity.objective].events.push({"text": data.comment.comment, 
						"action":"comment", 
						date: data.comment.date, 
						objective: $scope.entities.objectives[$scope.selectedEntity.objective]._id, 
						files: data.comment.files, 
						timestamp: data.timestamp, 
						type: "comment",
						user : $scope.user._id});
					$scope.newData.commentData.placeholder = "controller.objective.Type a comment";
					$scope.newData.commentData.comment = "";
					$('#comment-holder').val('');
					//$('#comment_file_container').html( '<input type="file" id="comment_file" multiple><span class="file-input-text">' + $translate.instant("page.main.Upload files") + '</span><button type="submit">' + $translate.instant("page.main.Send") + '</button>' );								
					$('#comment_file_container').html( $compile('<div class="file-area" onclick="angular.element(this).scope().addCommentFiles();"><label class="jcf-fake-input"><span><em>{{(comment_files.length)?comment_files.length + ' + "'" + ' files uploaded' + "':'" + 'page.main.Upload files' + "'" + ' | translate}}</em></span></label> <a class="jcf-upload-button"><span></span></a></div><button type="submit"><translate>page.main.Send</translate></button>')($scope) );
					jcf.customForms.replaceAll('.comment-form');
					$scope.makeEventHtml();
					$scope.loading = false;
				}, 1000);
			} else {
				$('#uploadStatus').html($compile('<translate>controller.objective.Internal Server Error!</translate>')($scope));
				setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
				return;
			}
		}

		if($scope.comment_files.length){
			$('#uploadOpen').click();
		
			var u = Utils.uploadFiles($scope.comment_files, {company : $scope.selectedCompany, scope: $scope});
			if(!u){ 
				$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
				setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
				return;
			}
			// Upload Files
			u.then(function(data){
				if(data.success){
					var files = data.files;
					var a = Utils.addFilesToObjective(files, $scope.entities.objectives[$scope.selectedEntity.objective]._id, {company : $scope.selectedCompany});
					if(!a){ 
						$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
						setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
						return;
					}
					$('#uploadStatus').html($compile('<translate>controller.objective.Updating objective</translate> <span>"' + $scope.entities.objectives[$scope.selectedEntity.objective].name + '"...</span>')($scope));
					
					// Adding Files to Objective
					a.then(function(data){
						if(data.success){
							$('#uploadStatus').html($compile('<span>' + files.length + '</span> <translate>controller.objective.files uploaded successfully!</translate>')($scope));
							
							setTimeout(function(){
								$('#uploadModalClose').click(); $scope.flags.loading = false;
								setTimeout(function(){
									$scope.entities.objectives[$scope.selectedEntity.objective].files = $scope.entities.objectives[$scope.selectedEntity.objective].files.concat(files);
									$scope.makeFileHtml();
									$scope.comment_files = [];
									
									var request = $http({ method : "POST", url : "comment/create", api : true, data : { comment: $scope.newData.commentData.comment, objective: $scope.entities.objectives[$scope.selectedEntity.objective]._id, files: files, company : $scope.selectedCompany } });
									request.success(function(data){newCommentHandler(data, files)});
								}, 500);
							}, 1000);
							
						} else {
							$('#uploadStatus').html($compile('<translate>controller.objective.Updating objective</translate> "' + $scope.entities.objectives[$scope.selectedEntity.objective].name + '" <translate>controller.objective.failed</translate>!')($scope));
							setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
							return;
						}
					});
				} else {
					$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
					setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
					return;
				}
			});
		} else {
			var request = $http({ method : "POST", url : "comment/create", api : true, data : { comment: $scope.newData.commentData.comment, objective: $scope.entities.objectives[$scope.selectedEntity.objective]._id, files: [], company : $scope.selectedCompany } });
			request.success(function(data){newCommentHandler(data)});
		}

		return true;
	}
	
	$scope.addCommentFiles = function(){
		if($scope.loading) return;
		filepicker.setKey("AWDp9lKqZT6qxE189BBjbz");
		filepicker.pickMultiple(
			{
			    mimetype: '*/*',
			    maxFiles: 5
			},
			function(Blobs){
				$scope.$apply(function(){
					for(var i = 0; i < Blobs.length; i++){
						$scope.comment_files.push({url: Blobs[i].url, name: Blobs[i].filename, type: Blobs[i].mimetype, size: Blobs[i].size});
					}	
				});
			},
			function(error){
				$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
				$scope.loading = false;
			}
		);
	}
	
	// Add files to Objective
	$scope.addFiles = function(){
		if($scope.selectedEntity.objective < 0) return;
		if($scope.flags.loading) return;
		$scope.loading = true;
		
		filepicker.setKey("AWDp9lKqZT6qxE189BBjbz");
		filepicker.pickMultiple(
			{
			    mimetype: '*/*',
			    maxFiles: 5
			},
			function(Blobs){
				var files = [];
				for(var i = 0; i < Blobs.length; i++){
					files.push({url: Blobs[i].url, name: Blobs[i].filename, type: Blobs[i].mimetype, size: Blobs[i].size});
				}
				$('#uploadOpen').click();
				var u = Utils.uploadFiles(files, {company : $scope.selectedCompany, scope: $scope});
				if(!u){ 
					$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
					setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
					return;
				}
				// Upload Files
				u.then(function(data){
					if(data.success){
						files = data.files;
						var a = Utils.addFilesToObjective(files, $scope.entities.objectives[$scope.selectedEntity.objective]._id, {company : $scope.selectedCompany});
						if(!a){ 
							$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!"</translate>')($scope));
							setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
							return;
						}
						$('#uploadStatus').html($compile('<translate>controller.objective.Updating objective</translate> "' + $scope.entities.objectives[$scope.selectedEntity.objective].name + '"...')($scope));
						// Adding Files to Objective
						a.then(function(data){
							if(data.success){
								$('#uploadStatus').html($compile('<span>' + files.length + '</span> <translate>controller.objective.files uploaded successfully!</translate>')($scope));
								setTimeout(function(){
									$('#uploadModalClose').click(); $scope.flags.loading = false;
									setTimeout(function(){
										$scope.entities.objectives[$scope.selectedEntity.objective].files = $scope.entities.objectives[$scope.selectedEntity.objective].files.concat(files);
										$scope.makeFileHtml();
										for(var i = 0; i < files.length; i++){
											$('#file_' + files[i]._id).addClass('active');
										}
										
										setTimeout(function(){
											$('#file_container').animate({
												scrollTop: $('#file_container').scrollTop() + $('#file_' + files[0]._id).position().top - 10
											}, 500);
										}, 100);
									}, 500);
								}, 1000 );
							} else {
								$('#uploadStatus').html($compile('<translate>controller.objective.Updating objective</translate> "' + $scope.entities.objectives[$scope.selectedEntity.objective].name + '" <translate>controller.objective.failed</translate>!')($scope));
								$('#uploadStatus').html('Updating objective "' + $scope.entities.objectives[$scope.selectedEntity.objective].name + '" failed!');
								setTimeout(function(){$('#uploadModalClose').click(); $scope.flags.loading = false;}, 1000 );
								return;
							}
						});
					} else {
						$('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
						$scope.loading = false;
					}
				});
		  },
		  function(error){
			  $('#uploadStatus').html($compile('<translate>controller.objective.File uploading failed!</translate>')($scope));
			  $scope.loading = false;
		  }

		);
		return;
		
	/*
	 * $('#obj_file_container').html( '<input type="file" multiple
	 * id="obj_file"><span class="file-input-text">Add files</span><button
	 * type="submit" class="submit-button">Send</button>' );
	 * jcf.customForms.replaceAll('.newtask'); $scope.makeFileHtml();
	 */
	}

	$scope.selectTaskTabs = function(index){
		$('#task-tabs-container li').removeClass('active');
		$($('#task-tabs-container li')[index]).addClass('active');
		$scope.flags.taskTab = index;
		$scope.makeTaskHtml();
	}

	$scope.sameHeight = function(){
		initSameHeight();
	}

	$scope.taskTabClick = function(){
		setTimeout(
			function(){
				$scope.selectTaskTabs($scope.flags.taskTab);
		}, 10);
	}

	$scope.selectTab = function(){
		setTimeout(
			function(){
				$scope.sameHeight();
		}, 100);
	}

	$('.hamburglar').click(function(){
		$scope.$apply(function(){
			$scope.clearSearch();
		});
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});

	$scope.clearSearch = function(){
		$scope.searchData.text = "";
		$scope.searchData.active = false;
	}
	$scope.activeSearch = function(){
		$('#search-textbox').focus();
		$scope.searchData.active = true;
	}

	$('.search-close-button').click(function(){
		$scope.clearSearch();
	});

	$scope.goToHome = function(){
		if(!$('.setting-slide').hasClass('js-box-hidden')){
			$('.hamburglar').click();
		} else {
			$scope.clearSearch();
		}
	}

	// Search Function
	$scope.$watch('searchData.text', function(nVal, oVal){
		if(nVal == oVal) return;
		$scope.searchData.objectives = [];
		$scope.searchData.comments = [];
		$scope.searchData.files = [];
		$scope.searchData.tasks = [];

		var sTerm = $scope.searchData.text.trim().toLowerCase();
		if(sTerm == ''){
			$('.search-close-button').addClass('search-open-button');
			$('.search-open-button').removeClass('search-close-button');
			return;
		}

		$('.search-open-button').addClass('search-close-button');
		$('.search-close-button').removeClass('search-open-button');

		if($scope.entities.objectives){
			for(var i = 0; i < $scope.entities.objectives.length; i++){
				if($scope.entities.objectives[i].name.toLowerCase().indexOf(sTerm) > -1 || $scope.entities.objectives[i].description.toLowerCase().indexOf(sTerm) > -1){
					var obj = $scope.entities.objectives[i];
					obj.name = Utils.shortenText(obj.name);
					obj.description = Utils.shortenText(obj.description, 95);
					obj.deadline = Utils.format_date($scope.entities.objectives[i].end);
					obj.index = i;
					$scope.searchData.objectives.push(obj);
				}
				if($scope.entities.objectives[i].files){
					for(var j = 0; j < $scope.entities.objectives[i].files.length; j++){
						if($scope.entities.objectives[i].files[j].name.toLowerCase().indexOf(sTerm) > -1){ 
							var f = $scope.entities.objectives[i].files[j], uploader = '';
							f.name = Utils.shortenText(f.name, 50);
							f.formattedUrl = Utils.shortenText(f.url, 100);
							f.formattedDate = Utils.format_date(f.date);
							for(var k = 0; k < $scope.entities.users.length; k++){
								if($scope.entities.users[k]._id == f.uploader) uploader = $scope.entities.users[k].firstname + ' ' + $scope.entities.users[k].lastname;
							}
							f.formattedSize = Utils.formatFileSize(f.size);
							if(uploader == '') uploader = 'New User';
							f.uName = uploader;
							$scope.searchData.files.push(f);
						}
					}
				}
				if($scope.entities.objectives[i].events){
					for(var j = 0; j < $scope.entities.objectives[i].events.length; j++){
						if($scope.entities.objectives[i].events[j].type != "comment") continue;
						if($scope.entities.objectives[i].events[j].text.toLowerCase().indexOf(sTerm) > -1){ 
							var img = '', c = $scope.entities.objectives[i].events[j];
							for(var k = 0; k < $scope.entities.users.length; k++){
								if(c.user == $scope.entities.users[k]._id){ 
									img = $scope.entities.users[k].photo;
								}
							}
							if(img == '' || img === undefined) img = 'assets/images/comment-avatar.png';
							c.photo = img;
							c.text = Utils.shortenText(c.text, 95);
							c.index = i;
							c.deadline = Utils.stimestamp(c.timestamp);
							c.objname = Utils.shortenText($scope.entities.objectives[i].name);
							$scope.searchData.comments.push(c);
						}
					}
				}
			}
		}

		if($scope.entities.tasks){
			for(i = 0; i < $scope.entities.tasks.length; i++){
				if($scope.entities.tasks[i].name.toLowerCase().indexOf(sTerm) > -1 || $scope.entities.tasks[i].description.toLowerCase().indexOf(sTerm) > -1){ 
					var t = $scope.entities.tasks[i], img;
					for(var j = 0; j < $scope.entities.users.length; j++){
						if($scope.entities.users[j]._id == t.assignee){
							img = $scope.entities.users[j].photo;
							t.toName = $scope.entities.users[j].firstname + ' ' + $scope.entities.users[j].lastname;
						}
						if($scope.entities.users[j]._id == t.assigner){
							t.fromName = $scope.entities.users[j].firstname + ' ' + $scope.entities.users[j].lastname;
						}
					}
					if(img == '' || img === undefined) img = 'assets/images/comment-avatar.png';
					t.photo = img;
					t.name = Utils.shortenText(t.name);
					t.statusText = Utils.getStatusText(t);
					t.deadline = Utils.format_date(t.end);
					t.description = Utils.shortenText(t.description);
					t.index = i;
					$scope.searchData.tasks.push(t);
				}
			}
		}

		setTimeout(function(){			$scope.drawSearchGraph();  }, 1000);
		/*
		 * setTimeout(function(){ var $container = $('.search-content');
		 * $container.isotope({ itemSelector: '.search-panel', layoutMode:
		 * 'fitRows' }).isotopeSearchFilter(); }, 100);
		 */
	});

	// Draw Objective Completeness Graph in Search Results
	$scope.drawSearchGraph = function(){
		for(var i=0; i< $scope.searchData.objectives.length; i++){
			var percent = parseFloat($scope.searchData.objectives[i].completeness) / 100;
			if(!$('#search_obj_' + $scope.searchData.objectives[i]._id).length){
				setTimeout(function(){			$scope.drawSearchGraph();  }, 1000);
				return;
			}
			$('#search_obj_' + $scope.searchData.objectives[i]._id).circleProgress({
				value: percent,
				startAngle: Math.PI / 2,
				animation: false,
				size: 70,
				thickness: 7,
				fill: {
					gradient:['#f07824', '#e88e37', '#f86f0e'],
					image: 'assets/images/m-progress.png'
				}
			});
		}
	}

	// Event Handlers for Search page
	$scope.searchEventHandlers = {
		objectives : function(){
			$('.search-tab').removeClass('active');
			$('#search-objective-tab').addClass('active');
			$scope.searchData.title = "controller.objective.OBJECTIVES";
			$scope.searchData.tab = 0;
		},
		tasks : function(){
			$('.search-tab').removeClass('active');
			$('#search-task-tab').addClass('active');
			$scope.searchData.title = "controller.objective.TASKS";
			$scope.searchData.tab = 1;
		},
		comments : function(){
			$('.search-tab').removeClass('active');
			$('#search-comment-tab').addClass('active');
			$scope.searchData.title = "controller.objective.COMMENTS";
			$scope.searchData.tab = 2;
		},
		files : function(){
			$('.search-tab').removeClass('active');
			$('#search-file-tab').addClass('active');
			$scope.searchData.title = "controller.objective.FILES";
			$scope.searchData.tab = 3;
		},
		goToObjective : function(index){
			$scope.searchData.active = false;
			$scope.searchData.text = "";
			setTimeout(function(){
				if( $('.main-slide').hasClass('js-box-hidden') ){
					$('.hamburglar').click();
					setTimeout(function(){
						$scope.goToObjectiveSlide(index);
					}, 500);
					return;
				} 
				
				$scope.goToObjectiveSlide(index);
			}, 500);
		},
		goToTask : function(index){
			$scope.selectedEntity.task.index = index;
			$scope.selectedEntity.task._id = $scope.entities.tasks[index]._id;
			$scope.selectedEntity.task.name = $scope.entities.tasks[index].name;
			$scope.selectedEntity.task.deadline = Utils.format_date($scope.entities.tasks[index].end);
			$scope.selectedEntity.task.assigner = $scope.entities.tasks[index].assigner;
			$scope.selectedEntity.task.author = Utils.find_user_name($scope.entities.tasks[index].assigner, $scope.entities.users);
			$scope.selectedEntity.task.assignee = Utils.find_user_name($scope.entities.tasks[index].assignee, $scope.entities.users);
			$scope.selectedEntity.task.status = Utils.getStatusText($scope.entities.tasks[index]);

			setTimeout(function(){
				$('#taskDetailOpen').click();
			}, 500);
		},
		goToFile : function(index){
			var link = document.createElement('a');
			document.body.appendChild(link);
			link.style = "display: none";
			link.href = $scope.searchData.files[index].url;
			if(typeof link.download != "undefined") link.download = $scope.searchData.files[index].name;
			link.target = '_blank';								
			link.click();
			window.URL.revokeObjectURL($scope.searchData.files[index].url);
		}
	}
	
	$scope.tutorial = {
		page: 0,
		objectiveTitle: "",
		taskTitle: "",
		taskStatus: 0,
		showVideo: false,
		player: [],
		placeholder: "controller.objective.Tell us here",
		next: function(){
			if($scope.tutorial.objectiveTitle == "" && $scope.tutorial.page == 0){
				$scope.tutorial.placeholder = "controller.objective.Please input something...";
				return;
			}
			if($scope.tutorial.taskTitle == "" && $scope.tutorial.page == 1){
				$scope.tutorial.placeholder = "controller.objective.Please input something...";
				return;
			}
			jcf.customForms.replaceAll('#tutorialForm');
			$scope.tutorial.placeholder = "controller.objective.Tell us here";
			$scope.tutorial.page++;
			if($scope.tutorial.page == 1){
				$scope.tutorial.player[1].play();
			}
			//else if($scope.tutorial.page == 2)  $scope.tutorial.player[2].play();
		},
		statusChange: function(){
			$scope.$apply(function(){
				$scope.tutorial.taskStatus = !$scope.tutorial.taskStatus;
			});
			$scope.tutorial.drawGraph();
			
			var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
		    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
		    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
		    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
		    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
		    if ((is_chrome)&&(is_safari)) {is_safari=false;}
		    if ((is_chrome)&&(is_opera)) {is_chrome=false;}
		    
		    if(is_safari){
		    	$scope.$apply(function(){
					$scope.tutorial.page = 3;
				});
		    } else {
		    	$scope.tutorial.player[2].play();
				setTimeout(function(){
					$scope.$apply(function(){
						$scope.tutorial.page = 3;
					});
				}, 6500);	
		    }
		},
		keypress : function(evt){
			if(evt.keyCode == 13 || evt.keyCode == 10){
				$scope.tutorial.next();
			}
		},
		drawGraph : function(){
			var percent = 1;

			function draw(p){
				if(p > percent) p = percent;
				$('.tutorial-chart').circleProgress({
					value: p,
					startAngle: Math.PI / 2,
					animation: false,
					size: 118,
					thickness: 10,
					fill: {
						gradient:['#f07824', '#e88e37', '#f86f0e'],
						//image: 'assets/images/progress.png'
					}
				});
				$('#tutorial-chart-progress').html(parseInt(parseFloat(p) * 100) + '%');
				if(p == percent) return;
				setTimeout(function(){draw(parseFloat(p) + 0.01);}, 5);
			}

			draw(0);
		},
		save: function(){
			$http({ method : "POST", url : "user/tutorialPassed", api : true});
			//$("#newModalOpen").click();
			$("#new_objective_button").click();
			//$('#tutorialClose').click();
			//
		},
		initVideo: function() {
			var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
			var isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
			
			if(isTouchDevice || isWinPhoneDevice){
				jQuery('body').addClass('isTouchDevice');
			}else{
				// main video
				jQuery('#tutorialForm').each(function() {
					var block = jQuery(this);
					var video1 = jQuery('#video1'), video2 = jQuery('#video2'), video3 = jQuery('#video3');
					block.blockResize({blocks: '.video-holder'});
					
					video1.mediaelementplayer({
						pluginPath: window.pathInfo ? pathInfo.base + pathInfo.js : 'js/',
						loop: false,
						enableKeyboard: false,
						pauseOtherPlayers: false,
						clickToPlayPause: false,
						success: function(player, node, instance) {
							jQuery(player).bind('loadeddata', function() {
								$scope.tutorial.player[0] = player;
								$scope.tutorial.player[0].play();
								$scope.tutorial.showVideo = true;
							});
						}
					});
					
					video2.mediaelementplayer({
						pluginPath: window.pathInfo ? pathInfo.base + pathInfo.js : 'js/',
						loop: true,
						enableKeyboard: false,
						pauseOtherPlayers: false,
						clickToPlayPause: false,
						success: function(player, node, instance) {
							jQuery(player).bind('loadeddata', function() {
								$scope.tutorial.player[1] = player;
							});
						}
					});
					
					video3.mediaelementplayer({
						pluginPath: window.pathInfo ? pathInfo.base + pathInfo.js : 'js/',
						loop: false,
						enableKeyboard: false,
						pauseOtherPlayers: false,
						clickToPlayPause: false,
						success: function(player, node, instance) {
							jQuery(player).bind('loadeddata', function() {
								$scope.tutorial.player[2] = player;
							});
						}
					});
				});
			}
		}
	}
	
	$scope.initCalendar = function(){
		initCalendar();
		$(".month-translate").each(function () {
		    var content = $(this);
		    angular.element(document).injector().invoke(function($compile) {
		        var scope = angular.element(content).scope();
		        $compile(content)(scope);
		    });
		});
	}
	
	$rootScope.$on('main:refresh', function(event, args){
		$('#flash-message').css({display: "none"}); $('#flash-backdrop').css({display: "none"});
		$scope.refresh(true);
	});
}]);
app.controller("statsCtrl", ["$scope", function ($scope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
/*!
 * ngImgCrop v0.3.2
 * https://github.com/alexk111/ngImgCrop
 *
 * Copyright (c) 2014 Alex Kaul
 * License: MIT
 *
 * Generated at Wednesday, December 3rd, 2014, 3:54:12 PM
 */
(function() {
'use strict';

var crop = angular.module('ngImgCrop', []);

crop.factory('cropAreaCircle', ['cropArea', function(CropArea) {
  var CropAreaCircle = function() {
    CropArea.apply(this, arguments);

    this._boxResizeBaseSize = 20;
    this._boxResizeNormalRatio = 0.9;
    this._boxResizeHoverRatio = 1.2;
    this._iconMoveNormalRatio = 0.9;
    this._iconMoveHoverRatio = 1.2;

    this._boxResizeNormalSize = this._boxResizeBaseSize*this._boxResizeNormalRatio;
    this._boxResizeHoverSize = this._boxResizeBaseSize*this._boxResizeHoverRatio;

    this._posDragStartX=0;
    this._posDragStartY=0;
    this._posResizeStartX=0;
    this._posResizeStartY=0;
    this._posResizeStartSize=0;

    this._boxResizeIsHover = false;
    this._areaIsHover = false;
    this._boxResizeIsDragging = false;
    this._areaIsDragging = false;
  };

  CropAreaCircle.prototype = new CropArea();

  CropAreaCircle.prototype._calcCirclePerimeterCoords=function(angleDegrees) {
    var hSize=this._size/2;
    var angleRadians=angleDegrees * (Math.PI / 180),
        circlePerimeterX=this._x + hSize * Math.cos(angleRadians),
        circlePerimeterY=this._y + hSize * Math.sin(angleRadians);
    return [circlePerimeterX, circlePerimeterY];
  };

  CropAreaCircle.prototype._calcResizeIconCenterCoords=function() {
    return this._calcCirclePerimeterCoords(-45);
  };

  CropAreaCircle.prototype._isCoordWithinArea=function(coord) {
    return Math.sqrt((coord[0]-this._x)*(coord[0]-this._x) + (coord[1]-this._y)*(coord[1]-this._y)) < this._size/2;
  };
  CropAreaCircle.prototype._isCoordWithinBoxResize=function(coord) {
    var resizeIconCenterCoords=this._calcResizeIconCenterCoords();
    var hSize=this._boxResizeHoverSize/2;
    return(coord[0] > resizeIconCenterCoords[0] - hSize && coord[0] < resizeIconCenterCoords[0] + hSize &&
           coord[1] > resizeIconCenterCoords[1] - hSize && coord[1] < resizeIconCenterCoords[1] + hSize);
  };

  CropAreaCircle.prototype._drawArea=function(ctx,centerCoords,size){
    ctx.arc(centerCoords[0],centerCoords[1],size/2,0,2*Math.PI);
  };

  CropAreaCircle.prototype.draw=function() {
    CropArea.prototype.draw.apply(this, arguments);

    // draw move icon
    this._cropCanvas.drawIconMove([this._x,this._y], this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);

    // draw resize cubes
    this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(), this._boxResizeBaseSize, this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio);
  };

  CropAreaCircle.prototype.processMouseMove=function(mouseCurX, mouseCurY) {
    var cursor='default';
    var res=false;

    this._boxResizeIsHover = false;
    this._areaIsHover = false;

    if (this._areaIsDragging) {
      this._x = mouseCurX - this._posDragStartX;
      this._y = mouseCurY - this._posDragStartY;
      this._areaIsHover = true;
      cursor='move';
      res=true;
      this._events.trigger('area-move');
    } else if (this._boxResizeIsDragging) {
        cursor = 'nesw-resize';
        var iFR, iFX, iFY;
        iFX = mouseCurX - this._posResizeStartX;
        iFY = this._posResizeStartY - mouseCurY;
        if(iFX>iFY) {
          iFR = this._posResizeStartSize + iFY*2;
        } else {
          iFR = this._posResizeStartSize + iFX*2;
        }

        this._size = Math.max(this._minSize, iFR);
        this._boxResizeIsHover = true;
        res=true;
        this._events.trigger('area-resize');
    } else if (this._isCoordWithinBoxResize([mouseCurX,mouseCurY])) {
        cursor = 'nesw-resize';
        this._areaIsHover = false;
        this._boxResizeIsHover = true;
        res=true;
    } else if(this._isCoordWithinArea([mouseCurX,mouseCurY])) {
        cursor = 'move';
        this._areaIsHover = true;
        res=true;
    }

    this._dontDragOutside();
    angular.element(this._ctx.canvas).css({'cursor': cursor});

    return res;
  };

  CropAreaCircle.prototype.processMouseDown=function(mouseDownX, mouseDownY) {
    if (this._isCoordWithinBoxResize([mouseDownX,mouseDownY])) {
      this._areaIsDragging = false;
      this._areaIsHover = false;
      this._boxResizeIsDragging = true;
      this._boxResizeIsHover = true;
      this._posResizeStartX=mouseDownX;
      this._posResizeStartY=mouseDownY;
      this._posResizeStartSize = this._size;
      this._events.trigger('area-resize-start');
    } else if (this._isCoordWithinArea([mouseDownX,mouseDownY])) {
      this._areaIsDragging = true;
      this._areaIsHover = true;
      this._boxResizeIsDragging = false;
      this._boxResizeIsHover = false;
      this._posDragStartX = mouseDownX - this._x;
      this._posDragStartY = mouseDownY - this._y;
      this._events.trigger('area-move-start');
    }
  };

  CropAreaCircle.prototype.processMouseUp=function(/*mouseUpX, mouseUpY*/) {
    if(this._areaIsDragging) {
      this._areaIsDragging = false;
      this._events.trigger('area-move-end');
    }
    if(this._boxResizeIsDragging) {
      this._boxResizeIsDragging = false;
      this._events.trigger('area-resize-end');
    }
    this._areaIsHover = false;
    this._boxResizeIsHover = false;

    this._posDragStartX = 0;
    this._posDragStartY = 0;
  };

  return CropAreaCircle;
}]);



crop.factory('cropAreaSquare', ['cropArea', function(CropArea) {
  var CropAreaSquare = function() {
    CropArea.apply(this, arguments);

    this._resizeCtrlBaseRadius = 10;
    this._resizeCtrlNormalRatio = 0.75;
    this._resizeCtrlHoverRatio = 1;
    this._iconMoveNormalRatio = 0.9;
    this._iconMoveHoverRatio = 1.2;

    this._resizeCtrlNormalRadius = this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio;
    this._resizeCtrlHoverRadius = this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio;

    this._posDragStartX=0;
    this._posDragStartY=0;
    this._posResizeStartX=0;
    this._posResizeStartY=0;
    this._posResizeStartSize=0;

    this._resizeCtrlIsHover = -1;
    this._areaIsHover = false;
    this._resizeCtrlIsDragging = -1;
    this._areaIsDragging = false;
  };

  CropAreaSquare.prototype = new CropArea();

  CropAreaSquare.prototype._calcSquareCorners=function() {
    var hSize=this._size/2;
    return [
      [this._x-hSize, this._y-hSize],
      [this._x+hSize, this._y-hSize],
      [this._x-hSize, this._y+hSize],
      [this._x+hSize, this._y+hSize]
    ];
  };

  CropAreaSquare.prototype._calcSquareDimensions=function() {
    var hSize=this._size/2;
    return {
      left: this._x-hSize,
      top: this._y-hSize,
      right: this._x+hSize,
      bottom: this._y+hSize
    };
  };

  CropAreaSquare.prototype._isCoordWithinArea=function(coord) {
    var squareDimensions=this._calcSquareDimensions();
    return (coord[0]>=squareDimensions.left&&coord[0]<=squareDimensions.right&&coord[1]>=squareDimensions.top&&coord[1]<=squareDimensions.bottom);
  };

  CropAreaSquare.prototype._isCoordWithinResizeCtrl=function(coord) {
    var resizeIconsCenterCoords=this._calcSquareCorners();
    var res=-1;
    for(var i=0,len=resizeIconsCenterCoords.length;i<len;i++) {
      var resizeIconCenterCoords=resizeIconsCenterCoords[i];
      if(coord[0] > resizeIconCenterCoords[0] - this._resizeCtrlHoverRadius && coord[0] < resizeIconCenterCoords[0] + this._resizeCtrlHoverRadius &&
         coord[1] > resizeIconCenterCoords[1] - this._resizeCtrlHoverRadius && coord[1] < resizeIconCenterCoords[1] + this._resizeCtrlHoverRadius) {
        res=i;
        break;
      }
    }
    return res;
  };

  CropAreaSquare.prototype._drawArea=function(ctx,centerCoords,size){
    var hSize=size/2;
    ctx.rect(centerCoords[0]-hSize,centerCoords[1]-hSize,size,size);
  };

  CropAreaSquare.prototype.draw=function() {
    CropArea.prototype.draw.apply(this, arguments);

    // draw move icon
    this._cropCanvas.drawIconMove([this._x,this._y], this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);

    // draw resize cubes
    var resizeIconsCenterCoords=this._calcSquareCorners();
    for(var i=0,len=resizeIconsCenterCoords.length;i<len;i++) {
      var resizeIconCenterCoords=resizeIconsCenterCoords[i];
      this._cropCanvas.drawIconResizeCircle(resizeIconCenterCoords, this._resizeCtrlBaseRadius, this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio);
    }
  };

  CropAreaSquare.prototype.processMouseMove=function(mouseCurX, mouseCurY) {
    var cursor='default';
    var res=false;

    this._resizeCtrlIsHover = -1;
    this._areaIsHover = false;

    if (this._areaIsDragging) {
      this._x = mouseCurX - this._posDragStartX;
      this._y = mouseCurY - this._posDragStartY;
      this._areaIsHover = true;
      cursor='move';
      res=true;
      this._events.trigger('area-move');
    } else if (this._resizeCtrlIsDragging>-1) {
      var xMulti, yMulti;
      switch(this._resizeCtrlIsDragging) {
        case 0: // Top Left
          xMulti=-1;
          yMulti=-1;
          cursor = 'nwse-resize';
          break;
        case 1: // Top Right
          xMulti=1;
          yMulti=-1;
          cursor = 'nesw-resize';
          break;
        case 2: // Bottom Left
          xMulti=-1;
          yMulti=1;
          cursor = 'nesw-resize';
          break;
        case 3: // Bottom Right
          xMulti=1;
          yMulti=1;
          cursor = 'nwse-resize';
          break;
      }
      var iFX = (mouseCurX - this._posResizeStartX)*xMulti;
      var iFY = (mouseCurY - this._posResizeStartY)*yMulti;
      var iFR;
      if(iFX>iFY) {
        iFR = this._posResizeStartSize + iFY;
      } else {
        iFR = this._posResizeStartSize + iFX;
      }
      var wasSize=this._size;
      this._size = Math.max(this._minSize, iFR);
      var posModifier=(this._size-wasSize)/2;
      this._x+=posModifier*xMulti;
      this._y+=posModifier*yMulti;
      this._resizeCtrlIsHover = this._resizeCtrlIsDragging;
      res=true;
      this._events.trigger('area-resize');
    } else {
      var hoveredResizeBox=this._isCoordWithinResizeCtrl([mouseCurX,mouseCurY]);
      if (hoveredResizeBox>-1) {
        switch(hoveredResizeBox) {
          case 0:
            cursor = 'nwse-resize';
            break;
          case 1:
            cursor = 'nesw-resize';
            break;
          case 2:
            cursor = 'nesw-resize';
            break;
          case 3:
            cursor = 'nwse-resize';
            break;
        }
        this._areaIsHover = false;
        this._resizeCtrlIsHover = hoveredResizeBox;
        res=true;
      } else if(this._isCoordWithinArea([mouseCurX,mouseCurY])) {
        cursor = 'move';
        this._areaIsHover = true;
        res=true;
      }
    }

    this._dontDragOutside();
    angular.element(this._ctx.canvas).css({'cursor': cursor});

    return res;
  };

  CropAreaSquare.prototype.processMouseDown=function(mouseDownX, mouseDownY) {
    var isWithinResizeCtrl=this._isCoordWithinResizeCtrl([mouseDownX,mouseDownY]);
    if (isWithinResizeCtrl>-1) {
      this._areaIsDragging = false;
      this._areaIsHover = false;
      this._resizeCtrlIsDragging = isWithinResizeCtrl;
      this._resizeCtrlIsHover = isWithinResizeCtrl;
      this._posResizeStartX=mouseDownX;
      this._posResizeStartY=mouseDownY;
      this._posResizeStartSize = this._size;
      this._events.trigger('area-resize-start');
    } else if (this._isCoordWithinArea([mouseDownX,mouseDownY])) {
      this._areaIsDragging = true;
      this._areaIsHover = true;
      this._resizeCtrlIsDragging = -1;
      this._resizeCtrlIsHover = -1;
      this._posDragStartX = mouseDownX - this._x;
      this._posDragStartY = mouseDownY - this._y;
      this._events.trigger('area-move-start');
    }
  };

  CropAreaSquare.prototype.processMouseUp=function(/*mouseUpX, mouseUpY*/) {
    if(this._areaIsDragging) {
      this._areaIsDragging = false;
      this._events.trigger('area-move-end');
    }
    if(this._resizeCtrlIsDragging>-1) {
      this._resizeCtrlIsDragging = -1;
      this._events.trigger('area-resize-end');
    }
    this._areaIsHover = false;
    this._resizeCtrlIsHover = -1;

    this._posDragStartX = 0;
    this._posDragStartY = 0;
  };

  return CropAreaSquare;
}]);

crop.factory('cropArea', ['cropCanvas', function(CropCanvas) {
  var CropArea = function(ctx, events) {
    this._ctx=ctx;
    this._events=events;

    this._minSize=80;

    this._cropCanvas=new CropCanvas(ctx);

    this._image=new Image();
    this._x = 0;
    this._y = 0;
    this._size = 200;
  };

  /* GETTERS/SETTERS */

  CropArea.prototype.getImage = function () {
    return this._image;
  };
  CropArea.prototype.setImage = function (image) {
    this._image = image;
  };

  CropArea.prototype.getX = function () {
    return this._x;
  };
  CropArea.prototype.setX = function (x) {
    this._x = x;
    this._dontDragOutside();
  };

  CropArea.prototype.getY = function () {
    return this._y;
  };
  CropArea.prototype.setY = function (y) {
    this._y = y;
    this._dontDragOutside();
  };

  CropArea.prototype.getSize = function () {
    return this._size;
  };
  CropArea.prototype.setSize = function (size) {
    this._size = Math.max(this._minSize, size);
    this._dontDragOutside();
  };

  CropArea.prototype.getMinSize = function () {
    return this._minSize;
  };
  CropArea.prototype.setMinSize = function (size) {
    this._minSize = size;
    this._size = Math.max(this._minSize, this._size);
    this._dontDragOutside();
  };

  /* FUNCTIONS */
  CropArea.prototype._dontDragOutside=function() {
    var h=this._ctx.canvas.height,
        w=this._ctx.canvas.width;
    if(this._size>w) { this._size=w; }
    if(this._size>h) { this._size=h; }
    if(this._x<this._size/2) { this._x=this._size/2; }
    if(this._x>w-this._size/2) { this._x=w-this._size/2; }
    if(this._y<this._size/2) { this._y=this._size/2; }
    if(this._y>h-this._size/2) { this._y=h-this._size/2; }
  };

  CropArea.prototype._drawArea=function() {};

  CropArea.prototype.draw=function() {
    // draw crop area
    this._cropCanvas.drawCropArea(this._image,[this._x,this._y],this._size,this._drawArea);
  };

  CropArea.prototype.processMouseMove=function() {};

  CropArea.prototype.processMouseDown=function() {};

  CropArea.prototype.processMouseUp=function() {};

  return CropArea;
}]);

crop.factory('cropCanvas', [function() {
  // Shape = Array of [x,y]; [0, 0] - center
  var shapeArrowNW=[[-0.5,-2],[-3,-4.5],[-0.5,-7],[-7,-7],[-7,-0.5],[-4.5,-3],[-2,-0.5]];
  var shapeArrowNE=[[0.5,-2],[3,-4.5],[0.5,-7],[7,-7],[7,-0.5],[4.5,-3],[2,-0.5]];
  var shapeArrowSW=[[-0.5,2],[-3,4.5],[-0.5,7],[-7,7],[-7,0.5],[-4.5,3],[-2,0.5]];
  var shapeArrowSE=[[0.5,2],[3,4.5],[0.5,7],[7,7],[7,0.5],[4.5,3],[2,0.5]];
  var shapeArrowN=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]];
  var shapeArrowW=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]];
  var shapeArrowS=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]];
  var shapeArrowE=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]];

  // Colors
  var colors={
    areaOutline: '#fff',
    resizeBoxStroke: '#fff',
    resizeBoxFill: '#444',
    resizeBoxArrowFill: '#fff',
    resizeCircleStroke: '#fff',
    resizeCircleFill: '#444',
    moveIconFill: '#fff'
  };

  return function(ctx){

    /* Base functions */

    // Calculate Point
    var calcPoint=function(point,offset,scale) {
        return [scale*point[0]+offset[0], scale*point[1]+offset[1]];
    };

    // Draw Filled Polygon
    var drawFilledPolygon=function(shape,fillStyle,centerCoords,scale) {
        ctx.save();
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        var pc, pc0=calcPoint(shape[0],centerCoords,scale);
        ctx.moveTo(pc0[0],pc0[1]);

        for(var p in shape) {
            if (p > 0) {
                pc=calcPoint(shape[p],centerCoords,scale);
                ctx.lineTo(pc[0],pc[1]);
            }
        }

        ctx.lineTo(pc0[0],pc0[1]);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };

    /* Icons */

    this.drawIconMove=function(centerCoords, scale) {
      drawFilledPolygon(shapeArrowN, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowW, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowS, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowE, colors.moveIconFill, centerCoords, scale);
    };

    this.drawIconResizeCircle=function(centerCoords, circleRadius, scale) {
      var scaledCircleRadius=circleRadius*scale;
      ctx.save();
      ctx.strokeStyle = colors.resizeCircleStroke;
      ctx.lineWidth = 2;
      ctx.fillStyle = colors.resizeCircleFill;
      ctx.beginPath();
      ctx.arc(centerCoords[0],centerCoords[1],scaledCircleRadius,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    this.drawIconResizeBoxBase=function(centerCoords, boxSize, scale) {
      var scaledBoxSize=boxSize*scale;
      ctx.save();
      ctx.strokeStyle = colors.resizeBoxStroke;
      ctx.lineWidth = 2;
      ctx.fillStyle = colors.resizeBoxFill;
      ctx.fillRect(centerCoords[0] - scaledBoxSize/2, centerCoords[1] - scaledBoxSize/2, scaledBoxSize, scaledBoxSize);
      ctx.strokeRect(centerCoords[0] - scaledBoxSize/2, centerCoords[1] - scaledBoxSize/2, scaledBoxSize, scaledBoxSize);
      ctx.restore();
    };
    this.drawIconResizeBoxNESW=function(centerCoords, boxSize, scale) {
      this.drawIconResizeBoxBase(centerCoords, boxSize, scale);
      drawFilledPolygon(shapeArrowNE, colors.resizeBoxArrowFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowSW, colors.resizeBoxArrowFill, centerCoords, scale);
    };
    this.drawIconResizeBoxNWSE=function(centerCoords, boxSize, scale) {
      this.drawIconResizeBoxBase(centerCoords, boxSize, scale);
      drawFilledPolygon(shapeArrowNW, colors.resizeBoxArrowFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowSE, colors.resizeBoxArrowFill, centerCoords, scale);
    };

    /* Crop Area */

    this.drawCropArea=function(image, centerCoords, size, fnDrawClipPath) {
      var xRatio=image.width/ctx.canvas.width,
          yRatio=image.height/ctx.canvas.height,
          xLeft=centerCoords[0]-size/2,
          yTop=centerCoords[1]-size/2;

      ctx.save();
      ctx.strokeStyle = colors.areaOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      fnDrawClipPath(ctx, centerCoords, size);
      ctx.stroke();
      ctx.clip();

      // draw part of original image
      if (size > 0) {
          ctx.drawImage(image, xLeft*xRatio, yTop*yRatio, size*xRatio, size*yRatio, xLeft, yTop, size, size);
      }

      ctx.beginPath();
      fnDrawClipPath(ctx, centerCoords, size);
      ctx.stroke();
      ctx.clip();

      ctx.restore();
    };

  };
}]);

/**
 * EXIF service is based on the exif-js library (https://github.com/jseidelin/exif-js)
 */

crop.service('cropEXIF', [function() {
  var debug = false;

  var ExifTags = this.Tags = {

      // version tags
      0x9000 : "ExifVersion",             // EXIF version
      0xA000 : "FlashpixVersion",         // Flashpix format version

      // colorspace tags
      0xA001 : "ColorSpace",              // Color space information tag

      // image configuration
      0xA002 : "PixelXDimension",         // Valid width of meaningful image
      0xA003 : "PixelYDimension",         // Valid height of meaningful image
      0x9101 : "ComponentsConfiguration", // Information about channels
      0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

      // user information
      0x927C : "MakerNote",               // Any desired information written by the manufacturer
      0x9286 : "UserComment",             // Comments by user

      // related file
      0xA004 : "RelatedSoundFile",        // Name of related sound file

      // date and time
      0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
      0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
      0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
      0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
      0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

      // picture-taking conditions
      0x829A : "ExposureTime",            // Exposure time (in seconds)
      0x829D : "FNumber",                 // F number
      0x8822 : "ExposureProgram",         // Exposure program
      0x8824 : "SpectralSensitivity",     // Spectral sensitivity
      0x8827 : "ISOSpeedRatings",         // ISO speed rating
      0x8828 : "OECF",                    // Optoelectric conversion factor
      0x9201 : "ShutterSpeedValue",       // Shutter speed
      0x9202 : "ApertureValue",           // Lens aperture
      0x9203 : "BrightnessValue",         // Value of brightness
      0x9204 : "ExposureBias",            // Exposure bias
      0x9205 : "MaxApertureValue",        // Smallest F number of lens
      0x9206 : "SubjectDistance",         // Distance to subject in meters
      0x9207 : "MeteringMode",            // Metering mode
      0x9208 : "LightSource",             // Kind of light source
      0x9209 : "Flash",                   // Flash status
      0x9214 : "SubjectArea",             // Location and area of main subject
      0x920A : "FocalLength",             // Focal length of the lens in mm
      0xA20B : "FlashEnergy",             // Strobe energy in BCPS
      0xA20C : "SpatialFrequencyResponse",    //
      0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
      0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
      0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
      0xA214 : "SubjectLocation",         // Location of subject in image
      0xA215 : "ExposureIndex",           // Exposure index selected on camera
      0xA217 : "SensingMethod",           // Image sensor type
      0xA300 : "FileSource",              // Image source (3 == DSC)
      0xA301 : "SceneType",               // Scene type (1 == directly photographed)
      0xA302 : "CFAPattern",              // Color filter array geometric pattern
      0xA401 : "CustomRendered",          // Special processing
      0xA402 : "ExposureMode",            // Exposure mode
      0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
      0xA404 : "DigitalZoomRation",       // Digital zoom ratio
      0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
      0xA406 : "SceneCaptureType",        // Type of scene
      0xA407 : "GainControl",             // Degree of overall image gain adjustment
      0xA408 : "Contrast",                // Direction of contrast processing applied by camera
      0xA409 : "Saturation",              // Direction of saturation processing applied by camera
      0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
      0xA40B : "DeviceSettingDescription",    //
      0xA40C : "SubjectDistanceRange",    // Distance to subject

      // other tags
      0xA005 : "InteroperabilityIFDPointer",
      0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
  };

  var TiffTags = this.TiffTags = {
      0x0100 : "ImageWidth",
      0x0101 : "ImageHeight",
      0x8769 : "ExifIFDPointer",
      0x8825 : "GPSInfoIFDPointer",
      0xA005 : "InteroperabilityIFDPointer",
      0x0102 : "BitsPerSample",
      0x0103 : "Compression",
      0x0106 : "PhotometricInterpretation",
      0x0112 : "Orientation",
      0x0115 : "SamplesPerPixel",
      0x011C : "PlanarConfiguration",
      0x0212 : "YCbCrSubSampling",
      0x0213 : "YCbCrPositioning",
      0x011A : "XResolution",
      0x011B : "YResolution",
      0x0128 : "ResolutionUnit",
      0x0111 : "StripOffsets",
      0x0116 : "RowsPerStrip",
      0x0117 : "StripByteCounts",
      0x0201 : "JPEGInterchangeFormat",
      0x0202 : "JPEGInterchangeFormatLength",
      0x012D : "TransferFunction",
      0x013E : "WhitePoint",
      0x013F : "PrimaryChromaticities",
      0x0211 : "YCbCrCoefficients",
      0x0214 : "ReferenceBlackWhite",
      0x0132 : "DateTime",
      0x010E : "ImageDescription",
      0x010F : "Make",
      0x0110 : "Model",
      0x0131 : "Software",
      0x013B : "Artist",
      0x8298 : "Copyright"
  };

  var GPSTags = this.GPSTags = {
      0x0000 : "GPSVersionID",
      0x0001 : "GPSLatitudeRef",
      0x0002 : "GPSLatitude",
      0x0003 : "GPSLongitudeRef",
      0x0004 : "GPSLongitude",
      0x0005 : "GPSAltitudeRef",
      0x0006 : "GPSAltitude",
      0x0007 : "GPSTimeStamp",
      0x0008 : "GPSSatellites",
      0x0009 : "GPSStatus",
      0x000A : "GPSMeasureMode",
      0x000B : "GPSDOP",
      0x000C : "GPSSpeedRef",
      0x000D : "GPSSpeed",
      0x000E : "GPSTrackRef",
      0x000F : "GPSTrack",
      0x0010 : "GPSImgDirectionRef",
      0x0011 : "GPSImgDirection",
      0x0012 : "GPSMapDatum",
      0x0013 : "GPSDestLatitudeRef",
      0x0014 : "GPSDestLatitude",
      0x0015 : "GPSDestLongitudeRef",
      0x0016 : "GPSDestLongitude",
      0x0017 : "GPSDestBearingRef",
      0x0018 : "GPSDestBearing",
      0x0019 : "GPSDestDistanceRef",
      0x001A : "GPSDestDistance",
      0x001B : "GPSProcessingMethod",
      0x001C : "GPSAreaInformation",
      0x001D : "GPSDateStamp",
      0x001E : "GPSDifferential"
  };

  var StringValues = this.StringValues = {
      ExposureProgram : {
          0 : "Not defined",
          1 : "Manual",
          2 : "Normal program",
          3 : "Aperture priority",
          4 : "Shutter priority",
          5 : "Creative program",
          6 : "Action program",
          7 : "Portrait mode",
          8 : "Landscape mode"
      },
      MeteringMode : {
          0 : "Unknown",
          1 : "Average",
          2 : "CenterWeightedAverage",
          3 : "Spot",
          4 : "MultiSpot",
          5 : "Pattern",
          6 : "Partial",
          255 : "Other"
      },
      LightSource : {
          0 : "Unknown",
          1 : "Daylight",
          2 : "Fluorescent",
          3 : "Tungsten (incandescent light)",
          4 : "Flash",
          9 : "Fine weather",
          10 : "Cloudy weather",
          11 : "Shade",
          12 : "Daylight fluorescent (D 5700 - 7100K)",
          13 : "Day white fluorescent (N 4600 - 5400K)",
          14 : "Cool white fluorescent (W 3900 - 4500K)",
          15 : "White fluorescent (WW 3200 - 3700K)",
          17 : "Standard light A",
          18 : "Standard light B",
          19 : "Standard light C",
          20 : "D55",
          21 : "D65",
          22 : "D75",
          23 : "D50",
          24 : "ISO studio tungsten",
          255 : "Other"
      },
      Flash : {
          0x0000 : "Flash did not fire",
          0x0001 : "Flash fired",
          0x0005 : "Strobe return light not detected",
          0x0007 : "Strobe return light detected",
          0x0009 : "Flash fired, compulsory flash mode",
          0x000D : "Flash fired, compulsory flash mode, return light not detected",
          0x000F : "Flash fired, compulsory flash mode, return light detected",
          0x0010 : "Flash did not fire, compulsory flash mode",
          0x0018 : "Flash did not fire, auto mode",
          0x0019 : "Flash fired, auto mode",
          0x001D : "Flash fired, auto mode, return light not detected",
          0x001F : "Flash fired, auto mode, return light detected",
          0x0020 : "No flash function",
          0x0041 : "Flash fired, red-eye reduction mode",
          0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
          0x0047 : "Flash fired, red-eye reduction mode, return light detected",
          0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
          0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
          0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
          0x0059 : "Flash fired, auto mode, red-eye reduction mode",
          0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
          0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
      },
      SensingMethod : {
          1 : "Not defined",
          2 : "One-chip color area sensor",
          3 : "Two-chip color area sensor",
          4 : "Three-chip color area sensor",
          5 : "Color sequential area sensor",
          7 : "Trilinear sensor",
          8 : "Color sequential linear sensor"
      },
      SceneCaptureType : {
          0 : "Standard",
          1 : "Landscape",
          2 : "Portrait",
          3 : "Night scene"
      },
      SceneType : {
          1 : "Directly photographed"
      },
      CustomRendered : {
          0 : "Normal process",
          1 : "Custom process"
      },
      WhiteBalance : {
          0 : "Auto white balance",
          1 : "Manual white balance"
      },
      GainControl : {
          0 : "None",
          1 : "Low gain up",
          2 : "High gain up",
          3 : "Low gain down",
          4 : "High gain down"
      },
      Contrast : {
          0 : "Normal",
          1 : "Soft",
          2 : "Hard"
      },
      Saturation : {
          0 : "Normal",
          1 : "Low saturation",
          2 : "High saturation"
      },
      Sharpness : {
          0 : "Normal",
          1 : "Soft",
          2 : "Hard"
      },
      SubjectDistanceRange : {
          0 : "Unknown",
          1 : "Macro",
          2 : "Close view",
          3 : "Distant view"
      },
      FileSource : {
          3 : "DSC"
      },

      Components : {
          0 : "",
          1 : "Y",
          2 : "Cb",
          3 : "Cr",
          4 : "R",
          5 : "G",
          6 : "B"
      }
  };

  function addEvent(element, event, handler) {
      if (element.addEventListener) {
          element.addEventListener(event, handler, false);
      } else if (element.attachEvent) {
          element.attachEvent("on" + event, handler);
      }
  }

  function imageHasData(img) {
      return !!(img.exifdata);
  }

  function base64ToArrayBuffer(base64, contentType) {
      contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
      base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
      var binary = atob(base64);
      var len = binary.length;
      var buffer = new ArrayBuffer(len);
      var view = new Uint8Array(buffer);
      for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
      }
      return buffer;
  }

  function objectURLToBlob(url, callback) {
      var http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.responseType = "blob";
      http.onload = function(e) {
          if (this.status == 200 || this.status === 0) {
              callback(this.response);
          }
      };
      http.send();
  }

  function getImageData(img, callback) {
      function handleBinaryFile(binFile) {
          var data = findEXIFinJPEG(binFile);
          var iptcdata = findIPTCinJPEG(binFile);
          img.exifdata = data || {};
          img.iptcdata = iptcdata || {};
          if (callback) {
              callback.call(img);
          }
      }

      if (img.src) {
          if (/^data\:/i.test(img.src)) { // Data URI
              var arrayBuffer = base64ToArrayBuffer(img.src);
              handleBinaryFile(arrayBuffer);

          } else if (/^blob\:/i.test(img.src)) { // Object URL
              var fileReader = new FileReader();
              fileReader.onload = function(e) {
                  handleBinaryFile(e.target.result);
              };
              objectURLToBlob(img.src, function (blob) {
                  fileReader.readAsArrayBuffer(blob);
              });
          } else {
              var http = new XMLHttpRequest();
              http.onload = function() {
                  if (this.status == 200 || this.status === 0) {
                      handleBinaryFile(http.response);
                  } else {
                      throw "Could not load image";
                  }
                  http = null;
              };
              http.open("GET", img.src, true);
              http.responseType = "arraybuffer";
              http.send(null);
          }
      } else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
          var fileReader = new FileReader();
          fileReader.onload = function(e) {
              if (debug) console.log("Got file of length " + e.target.result.byteLength);
              handleBinaryFile(e.target.result);
          };

          fileReader.readAsArrayBuffer(img);
      }
  }

  function findEXIFinJPEG(file) {
      var dataView = new DataView(file);

      if (debug) console.log("Got file of length " + file.byteLength);
      if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
          if (debug) console.log("Not a valid JPEG");
          return false; // not a valid jpeg
      }

      var offset = 2,
          length = file.byteLength,
          marker;

      while (offset < length) {
          if (dataView.getUint8(offset) != 0xFF) {
              if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
              return false; // not a valid marker, something is wrong
          }

          marker = dataView.getUint8(offset + 1);
          if (debug) console.log(marker);

          // we could implement handling for other markers here,
          // but we're only looking for 0xFFE1 for EXIF data

          if (marker == 225) {
              if (debug) console.log("Found 0xFFE1 marker");

              return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

              // offset += 2 + file.getShortAt(offset+2, true);

          } else {
              offset += 2 + dataView.getUint16(offset+2);
          }

      }

  }

  function findIPTCinJPEG(file) {
      var dataView = new DataView(file);

      if (debug) console.log("Got file of length " + file.byteLength);
      if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
          if (debug) console.log("Not a valid JPEG");
          return false; // not a valid jpeg
      }

      var offset = 2,
          length = file.byteLength;

      var isFieldSegmentStart = function(dataView, offset){
          return (
              dataView.getUint8(offset) === 0x38 &&
              dataView.getUint8(offset+1) === 0x42 &&
              dataView.getUint8(offset+2) === 0x49 &&
              dataView.getUint8(offset+3) === 0x4D &&
              dataView.getUint8(offset+4) === 0x04 &&
              dataView.getUint8(offset+5) === 0x04
          );
      };

      while (offset < length) {

          if ( isFieldSegmentStart(dataView, offset )){

              // Get the length of the name header (which is padded to an even number of bytes)
              var nameHeaderLength = dataView.getUint8(offset+7);
              if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
              // Check for pre photoshop 6 format
              if(nameHeaderLength === 0) {
                  // Always 4
                  nameHeaderLength = 4;
              }

              var startOffset = offset + 8 + nameHeaderLength;
              var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

              return readIPTCData(file, startOffset, sectionLength);

              break;

          }

          // Not the marker, continue searching
          offset++;

      }

  }
  var IptcFieldMap = {
      0x78 : 'caption',
      0x6E : 'credit',
      0x19 : 'keywords',
      0x37 : 'dateCreated',
      0x50 : 'byline',
      0x55 : 'bylineTitle',
      0x7A : 'captionWriter',
      0x69 : 'headline',
      0x74 : 'copyright',
      0x0F : 'category'
  };
  function readIPTCData(file, startOffset, sectionLength){
      var dataView = new DataView(file);
      var data = {};
      var fieldValue, fieldName, dataSize, segmentType, segmentSize;
      var segmentStartPos = startOffset;
      while(segmentStartPos < startOffset+sectionLength) {
          if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
              segmentType = dataView.getUint8(segmentStartPos+2);
              if(segmentType in IptcFieldMap) {
                  dataSize = dataView.getInt16(segmentStartPos+3);
                  segmentSize = dataSize + 5;
                  fieldName = IptcFieldMap[segmentType];
                  fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                  // Check if we already stored a value with this name
                  if(data.hasOwnProperty(fieldName)) {
                      // Value already stored with this name, create multivalue field
                      if(data[fieldName] instanceof Array) {
                          data[fieldName].push(fieldValue);
                      }
                      else {
                          data[fieldName] = [data[fieldName], fieldValue];
                      }
                  }
                  else {
                      data[fieldName] = fieldValue;
                  }
              }

          }
          segmentStartPos++;
      }
      return data;
  }

  function readTags(file, tiffStart, dirStart, strings, bigEnd) {
      var entries = file.getUint16(dirStart, !bigEnd),
          tags = {},
          entryOffset, tag,
          i;

      for (i=0;i<entries;i++) {
          entryOffset = dirStart + i*12 + 2;
          tag = strings[file.getUint16(entryOffset, !bigEnd)];
          if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
          tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
      }
      return tags;
  }

  function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
      var type = file.getUint16(entryOffset+2, !bigEnd),
          numValues = file.getUint32(entryOffset+4, !bigEnd),
          valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
          offset,
          vals, val, n,
          numerator, denominator;

      switch (type) {
          case 1: // byte, 8-bit unsigned int
          case 7: // undefined, 8-bit byte, value depending on field
              if (numValues == 1) {
                  return file.getUint8(entryOffset + 8, !bigEnd);
              } else {
                  offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                  vals = [];
                  for (n=0;n<numValues;n++) {
                      vals[n] = file.getUint8(offset + n);
                  }
                  return vals;
              }

          case 2: // ascii, 8-bit byte
              offset = numValues > 4 ? valueOffset : (entryOffset + 8);
              return getStringFromDB(file, offset, numValues-1);

          case 3: // short, 16 bit int
              if (numValues == 1) {
                  return file.getUint16(entryOffset + 8, !bigEnd);
              } else {
                  offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                  vals = [];
                  for (n=0;n<numValues;n++) {
                      vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                  }
                  return vals;
              }

          case 4: // long, 32 bit int
              if (numValues == 1) {
                  return file.getUint32(entryOffset + 8, !bigEnd);
              } else {
                  vals = [];
                  for (n=0;n<numValues;n++) {
                      vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                  }
                  return vals;
              }

          case 5:    // rational = two long values, first is numerator, second is denominator
              if (numValues == 1) {
                  numerator = file.getUint32(valueOffset, !bigEnd);
                  denominator = file.getUint32(valueOffset+4, !bigEnd);
                  val = new Number(numerator / denominator);
                  val.numerator = numerator;
                  val.denominator = denominator;
                  return val;
              } else {
                  vals = [];
                  for (n=0;n<numValues;n++) {
                      numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                      denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                      vals[n] = new Number(numerator / denominator);
                      vals[n].numerator = numerator;
                      vals[n].denominator = denominator;
                  }
                  return vals;
              }

          case 9: // slong, 32 bit signed int
              if (numValues == 1) {
                  return file.getInt32(entryOffset + 8, !bigEnd);
              } else {
                  vals = [];
                  for (n=0;n<numValues;n++) {
                      vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                  }
                  return vals;
              }

          case 10: // signed rational, two slongs, first is numerator, second is denominator
              if (numValues == 1) {
                  return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
              } else {
                  vals = [];
                  for (n=0;n<numValues;n++) {
                      vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                  }
                  return vals;
              }
      }
  }

  function getStringFromDB(buffer, start, length) {
      var outstr = "";
      for (var n = start; n < start+length; n++) {
          outstr += String.fromCharCode(buffer.getUint8(n));
      }
      return outstr;
  }

  function readEXIFData(file, start) {
      if (getStringFromDB(file, start, 4) != "Exif") {
          if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
          return false;
      }

      var bigEnd,
          tags, tag,
          exifData, gpsData,
          tiffOffset = start + 6;

      // test for TIFF validity and endianness
      if (file.getUint16(tiffOffset) == 0x4949) {
          bigEnd = false;
      } else if (file.getUint16(tiffOffset) == 0x4D4D) {
          bigEnd = true;
      } else {
          if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
          return false;
      }

      if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
          if (debug) console.log("Not valid TIFF data! (no 0x002A)");
          return false;
      }

      var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

      if (firstIFDOffset < 0x00000008) {
          if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
          return false;
      }

      tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

      if (tags.ExifIFDPointer) {
          exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
          for (tag in exifData) {
              switch (tag) {
                  case "LightSource" :
                  case "Flash" :
                  case "MeteringMode" :
                  case "ExposureProgram" :
                  case "SensingMethod" :
                  case "SceneCaptureType" :
                  case "SceneType" :
                  case "CustomRendered" :
                  case "WhiteBalance" :
                  case "GainControl" :
                  case "Contrast" :
                  case "Saturation" :
                  case "Sharpness" :
                  case "SubjectDistanceRange" :
                  case "FileSource" :
                      exifData[tag] = StringValues[tag][exifData[tag]];
                      break;

                  case "ExifVersion" :
                  case "FlashpixVersion" :
                      exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                      break;

                  case "ComponentsConfiguration" :
                      exifData[tag] =
                          StringValues.Components[exifData[tag][0]] +
                          StringValues.Components[exifData[tag][1]] +
                          StringValues.Components[exifData[tag][2]] +
                          StringValues.Components[exifData[tag][3]];
                      break;
              }
              tags[tag] = exifData[tag];
          }
      }

      if (tags.GPSInfoIFDPointer) {
          gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
          for (tag in gpsData) {
              switch (tag) {
                  case "GPSVersionID" :
                      gpsData[tag] = gpsData[tag][0] +
                          "." + gpsData[tag][1] +
                          "." + gpsData[tag][2] +
                          "." + gpsData[tag][3];
                      break;
              }
              tags[tag] = gpsData[tag];
          }
      }

      return tags;
  }

  this.getData = function(img, callback) {
      if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;

      if (!imageHasData(img)) {
          getImageData(img, callback);
      } else {
          if (callback) {
              callback.call(img);
          }
      }
      return true;
  }

  this.getTag = function(img, tag) {
      if (!imageHasData(img)) return;
      return img.exifdata[tag];
  }

  this.getAllTags = function(img) {
      if (!imageHasData(img)) return {};
      var a,
          data = img.exifdata,
          tags = {};
      for (a in data) {
          if (data.hasOwnProperty(a)) {
              tags[a] = data[a];
          }
      }
      return tags;
  }

  this.pretty = function(img) {
      if (!imageHasData(img)) return "";
      var a,
          data = img.exifdata,
          strPretty = "";
      for (a in data) {
          if (data.hasOwnProperty(a)) {
              if (typeof data[a] == "object") {
                  if (data[a] instanceof Number) {
                      strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                  } else {
                      strPretty += a + " : [" + data[a].length + " values]\r\n";
                  }
              } else {
                  strPretty += a + " : " + data[a] + "\r\n";
              }
          }
      }
      return strPretty;
  }

  this.readFromBinaryFile = function(file) {
      return findEXIFinJPEG(file);
  }
}]);

crop.factory('cropHost', ['$document', 'cropAreaCircle', 'cropAreaSquare', 'cropEXIF', function($document, CropAreaCircle, CropAreaSquare, cropEXIF) {
  /* STATIC FUNCTIONS */

  // Get Element's Offset
  var getElementOffset=function(elem) {
      var box = elem.getBoundingClientRect();

      var body = document.body;
      var docElem = document.documentElement;

      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;

      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;

      return { top: Math.round(top), left: Math.round(left) };
  };

  return function(elCanvas, opts, events){
    /* PRIVATE VARIABLES */

    // Object Pointers
    var ctx=null,
        image=null,
        theArea=null;

    // Dimensions
    var minCanvasDims=[100,100],
        maxCanvasDims=[300,300];

    // Result Image size
    var resImgSize=200;

    // Result Image type
    var resImgFormat='image/png';

    // Result Image quality
    var resImgQuality=null;

    /* PRIVATE FUNCTIONS */

    // Draw Scene
    function drawScene() {
      // clear canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if(image!==null) {
        // draw source image
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.save();

        // and make it darker
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.restore();

        // draw Area
        theArea.draw();
      }
    }

    // Resets CropHost
    var resetCropHost=function() {
      if(image!==null) {
        theArea.setImage(image);
        var imageDims=[image.width, image.height],
            imageRatio=image.width/image.height,
            canvasDims=imageDims;

        if(canvasDims[0]>maxCanvasDims[0]) {
          canvasDims[0]=maxCanvasDims[0];
          canvasDims[1]=canvasDims[0]/imageRatio;
        } else if(canvasDims[0]<minCanvasDims[0]) {
          canvasDims[0]=minCanvasDims[0];
          canvasDims[1]=canvasDims[0]/imageRatio;
        }
        if(canvasDims[1]>maxCanvasDims[1]) {
          canvasDims[1]=maxCanvasDims[1];
          canvasDims[0]=canvasDims[1]*imageRatio;
        } else if(canvasDims[1]<minCanvasDims[1]) {
          canvasDims[1]=minCanvasDims[1];
          canvasDims[0]=canvasDims[1]*imageRatio;
        }
        elCanvas.prop('width',canvasDims[0]).prop('height',canvasDims[1]).css({'margin-left': -canvasDims[0]/2+'px', 'margin-top': -canvasDims[1]/2+'px'});

        theArea.setX(ctx.canvas.width/2);
        theArea.setY(ctx.canvas.height/2);
        theArea.setSize(Math.min(200, ctx.canvas.width/2, ctx.canvas.height/2));
      } else {
        elCanvas.prop('width',0).prop('height',0).css({'margin-top': 0});
      }

      drawScene();
    };

    /**
     * Returns event.changedTouches directly if event is a TouchEvent.
     * If event is a jQuery event, return changedTouches of event.originalEvent
     */
    var getChangedTouches=function(event){
      if(angular.isDefined(event.changedTouches)){
        return event.changedTouches;
      }else{
        return event.originalEvent.changedTouches;
      }
    };

    var onMouseMove=function(e) {
      if(image!==null) {
        var offset=getElementOffset(ctx.canvas),
            pageX, pageY;
        if(e.type === 'touchmove') {
          pageX=getChangedTouches(e)[0].pageX;
          pageY=getChangedTouches(e)[0].pageY;
        } else {
          pageX=e.pageX;
          pageY=e.pageY;
        }
        theArea.processMouseMove(pageX-offset.left, pageY-offset.top);
        drawScene();
      }
    };

    var onMouseDown=function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(image!==null) {
        var offset=getElementOffset(ctx.canvas),
            pageX, pageY;
        if(e.type === 'touchstart') {
          pageX=getChangedTouches(e)[0].pageX;
          pageY=getChangedTouches(e)[0].pageY;
        } else {
          pageX=e.pageX;
          pageY=e.pageY;
        }
        theArea.processMouseDown(pageX-offset.left, pageY-offset.top);
        drawScene();
      }
    };

    var onMouseUp=function(e) {
      if(image!==null) {
        var offset=getElementOffset(ctx.canvas),
            pageX, pageY;
        if(e.type === 'touchend') {
          pageX=getChangedTouches(e)[0].pageX;
          pageY=getChangedTouches(e)[0].pageY;
        } else {
          pageX=e.pageX;
          pageY=e.pageY;
        }
        theArea.processMouseUp(pageX-offset.left, pageY-offset.top);
        drawScene();
      }
    };

    this.getResultImageDataURI=function() {
      var temp_ctx, temp_canvas;
      temp_canvas = angular.element('<canvas></canvas>')[0];
      temp_ctx = temp_canvas.getContext('2d');
      temp_canvas.width = resImgSize;
      temp_canvas.height = resImgSize;
      if(image!==null){
        temp_ctx.drawImage(image, (theArea.getX()-theArea.getSize()/2)*(image.width/ctx.canvas.width), (theArea.getY()-theArea.getSize()/2)*(image.height/ctx.canvas.height), theArea.getSize()*(image.width/ctx.canvas.width), theArea.getSize()*(image.height/ctx.canvas.height), 0, 0, resImgSize, resImgSize);
      }
      if (resImgQuality!==null ){
        return temp_canvas.toDataURL(resImgFormat, resImgQuality);
      }
      return temp_canvas.toDataURL(resImgFormat);
    };

    this.setNewImageSource=function(imageSource) {
      image=null;
      resetCropHost();
      events.trigger('image-updated');
      if(!!imageSource) {
        var newImage = new Image();
        if(imageSource.substring(0,4).toLowerCase()==='http') {
          newImage.crossOrigin = 'anonymous';
        }
        newImage.onload = function(){
          events.trigger('load-done');

          cropEXIF.getData(newImage,function(){
            var orientation=cropEXIF.getTag(newImage,'Orientation');

            if([3,6,8].indexOf(orientation)>-1) {
              var canvas = document.createElement("canvas"),
                  ctx=canvas.getContext("2d"),
                  cw = newImage.width, ch = newImage.height, cx = 0, cy = 0, deg=0;
              switch(orientation) {
                case 3:
                  cx=-newImage.width;
                  cy=-newImage.height;
                  deg=180;
                  break;
                case 6:
                  cw = newImage.height;
                  ch = newImage.width;
                  cy=-newImage.height;
                  deg=90;
                  break;
                case 8:
                  cw = newImage.height;
                  ch = newImage.width;
                  cx=-newImage.width;
                  deg=270;
                  break;
              }

              canvas.width = cw;
              canvas.height = ch;
              ctx.rotate(deg*Math.PI/180);
              ctx.drawImage(newImage, cx, cy);

              image=new Image();
              image.src = canvas.toDataURL("image/png");
            } else {
              image=newImage;
            }
            resetCropHost();
            events.trigger('image-updated');
          });
        };
        newImage.onerror=function() {
          events.trigger('load-error');
        };
        events.trigger('load-start');
        newImage.src=imageSource;
      }
    };

    this.setMaxDimensions=function(width, height) {
      maxCanvasDims=[width,height];

      if(image!==null) {
        var curWidth=ctx.canvas.width,
            curHeight=ctx.canvas.height;

        var imageDims=[image.width, image.height],
            imageRatio=image.width/image.height,
            canvasDims=imageDims;

        if(canvasDims[0]>maxCanvasDims[0]) {
          canvasDims[0]=maxCanvasDims[0];
          canvasDims[1]=canvasDims[0]/imageRatio;
        } else if(canvasDims[0]<minCanvasDims[0]) {
          canvasDims[0]=minCanvasDims[0];
          canvasDims[1]=canvasDims[0]/imageRatio;
        }
        if(canvasDims[1]>maxCanvasDims[1]) {
          canvasDims[1]=maxCanvasDims[1];
          canvasDims[0]=canvasDims[1]*imageRatio;
        } else if(canvasDims[1]<minCanvasDims[1]) {
          canvasDims[1]=minCanvasDims[1];
          canvasDims[0]=canvasDims[1]*imageRatio;
        }
        elCanvas.prop('width',canvasDims[0]).prop('height',canvasDims[1]).css({'margin-left': -canvasDims[0]/2+'px', 'margin-top': -canvasDims[1]/2+'px'});

        var ratioNewCurWidth=ctx.canvas.width/curWidth,
            ratioNewCurHeight=ctx.canvas.height/curHeight,
            ratioMin=Math.min(ratioNewCurWidth, ratioNewCurHeight);

        theArea.setX(theArea.getX()*ratioNewCurWidth);
        theArea.setY(theArea.getY()*ratioNewCurHeight);
        theArea.setSize(theArea.getSize()*ratioMin);
      } else {
        elCanvas.prop('width',0).prop('height',0).css({'margin-top': 0});
      }

      drawScene();

    };

    this.setAreaMinSize=function(size) {
      size=parseInt(size,10);
      if(!isNaN(size)) {
        theArea.setMinSize(size);
        drawScene();
      }
    };

    this.setResultImageSize=function(size) {
      size=parseInt(size,10);
      if(!isNaN(size)) {
        resImgSize=size;
      }
    };

    this.setResultImageFormat=function(format) {
      resImgFormat = format;
    };

    this.setResultImageQuality=function(quality){
      quality = parseFloat(quality);
      if (!isNaN(quality) && quality>=0 && quality<=1){
        resImgQuality = quality;
      }
    };

    this.setAreaType=function(type) {
      var curSize=theArea.getSize(),
          curMinSize=theArea.getMinSize(),
          curX=theArea.getX(),
          curY=theArea.getY();

      var AreaClass=CropAreaCircle;
      if(type==='square') {
        AreaClass=CropAreaSquare;
      }
      theArea = new AreaClass(ctx, events);
      theArea.setMinSize(curMinSize);
      theArea.setSize(curSize);
      theArea.setX(curX);
      theArea.setY(curY);

      // resetCropHost();
      if(image!==null) {
        theArea.setImage(image);
      }

      drawScene();
    };

    /* Life Cycle begins */

    // Init Context var
    ctx = elCanvas[0].getContext('2d');

    // Init CropArea
    theArea = new CropAreaCircle(ctx, events);

    // Init Mouse Event Listeners
    $document.on('mousemove',onMouseMove);
    elCanvas.on('mousedown',onMouseDown);
    $document.on('mouseup',onMouseUp);

    // Init Touch Event Listeners
    $document.on('touchmove',onMouseMove);
    elCanvas.on('touchstart',onMouseDown);
    $document.on('touchend',onMouseUp);

    // CropHost Destructor
    this.destroy=function() {
      $document.off('mousemove',onMouseMove);
      elCanvas.off('mousedown',onMouseDown);
      $document.off('mouseup',onMouseMove);

      $document.off('touchmove',onMouseMove);
      elCanvas.off('touchstart',onMouseDown);
      $document.off('touchend',onMouseMove);

      elCanvas.remove();
    };
  };

}]);


crop.factory('cropPubSub', [function() {
  return function() {
    var events = {};
    // Subscribe
    this.on = function(names, handler) {
      names.split(' ').forEach(function(name) {
        if (!events[name]) {
          events[name] = [];
        }
        events[name].push(handler);
      });
      return this;
    };
    // Publish
    this.trigger = function(name, args) {
      angular.forEach(events[name], function(handler) {
        handler.call(null, args);
      });
      return this;
    };
  };
}]);

crop.directive('imgCrop', ['$timeout', 'cropHost', 'cropPubSub', function($timeout, CropHost, CropPubSub) {
  return {
    restrict: 'E',
    scope: {
      image: '=',
      resultImage: '=',

      changeOnFly: '=',
      areaType: '@',
      areaMinSize: '=',
      resultImageSize: '=',
      resultImageFormat: '@',
      resultImageQuality: '=',

      onChange: '&',
      onLoadBegin: '&',
      onLoadDone: '&',
      onLoadError: '&'
    },
    template: '<canvas></canvas>',
    controller: ['$scope', function($scope) {
      $scope.events = new CropPubSub();
    }],
    link: function(scope, element/*, attrs*/) {
      // Init Events Manager
      var events = scope.events;

      // Init Crop Host
      var cropHost=new CropHost(element.find('canvas'), {}, events);

      // Store Result Image to check if it's changed
      var storedResultImage;

      var updateResultImage=function(scope) {
        var resultImage=cropHost.getResultImageDataURI();
        if(storedResultImage!==resultImage) {
          storedResultImage=resultImage;
          if(angular.isDefined(scope.resultImage)) {
            scope.resultImage=resultImage;
          }
          scope.onChange({$dataURI: scope.resultImage});
        }
      };

      // Wrapper to safely exec functions within $apply on a running $digest cycle
      var fnSafeApply=function(fn) {
        return function(){
          $timeout(function(){
            scope.$apply(function(scope){
              fn(scope);
            });
          });
        };
      };

      // Setup CropHost Event Handlers
      events
        .on('load-start', fnSafeApply(function(scope){
          scope.onLoadBegin({});
        }))
        .on('load-done', fnSafeApply(function(scope){
          scope.onLoadDone({});
        }))
        .on('load-error', fnSafeApply(function(scope){
          scope.onLoadError({});
        }))
        .on('area-move area-resize', fnSafeApply(function(scope){
          if(!!scope.changeOnFly) {
            updateResultImage(scope);
          }
        }))
        .on('area-move-end area-resize-end image-updated', fnSafeApply(function(scope){
          updateResultImage(scope);
        }));

      // Sync CropHost with Directive's options
      scope.$watch('image',function(){
        cropHost.setNewImageSource(scope.image);
      });
      scope.$watch('areaType',function(){
        cropHost.setAreaType(scope.areaType);
        updateResultImage(scope);
      });
      scope.$watch('areaMinSize',function(){
        cropHost.setAreaMinSize(scope.areaMinSize);
        updateResultImage(scope);
      });
      scope.$watch('resultImageSize',function(){
        cropHost.setResultImageSize(scope.resultImageSize);
        updateResultImage(scope);
      });
      scope.$watch('resultImageFormat',function(){
        cropHost.setResultImageFormat(scope.resultImageFormat);
        updateResultImage(scope);
      });
      scope.$watch('resultImageQuality',function(){
        cropHost.setResultImageQuality(scope.resultImageQuality);
        updateResultImage(scope);
      });

      // Update CropHost dimensions when the directive element is resized
      scope.$watch(
        function () {
          return [element[0].clientWidth, element[0].clientHeight];
        },
        function (value) {
          cropHost.setMaxDimensions(value[0],value[1]);
          updateResultImage(scope);
        },
        true
      );

      // Destroy CropHost Instance when the directive is destroying
      scope.$on('$destroy', function(){
          cropHost.destroy();
      });
    }
  };
}]);
}());
app.factory('middleware', function() {
    return {
        request: function(config) {
            if (config.api) {
                config.url = "/api/" + config.url;
            }
            
            return config;
        }
    };
});
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

app.factory('Utils', function(){
	var utils = {
		getFileExtension : function(filename){
			return filename.split('.').pop();
		},

		trimFileExtension : function(filename){
			return filename.replace(/\.[^/.]+$/, "");
		},

		getBase64Image : function(img) {
		    // Create an empty canvas element
		    var canvas = document.createElement("canvas");
		    canvas.width = img.width;
		    canvas.height = img.height;

		    // Copy the image contents to the canvas
		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(img, 0, 0);

		    // Get the data-URL formatted image
		    // Firefox supports PNG and JPEG. You could check img.src to
		    // guess the original format, but be aware the using "image/jpg"
		    // will re-encode the image.
		    var dataURL = canvas.toDataURL("image/png");

		    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		},
		readURL : function(input, id) {
		    if (input.files && input.files[0]) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		        	$(id).attr('src', e.target.result);
		        	$(id).css({'display':'block'});
		        }

		        reader.readAsDataURL(input.files[0]);
		    } else {
		    	$(id).attr('src', '');
		        $(id).css({'display':'none'});
		    }
		}
	};

	return utils;
});