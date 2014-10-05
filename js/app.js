var app = angular.module('rtfm', ['ngRoute', 'firebase']);

app.config(['$routeProvider',
  function($routeProvider, $rootScope, $q, $route, UserSvc, threadSvc) {
    $routeProvider.
      when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'loginCtrl'
      }).
      when('/threads', {
        templateUrl: '/templates/threads.html',
        controller: 'threadsCtrl',
        resolve: {
        	auth: function($q, UserSvc){
        		var user = UserSvc.getUserInfo();
        		if(user){
        			return $q.when(user);
        		} else {
        			return $q.reject({auth: false})
        		}
        	},
        	threads: function($q, threadSvc){
        		return threadSvc.getThreads();
        	}
   		   }
      }).when('/threads/:threadId', {
      	templateUrl: '/templates/thread.html',
        controller: 'threadCtrl',
        resolve: {
        	auth: function($q, UserSvc){
        		var user = UserSvc.getUserInfo();
        		if(user){
        			return $q.when(user);
        		} else {
        			return $q.reject({auth: false})
        		}
        	},
          threadRef: function($route, threadSvc){
            return threadSvc.getThread($route.current.params.threadId);
          },
          commentsRef: function($route, threadSvc){
            return threadSvc.getComments($route.current.params.threadId);
          }
   		 }
      }).otherwise({
        redirectTo: '/threads'
      });
}]);

app.run(["$rootScope", "$location", function($rootScope, $location) { 
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user){
  	$location.path("/threads")
  });	
  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.auth === false) {
      $location.path("/login");
    }
  });
  $rootScope.$on("$firebaseSimpleLogin:logout", function(event){
  	  $location.path("/login");
  });
}]);