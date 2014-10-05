app.controller('loginCtrl', function($scope, $timeout, UserSvc){
	$scope.success = false;
	$scope.failure = false;
	$scope.signup = false;
	$scope.login = true;
	$scope.forgot = false;

	var showSuccess = function(){
		$scope.success = true;
		$timeout(function(){
			$scope.success = '';
		}, 3000);
	};

	var showFailure = function(message){
		message = message.code.split("_").join(" ");
		$scope.message = message;
		$scope.failure = true;
		$timeout(function(){
			$scope.message = '';
			$scope.failure = '';
		}, 3000);
	};

	$scope.logIn= function(){
		UserSvc.loginUser($scope.username, $scope.password).then(function(data){
			if(data.email){
				showSuccess();
			} else {
				showFailure(data);
			}
		});
	};
	$scope.resetEmail = function(){
		UserSvc.resetEmail().then(function(){
			showSuccess();
		});
	};

	$scope.createUser = function(){
		UserSvc.createUser().then(function(){
			showSuccess();
		});
	}

	$scope.toggleLogin = function(){
		$scope.signup = false;
		$scope.login = true;
		$scope.forgot = false;
	};
	$scope.toggleSignup = function(){
		$scope.signup = true;
		$scope.login = false;
		$scope.forgot = false;
	};

	$scope.toggleForgot = function(){
		$scope.signup = false;
		$scope.login = false;
		$scope.forgot = true;
	};

});