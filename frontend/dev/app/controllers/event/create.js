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

			var min = $('.irs-from').html(), max = $('.irs-to').html();
			min = min.replace('$', '');
			max = max.replace('$', '');

			$scope.event.price = {"min" : min, "max" : max};

			$scope.event.start_date = $("#start_date").val() + " " + $('#start_time').val();
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