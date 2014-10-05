app.controller('threadsCtrl', function($scope, UserSvc, threadSvc, threads){
	var getCurUser = function(){
		var obj = UserSvc.getUserInfo();
		return obj.email;
	}

	$scope.logOut = function(){
		UserSvc.logOutUser();
	};
	$scope.curUser = getCurUser();
	$scope.threads = threads.$asArray();
	$scope.createThread = function(){
		$scope.threads.$add({
			username: $scope.curUser,
			title: $scope.newThreadTitle
		});
	};

});

app.controller('threadCtrl', function($scope, UserSvc, threadRef, commentsRef){
	var getCurUser = function(){
		var obj = UserSvc.getUserInfo();
		return obj.email;
	};
	$scope.curUser = getCurUser();
	var obj = threadRef.$asObject();
	obj.$bindTo($scope, 'thread');
	$scope.comments = commentsRef.$asArray();
	$scope.createComment = function(){
		$scope.comments.$add({
			username: $scope.curUser,
			text: $scope.newCommentText
		});
	};
});