var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    //scope is model that holds all data for use between html and js
    $scope.title = "";
    $scope.descrip = "";
    $scope.image="";
    $scope.date = "";


    angular.element(document).ready(function() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        var today = year + "-" + month + "-" + day;
        var url = 'https://api.nasa.gov/planetary/apod?api_key=xhbGccxgF3wjuoSeHo02FB3tFDTGZNWkRMjWu5E4';
        console.log(url);
        $http.get(url).then(function(response) {
            $scope.title = response.data.title;
            $scope.descrip = response.data.explanation;
            $scope.image = response.data.url;
            $scope.date = response.data.date;
        });

    });
    




});

