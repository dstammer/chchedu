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
    }).state("home", {
       url: "/mainPage",
       views: {
          "main-content" : { 
            templateUrl: "partials/home.html",
            controller: "homeCtrl"
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