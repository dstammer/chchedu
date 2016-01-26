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
						var selected = "";
						if($scope.list[i] == $scope.event.category){
							selected = "selected";
						} else {
							if($scope.event.category && $scope.event.category.constructor == Array){
								for(var j = 0; j < $scope.event.category.length; j++){
									console.log($scope.event.category[j]._id + ' ' + $scope.list[i]._id);
									if($scope.event.category[j]._id == $scope.list[i]._id){
										selected = "selected";
									}
								}
							}
						}
						html = html + "<option value='" + $scope.list[i]._id + "' selected>" + $scope.list[i].name + "</option>";
					}
					$('#categorySelector').html(html);

					console.log(html);

					$scope.action.initLayout();
				} else {
					$('#err_btn').click();
				}
			}).error(function() {
				$('#err_btn').click();
			});
		},
		initLayout : function(){
			
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