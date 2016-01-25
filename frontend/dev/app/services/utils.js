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