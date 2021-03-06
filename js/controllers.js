angular.module('mainControllers', ['ngStorage']).controller('MainController', ['$rootScope', '$scope', '$http', '$timeout', '$localStorage',
function($rootScope, $scope, $http, $timeout, $localStorage) {

	$scope.data = $scope.data ? $scope.data : {};
	$scope.actions = $scope.actions ? $scope.actions : {};

	var d = $scope.data;
	var a = $scope.actions;
	$rootScope.$storage = {};
	var ss = $localStorage;

	// return random images between 1 and 10
	a.randNum = function() {
		return (Math.floor(Math.random() * (9 - 1 + 1)) + 1) + "";
	};

	var svr = "https://3a243b52.ngrok.io/";

	d.img = "1";
	
	var dRange = 30;

	a.getMinutes = function(t) {
		console.log(t);
		t = new Date(t);
		return t.toLocaleTimeString().replace(":00", "");
	};

	a.getMinutesBefore = function(t) {
		console.log(t);
		t = new Date(t);
		return new Date(t.getTime() - 1000 * (60 * dRange)).toLocaleTimeString().replace(":00", "");
	};

	// get ward summary
	// $http.get(svr + "ward/summary").then(function(response) {
		// d.wardSummary = response.data.reverse();
		// ss.wardSummary = [];
// 		
		// for (var i = 0; i < d.wardSummary.length; i++) {
			// ss.wardSummary.push([d.wardSummary[i].frequency + "", d.wardSummary[i].milliSinceEpoch]);
		// }
	// });
	
	
	function keysrt(key) {
	  return function(a,b){
	   if (a[key] > b[key]) return 1;
	   if (a[key] < b[key]) return -1;
	   return 0;
	  }
	};
	
	$http.get(svr + "hospital/summary").then(function(response) {
		response.data.sort(keysrt('frequency'));
		d.top3Profs = response.data.reverse().slice(0, 4);
	});

	d.wardSummary = [{
		"frequency" : 69,
		"milliSinceEpoch" : "2017-09-24T06:00:00"
	}, {
		"frequency" : 176,
		"milliSinceEpoch" : "2017-09-24T06:30:00"
	}, {
		"frequency" : 151,
		"milliSinceEpoch" : "2017-09-24T07:00:00"
	}, {
		"frequency" : 60,
		"milliSinceEpoch" : "2017-09-24T07:30:00"
	}, {
		"frequency" : 167,
		"milliSinceEpoch" : "2017-09-24T08:00:00"
	}, {
		"frequency" : 117,
		"milliSinceEpoch" : "2017-09-24T08:30:00"
	}, {
		"frequency" : 67,
		"milliSinceEpoch" : "2017-09-24T09:00:00"
	}, {
		"frequency" : 55,
		"milliSinceEpoch" : "2017-09-24T09:30:00"
	}, {
		"frequency" : 194,
		"milliSinceEpoch" : "2017-09-24T10:00:00"
	}, {
		"frequency" : 182,
		"milliSinceEpoch" : "2017-09-24T10:30:00"
	}, {
		"frequency" : 188,
		"milliSinceEpoch" : "2017-09-24T11:00:00"
	}, {
		"frequency" : 176,
		"milliSinceEpoch" : "2017-09-24T11:30:00"
	}];
	
	d.top3Wards = [
		{name: "A4 (Endoscopy Unit)", totalPeople: 32, totalWashes: 3994},
		{name: "B2 (Intensive Care Unit, ITU)", totalPeople: 34, totalWashes: 2003},
		{name: "Emergency Department (A&E)", totalPeople: 45, totalWashes: 1002},
	];
	
	ss.wardSummary = [];
	
	
	for (var i = 0; i < d.wardSummary.length; i++) {
		ss.wardSummary.push([a.getMinutes(d.wardSummary[i].milliSinceEpoch), d.wardSummary[i].frequency + 0]);
	}
	console.log(ss.wardSummary);

	
	d.wards = [	];
	
	
	for (var j = 0; j < d.wards; j++) {
		var item = []
		for (var i = 0; i < d.wardSummary.length; i++) {
			item.push([a.getMinutes(d.wardSummary[i].milliSinceEpoch), d.wardSummary[i].frequency + 0]);
		}
		ss.wards.push(item);
	}
	
	console.log(d.wards);
}]);
