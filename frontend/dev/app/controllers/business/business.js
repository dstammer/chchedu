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