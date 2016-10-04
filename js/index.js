var App = angular.module("App", ["firebase"]);

App.controller("AppCtrl", function($scope, $firebaseArray) {
  //var ref = new Firebase("https://colorvote.firebaseio.com/");
  var ref = new Firebase("https://test-b2a2d.firebaseio.com/");
  
  //var list = $firebaseArray(ref);
  $scope.colors = $firebaseArray(ref);
  
  $scope.colors.$loaded().then(function(x) {
    $scope.flag = x.$getRecord("flag");
    console.log("flag("+$scope.flag.checked+")");
	if($scope.flag.checked == "true") {
		
		$scope.confirmed = true;
	} else {
		$scope.confirmed = false;
	}
	
}).catch(function(error) {
    console.log("Error:", error);
});
  
  $scope.add = function() {
    if ($scope.name) {
      $scope.colors.$add({
        name: $scope.name,
        count: 0
      });
    } else {
      alert("Can't be blank..");
    }
    $scope.name = "";
	
	console.log("add");
  };

  $scope.vote = function(color) {
    color.count += 1;
    $scope.colors.$save(color);
	console.log("vote");
  };
  
  $scope.delete = function(color) {
    $scope.colors.$remove(color);
  	console.log("delete");
  };
  
  $scope.change = function(flag) {
   		console.log("change 0 ==> flag.checked("+flag.checked+")");

		if(flag.checked == true) {
		 	console.log("change 1");
			flag.checked = true;
			
			
			
		} else {
			console.log("change 2");
			flag.checked = false;
		}
		
		$scope.colors.$save(flag);
  };
});