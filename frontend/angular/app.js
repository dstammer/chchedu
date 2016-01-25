var app = angular.module("chchedu", ["ngRoute", "ui.router", "ngCookies", "ngImgCrop"]);

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
    }).state("ambassador", {
       url: "/ambassador/:ambassador_id",
       views: {
          "main-content" : { 
            templateUrl: "partials/ambassador/ambassador.html",
            controller: "ambassadorCtrl"
          }
       },
       requireLogin : true
    }).state("createAmbassador", {
       url: "/createAmbassador",
       views: {
          "main-content" : { 
            templateUrl: "partials/ambassador/create.html",
            controller: "createAmbassadorCtrl"
          }
       },
       requireLogin : true
    }).state("listAmbassador", {
       url: "/listAmbassador",
       views: {
          "main-content" : { 
            templateUrl: "partials/ambassador/list.html",
            controller: "listAmbassadorCtrl"
          }
       },
       requireLogin : true
    }).state("user", {
       url: "/user/:user_id",
       views: {
          "main-content" : { 
            templateUrl: "partials/user/user.html",
            controller: "userCtrl"
          }
       },
       requireLogin : true
    }).state("createUser", {
       url: "/createUser",
       views: {
          "main-content" : { 
            templateUrl: "partials/user/create.html",
            controller: "createUserCtrl"
          }
       },
       requireLogin : true
    }).state("listUser", {
       url: "/listUser",
       views: {
          "main-content" : { 
            templateUrl: "partials/user/list.html",
            controller: "listUserCtrl"
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
		//endPoint : "http://172.16.1.52:9010/api/"
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

		createAmbassador : "ambassador/create",
		updateAmbassador : "ambassador/update",
		getAmbassador : "ambassador/get",
		deleteAmbassador : "ambassador/delete",

		createUser : "user/create",
		updateUser : "user/update",
		getUser : "user/get",
		deleteUser : "user/delete",

		getStats : "stats/get",
		deleteUser : "user/delete",
	}
}

var Nationality = ["Afghan",
				"Albanian",
				"Algerian",
				"Andorran",
				"Angolan",
				"Argentinian",
				"Armenian",
				"Australian",
				"Austrian",
				"Azerbaijani",
				"Bahamian",
				"Bangladeshi",
				"Barbadian",
				"Belorussian",
				"Belgian",
				"Beninese",
				"Bhutanese",
				"Bolivian",
				"Bosnian",
				"Brazilian",
				"Briton",
				"Bruneian",
				"Bulgarian",
				"Burmese",
				"Burundian",
				"Cambodian",
				"Cameroonian",
				"Canadian",
				"Chadian",
				"Chilean",
				"Chinese",
				"Colombian",
				"Congolese",
				"Croatian",
				"Cuban",
				"Cypriot",
				"Czech",
				"Dane",
				"Dominican",
				"Ecuadorean",
				"Egyptian",
				"Salvadorean",
				"Englishman",
				"Eritrean",
				"Estonian",
				"Ethiopian",
				"Fijian",
				"Finn",
				"Frenchman",
				"Gabonese",
				"Gambian",
				"Georgian",
				"German",
				"Ghanaian",
				"Greek",
				"Grenadian",
				"Guatemalan",
				"Guinean",
				"Guyanese",
				"Haitian",
				"Dutchman",
				"Honduran",
				"Hungarian",
				"Icelander",
				"Indian",
				"Indonesian",
				"Iranian",
				"Iraqi",
				"Irishman",
				"Israeli",
				"Italian",
				"Jamaican",
				"Japanese",
				"Jordanian",
				"Kazakh",
				"Kenyan",
				"Korean",
				"Kuwaiti",
				"Laotian",
				"Latvian",
				"Lebanese",
				"Liberian",
				"Libyan",
				"Liechtensteiner",
				"Lithuanian",
				"Luxembourger",
				"Macedonian",
				"Madagascan",
				"Malawian",
				"Malaysian",
				"Maldivian",
				"Malian",
				"Maltese",
				"Mauritanian",
				"Mauritian",
				"Mexican",
				"Moldovan",
				"Monacan",
				"Mongolian",
				"Montenegrin",
				"Moroccan",
				"Mozambican",
				"Namibian",
				"Nepalese",
				"New Zealander",
				"Nicaraguan",
				"Nigerien",
				"Nigerian",
				"Norwegian",
				"Pakistani",
				"Panamanian",
				"Paraguayan",
				"Peruvian",
				"Filipino",
				"Pole",
				"Portuguese",
				"Qatari",
				"Romanian",
				"Russian",
				"Rwandan",
				"Saudi",
				"Scot",
				"Senegalese",
				"Serbian",
				"Singaporean",
				"Slovak",
				"Slovenian",
				"Somali",
				"Spaniard",
				"Sri Lankan",
				"Sudanese",
				"Surinamese",
				"Swazi",
				"Swede",
				"Swiss",
				"Syrian",
				"Taiwanese",
				"Tadzhik",
				"Tanzanian",
				"Thai",
				"Togolese",
				"Trinidadian",
				"Tunisian",
				"Turk",
				"Ugandan",
				"Ukrainian",
				"British",
				"American",
				"Uruguayan",
				"Uzbek",
				"Venezuelan",
				"Vietnamese",
				"Welshman",
				"Yemeni",
				"Yugoslav",
				"Zambian",
				"Zimbabwean"];
app.controller("ambassadorCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getAmbassadorList();
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
					url : Config.api.endPoint + Config.slug.updateAmbassador,
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
		doDelete : function(c){
			if(confirm("Do you want to delete this ambassador?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteAmbassador,
					data : {
						id : $scope.ambassador._id
					}
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
			}
		},
		getAmbassadorList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getAmbassador,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.ambassador.length; i++){
						if($state.params.ambassador_id == data.ambassador[i]._id){
							$scope.ambassador = data.ambassador[i];
							$scope.ambassador.id = $scope.ambassador._id;
						}
					}

					var html = '';
					for(var i = 0; i < Nationality.length; i++){
						if(Nationality[i] == $scope.ambassador.nationality){
							html = html + '"<option value="' + Nationality[i] + '" selected>' + Nationality[i] + "</option>";
						} else {
							html = html + '"<option value="' + Nationality[i] + '">' + Nationality[i] + "</option>";
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
			$('#categorySelector').val($scope.ambassador.nationality);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();

			if($scope.ambassador.photo != ""){
				$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.ambassador.photo);
				$('#previewPhoto').css({'display':'block'});
			} else {
				$('#previewPhoto').css({'display':'none'});
			}
			$rootScope.$broadcast("loaded");
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
app.controller("createAmbassadorCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
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
			$rootScope.$broadcast("loaded");
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
app.controller("listAmbassadorCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getAmbassadorList();
	}

	$scope.action = {
		getAmbassadorList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getAmbassador,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.ambassador;
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getAmbassadorStats : function(a){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#ambassador_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#ambassador_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].ambassador == a._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#ambassador_range').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("businessCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
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

			if($scope.business.photo != ""){
				$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.business.photo);
				$('#previewPhoto').css({'display':'block'});
			} else {
				$('#previewPhoto').css({'display':'none'});
			}

			$scope.map.initMap();		

			$rootScope.$broadcast("loaded");
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
app.controller("categoryBusinessCtrl", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {	
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
					$rootScope.$broadcast("loaded");
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
app.controller("createBusinessCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
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
			$rootScope.$broadcast("loaded");
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
app.controller("listBusinessCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
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
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusinessStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#business_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#business_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].business == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		goToBusiness : function(business_id){
			$state.go('business', {business_id : business_id});
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#business_range').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("categoryDealCtrl", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {	
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
					$rootScope.$broadcast("loaded");
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
app.controller("createDealCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
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
			$rootScope.$broadcast("loaded");
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
app.controller("dealCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
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
			$rootScope.$broadcast("loaded");
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
app.controller("listDealCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
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
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToDeal : function(business_id){
			$state.go('business', {business_id : business_id});
		},
		isExpired : function(d){
			var date = new Date(Date.parse(d.expiry_date));
			if(date.getTime() < new Date().getTime()){
				return true;
			}

			return false;
		},
		getWishlist : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2, filter;
			if(exp){
				filter = $('#deal_range_1').val();
			} else {
				filter = $('#deal_range_2').val();
			}

			if(filter == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var splt = filter.split(' - ');

				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].deals && $scope.user[i].deals.wishlist && $scope.user[i].deals.wishlist.length){
					var wishlist = $scope.user[i].deals.wishlist;
					for(var j = 0; j < wishlist.length; j++){
						if(wishlist[j] == d._id){
							if($scope.user[i].deal_timestamp && $scope.user[i].deal_timestamp.wishlist){
								if($scope.user[i].deal_timestamp.wishlist[d._id] > d1 && $scope.user[i].deal_timestamp.wishlist[d._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		getRedeemed : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2, filter;
			if(exp){
				filter = $('#deal_range_1').val();
			} else {
				filter = $('#deal_range_2').val();
			}

			if(filter == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].deals && $scope.user[i].deals.redeemed && $scope.user[i].deals.redeemed.length){
					var redeemed = $scope.user[i].deals.redeemed;
					for(var j = 0; j < redeemed.length; j++){
						if(redeemed[j] == d._id){
							if($scope.user[i].deal_timestamp && $scope.user[i].deal_timestamp.redeemed){
								if($scope.user[i].deal_timestamp.redeemed[d._id] > d1 && $scope.user[i].deal_timestamp.redeemed[d._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		getDealStats : function(d, exp){
			if(!$scope.stats) return 0;

			var d1, d2, filter;
			if(exp){
				filter = $('#deal_range_1').val();
			} else {
				filter = $('#deal_range_2').val();
			}

			if(filter == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].deal == d._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#deal_range_1').change(function(){
		$scope.$apply();
	});

	$('#deal_range_2').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("categoryEventCtrl", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {	
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
					$rootScope.$broadcast("loaded");
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
app.controller("createEventCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
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

			$rootScope.$broadcast("loaded");
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
app.controller("eventCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
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

			var splt = $scope.event.start_date.split(' ');

			$('#start_date').val(splt[0]);
			$('#start_time').val(splt[1] + splt[2]);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();

			if($scope.event.photo != ""){
				$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.event.photo);
				$('#previewPhoto').css({'display':'block'});
			} else {
				$('#previewPhoto').css({'display':'none'});
			}

			$scope.map.initMap();	

			$rootScope.$broadcast("loaded");	
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
app.controller("listEventCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
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
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getMyEvent : function(e){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2;

			if($('#event_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#event_range').val(),
					splt = filter.split(' - ');
				d1 = new Date(splt[0]).getTime();
				d2 = new Date(splt[1]).getTime();
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].events && $scope.user[i].events.events && $scope.user[i].events.events.length){
					var events = $scope.user[i].events.events;
					for(var j = 0; j < events.length; j++){
						if(events[j]._id == e._id){
							if($scope.user[i].event_timestamp && $scope.user[i].event_timestamp){
								if($scope.user[i].event_timestamp[e._id] > d1 && $scope.user[i].event_timestamp[e._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		getEventStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2, filter = $('#event_range').val();

			if(filter == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].event == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		isExpired : function(d){
			var date = new Date(Date.parse(d.start_date));
			if(date.getTime() > new Date().getTime()){
				return true;
			}

			return false;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#event_range_1').change(function(){
		$scope.$apply();
	});

	$('#event_range_2').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("categoryGuideCtrl", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {	
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
					$rootScope.$broadcast("loaded");
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
app.controller("createGuideCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
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

			$rootScope.$broadcast("loaded");
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
app.controller("guideCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
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

			if($scope.guide.photo != ""){
				$('#previewPhoto').attr('src', 'data:image/png;base64,' + $scope.guide.photo);
				$('#previewPhoto').css({'display':'block'});
			} else {
				$('#previewPhoto').css({'display':'none'});
			}

			$('#inlineRadio1').prop('checked', $scope.guide.type == "NO");
			$('#inlineRadio2').prop('checked', $scope.guide.type == "YES");

			$rootScope.$broadcast("loaded");
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
app.controller("listGuideCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getCategoryList();
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
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getCategoryList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuideCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.category = data.cat;
					$scope.action.getGuideList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					var html = '';
					html = html + '<option value="All">All</option>';
					for(var i = 0; i < $scope.category.length; i++){
						html = html + '"<option value="' + $scope.category[i]._id + '">' + $scope.category[i].name + "</option>";
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
		filter : function(){
			if(!$scope.category || !$scope.list) return [];
			var filtered = [],
				category = $('#categorySelector').val(),
				type = $('#typeSelector').val();

			for(var i = 0; i < $scope.list.length; i++){
				var skip = false;
				if(type != "All"){
					if($scope.list[i].type == "YES" && type == "true"){
						skip = true;
					}
					if($scope.list[i].type == "NO" && type == "false"){
						skip = true;
					}
				}
				if(category != "All"){
					if($scope.list[i].category._id != category){
						skip = true;
					}
				}
				if(skip){
					continue;
				}
				filtered.push($scope.list[i]);
			}

			return filtered;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsPickers.init();

			$rootScope.$broadcast("loaded");
		},
		getGuideStats : function(g){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#guide_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#guide_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			console.log(d1);
			console.log(d2);

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].guide == g._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
	}

	$('#typeSelector').change(function(){
		$scope.$apply();
	});

	$('#categorySelector').change(function(){
		$scope.$apply();
	});

	$('#guide_range').change(function(){
		$scope.$apply();
	});

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
app.controller("loadCtrl", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {		
	$scope.refresh = function () {
		$scope.loaded = true;
    }

	$rootScope.$on("loaded", function(){
		$scope.loaded = false;
	});

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
        createUser : function(){
            location.href = "/createUser";
        },
    	listUser : function(){
    		location.href = "/listUser";
    	},
    	createAmbassador : function(){
    		location.href = "/createAmbassador";
    	},
    	listAmbassador : function(){
    		location.href = "/listAmbassador";
    	},
        logout : function(){
            localStorage.setItem("user", "");
            location.href = location.href;
        }

    }

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("statsCtrl", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.action.getUsers();
	}

	$scope.action = {
		getUsers : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getUser,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.user = data.users;
					$scope.action.getBusiness();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusiness : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getBusiness,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.business = data.business;
					$scope.action.getDeal();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getDeal : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getDeal,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.deal = data.deals;
					$scope.action.getEvent();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getEvent : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getEvent,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.event = data.event;
					$scope.action.getAmbassador();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getAmbassador : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getAmbassador,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.ambassador = data.ambassador;
					$scope.action.getGuide();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getGuide : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getGuide,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.guide = data.guide;
					$scope.action.getStats();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getStats : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getStats,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.stats = data.stats;
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getBusinessStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#business_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#business_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].business == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getDealStats : function(d){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#deal_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#deal_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].deal == d._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getEventStats : function(b){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#event_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#event_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].event == b._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getGuideStats : function(g){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#guide_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#guide_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].guide == g._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getAmbassadorStats : function(a){
			if(!$scope.stats) return 0;

			var d1, d2;

			if($('#ambassador_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#ambassador_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			var count = 0;
			for(var i = 0; i < $scope.stats.length; i++){
				if($scope.stats[i].ambassador == a._id){
					if($scope.stats[i].time > d1 && $scope.stats[i].time < d2){
						count++;
					}
				}
			}

			return count;
		},
		getWishlist : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2;

			if($('#deal_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#deal_range').val(),
					splt = filter.split(' - ');

				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].deals && $scope.user[i].deals.wishlist && $scope.user[i].deals.wishlist.length){
					var wishlist = $scope.user[i].deals.wishlist;
					for(var j = 0; j < wishlist.length; j++){
						if(wishlist[j] == d._id){
							if($scope.user[i].deal_timestamp && $scope.user[i].deal_timestamp.wishlist){
								if($scope.user[i].deal_timestamp.wishlist[d._id] > d1 && $scope.user[i].deal_timestamp.wishlist[d._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		getRedeemed : function(d){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2;

			if($('#deal_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#deal_range').val(),
					splt = filter.split(' - ');
				if(splt.length == 2){
					d1 = new Date(splt[0]).getTime();
					d2 = new Date(splt[1]).getTime();
				} else {
					d1 = 0;
					d2 = 5453125348645;
				}
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].deals && $scope.user[i].deals.redeemed && $scope.user[i].deals.redeemed.length){
					var redeemed = $scope.user[i].deals.redeemed;
					for(var j = 0; j < redeemed.length; j++){
						if(redeemed[j] == d._id){
							if($scope.user[i].deal_timestamp && $scope.user[i].deal_timestamp.redeemed){
								if($scope.user[i].deal_timestamp.redeemed[d._id] > d1 && $scope.user[i].deal_timestamp.redeemed[d._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		getMyEvent : function(e){
			var count = 0;
			if(!$scope.user || !$scope.user.length){
				return 0;
			}

			var d1, d2;

			if($('#event_range').val() == ""){
				d1 = 0;
				d2 = 5453125348645;
			} else {
				var filter = $('#event_range').val(),
					splt = filter.split(' - ');
				d1 = new Date(splt[0]).getTime();
				d2 = new Date(splt[1]).getTime();
			}

			for(var i = 0; i < $scope.user.length; i++){
				if($scope.user[i].events && $scope.user[i].events.events && $scope.user[i].events.events.length){
					var events = $scope.user[i].events.events;
					for(var j = 0; j < events.length; j++){
						if(events[j]._id == e._id){
							if($scope.user[i].event_timestamp && $scope.user[i].event_timestamp){
								if($scope.user[i].event_timestamp[e._id] > d1 && $scope.user[i].event_timestamp[e._id] < d2){
									count++;
									break;
								}
							}
						}
					}
				}
			}

			return count;
		},
		initLayout : function(){
			Pleasure.init();
			Layout.init();
			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();
			$rootScope.$broadcast("loaded");
		}
	}

	$('#business_range').change(function(){
		$scope.$apply();
	});

	$('#deal_range').change(function(){
		$scope.$apply();
	});

	$('#event_range').change(function(){
		$scope.$apply();
	});

	$('#guide_range').change(function(){
		$scope.$apply();
	});

	$('#ambassador_range').change(function(){
		$scope.$apply();
	});

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("createUserCtrl", ["$scope", "$http", "Utils", "$rootScope", function ($scope, $http, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.user = {
		name : "",
		email : "",
		password : "",
		nationality : "",
		date_of_birth : "",
		address : "",
		mobile : "",
		institution : "",
		settings : {
			"enter" : true,
			"new_deal" : true,
			"preference" : "",
			"redeem" : true,
		}
		
	}

	$scope.map = {
		autoCompleteInput : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });

		}
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.createUser,
					data : $scope.user
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listUser";
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
						html = html + '"<option value="' + $scope.list[i] + '">' + $scope.list[i].name + "</option>";
					}

					$scope.user.settings.preference = $scope.list[0].name;
					$('#categorySelector').html(html);

					html = '';
					for(var i = 0; i < Nationality.length; i++){
						html = html + '"<option value="' + Nationality[i] + '">' + Nationality[i] + "</option>";
					}
					$('#nationalitySelector').html(html);
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
			$rootScope.$broadcast("loaded");
		},
		validate : function(){
			if(!$scope.user.name || !$scope.user.email || !$scope.user.address || !$scope.user.mobile || !$scope.user.institution || !$scope.user.password){
				$('#warning_btn').click();
				return false;
			}

			$scope.user.address = $('#addressAutoComplete').val();
			$scope.user.date_of_birth = $('#birthday').val();
			$scope.user.nationality = $('#nationalitySelector').val();
			$scope.user.settings.preference = $('#categorySelector').val();
			$scope.user.settings.enter = ($('#switcher1').prop('checked'))?"YES":"NO";
			$scope.user.settings.new_deal = ($('#switcher2').prop('checked'))?"YES":"NO";
			$scope.user.settings.redeem = ($('#switcher3').prop('checked'))?"YES":"NO";

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
app.controller("listUserCtrl", ["$scope", "$http", "$state", "$rootScope", function ($scope, $http, $state, $rootScope) {
	/* Main Function of this Scope */
	$scope.refresh = function () {
		Pleasure.init();
		Layout.init();
		$rootScope.$broadcast("loaded");

		$scope.action.getUserList();
	}

	$scope.action = {
		getUserList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getUser,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.users;
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		goToUser : function(user_id){
			$state.go('user', {user_id : user_id});
		}
	}

	$scope.$on('$stateChangeSuccess', function() {
		$scope.refresh();
	});
}]);
app.controller("userCtrl", ["$scope", "$http", "$state", "Utils", "$rootScope", function ($scope, $http, $state, Utils, $rootScope) {	
	/* Main Function of this Scope */
	$scope.refresh = function () {
		$scope.map.init();
		$scope.action.getCategoryList();
	}

	$scope.user = {
		name : "",
		email : "",
		password : "",
		nationality : "",
		date_of_birth : "",
		address : "",
		mobile : "",
		institution : "",
		settings : {
			"enter" : true,
			"new_deal" : true,
			"preference" : "",
			"redeem" : true,
		}
		
	}

	$scope.map = {
		autoCompleteInput : null,
		init : function(){
			this.autoCompleteInput = new google.maps.places.Autocomplete(
				      (document.getElementById('addressAutoComplete')),
				      { types: ['geocode'] });

		}
	}

	$scope.action = {
		doCreate : function(){
			if(this.validate()){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.updateUser,
					data : $scope.user
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listUser";
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
			if(confirm("Do you want to delete this user?")){
				$http({
					method : "POST",
					url : Config.api.endPoint + Config.slug.deleteUser,
					data : {
						id : $scope.user._id
					}
				}).success(function(data) {
					console.log(data);
					// Store user information to local storage
					if(data.success){
						location.href = "/listUser";
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
				url : Config.api.endPoint + Config.slug.getDealCategory,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					$scope.list = data.cat;
					$scope.action.getUserList();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		getUserList : function(){
			$http({
				method : "POST",
				url : Config.api.endPoint + Config.slug.getUser,
			}).success(function(data) {
				console.log(data);
				// Store user information to local storage
				if(data.success){
					for(var i = 0; i < data.users.length; i++){
						if($state.params.user_id == data.users[i]._id){
							$scope.user = data.users[i];
							$scope.user.id = $scope.user._id;
						}
					}

					var html = '';
					for(var i = 0; i < $scope.list.length; i++){
						html = html + '"<option value="' + $scope.list[i] + '">' + $scope.list[i].name + "</option>";
					}

					$scope.user.settings.preference = $scope.list[0].name;
					$('#categorySelector').html(html);

					html = '';
					for(var i = 0; i < Nationality.length; i++){
						html = html + '"<option value="' + Nationality[i] + '">' + Nationality[i] + "</option>";
					}
					$('#nationalitySelector').html(html);
					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		initLayout : function(){
			$('#categorySelector').val($scope.user.settings.preference);
			$('#switcher1').prop('checked', $scope.user.settings.enter == "YES");
			$('#switcher2').prop('checked', $scope.user.settings.new_deal == "YES");
			$('#switcher3').prop('checked', $scope.user.settings.redeem == "YES");
			$('#nationalitySelector').val($scope.user.nationality);
			$('#birthday').val($scope.user.date_of_birth);
			$('#addressAutoComplete').val($scope.user.address);

			Pleasure.init();
			Layout.init();

			FormsIonRangeSlider.init();
			FormsNoUISlider.init();
			FormsPickers.init();	
			$rootScope.$broadcast("loaded");	
		},
		validate : function(){
			if(!$scope.user.name || !$scope.user.email || !$scope.user.address || !$scope.user.mobile || !$scope.user.institution){
				$('#warning_btn').click();
				return false;
			}

			$scope.user.address = $('#addressAutoComplete').val();
			$scope.user.date_of_birth = $('#birthday').val();
			$scope.user.nationality = $('#nationalitySelector').val();
			$scope.user.settings.preference = $('#categorySelector').val();
			$scope.user.settings.enter = ($('#switcher1').prop('checked'))?"YES":"NO";
			$scope.user.settings.new_deal = ($('#switcher2').prop('checked'))?"YES":"NO";
			$scope.user.settings.redeem = ($('#switcher3').prop('checked'))?"YES":"NO";

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
			try{
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;

				// Copy the image contents to the canvas
				var ctx = canvas.getContext("2d");
			
			    ctx.drawImage(img, 0, 0);
				var dataURL = canvas.toDataURL("image/png");

				return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
			} catch (e){
				return "";
			}

		    // Get the data-URL formatted image
		    // Firefox supports PNG and JPEG. You could check img.src to
		    // guess the original format, but be aware the using "image/jpg"
		    // will re-encode the image.
		    
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