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