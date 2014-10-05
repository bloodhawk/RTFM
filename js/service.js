app.service('UserSvc', function($firebase, $q, $firebaseSimpleLogin, $window){
	var loggedInUser;
	var init = function(){
		if($window.sessionStorage["loggedInUser"]) {
			loggedInUser = JSON.parse($window.sessionStorage["loggedInUser"]);
		}
	}
	init();
	var url = new Firebase('https://rtforum.firebaseio.com');
   	var ref = $firebaseSimpleLogin(url)
	this.createUser = function(email, password){
		ref.$createUser(email, password).then(function(data){
			console.log(data);
		});
	};

	this.getUserInfo = function(){
		return loggedInUser;
	};

	this.loginUser = function(email, password){
		var defer = $q.defer();
		ref.$login('password',{
			email: email,
			password: password
		}).then(function(success){
			loggedInUser = {email: success.email,
			accessToken: success.firebaseAuthToken}
			$window.sessionStorage['loggedInUser'] = JSON.stringify(loggedInUser);
			defer.resolve(loggedInUser);
		},
		function(fail){
			defer.resolve(fail);
		});
		return defer.promise;
	};

	this.logOutUser = function(){
		$window.sessionStorage['loggedInUser'] = null;
		loggedInUser = null;
		ref.$logout();
	};

	this.changePassword = function(email, currentPassword, newPassword){
		ref.$changePassword({
  				email: email,
  				oldPassword: currentPassword,
  				newPassword: newPassword
		}, function(error) {
  			if (error === null) {
    			console.log("Password changed successfully");
  			} else {
    			console.log("Error changing password:", error);
  			}
		});
	};

	this.resetEmail = function(email){
		return ref.$sendPasswordResetEmail(email);
	};

});



///////////////////////////////////////////////////////



app.service('threadSvc', function($firebase){
   var url = 'https://rtforum.firebaseio.com';
   this.getThreads = function(){
   		return $firebase(new Firebase(url + '/threads'));
   };
   this.getThread = function(id){
   		return $firebase(new Firebase(url + '/threads/' + id));

   };
   this.getComments = function (id) {
        return $firebase(new Firebase(url + '/threads/' + id + '/comments'));
   };
});