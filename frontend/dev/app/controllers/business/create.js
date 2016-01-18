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