var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {

    var formatDate = function(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        date = yyyy + '-' + mm + '-' + dd;
        return date;
    };


    $scope.info = [];

    $scope.dateSubmit = function() {
        console.log($scope.neosDate);
        neosFeed($scope.neosDate);
    };

    var neosFeed = function(date) {

        var api_key = "ErQ8SdD0SWkbyizQQCPpy20rXVChA3h95MsUnMOT";
        var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + date + "&end_date=" + date + "&api_key=" + api_key;

        $http.get(url).then(function(response) {
            console.log(response);

            var asteroids = response.data.near_earth_objects;
            for (var date in asteroids) {
                for (var iterator in asteroids[date]) {
                    var object = asteroids[date][iterator];
                    var id = object.neo_reference_id;
                    var closeApproachDate = object.close_approach_data[0].close_approach_date;
                    var miss_distance = object.close_approach_data[0].miss_distance.miles;
                    var velocity = object.close_approach_data[0].relative_velocity.miles_per_hour;
                    var hazardous = object.is_potentially_hazardous_asteroid;
                    if (hazardous) {
                        hazardous = "Yes";
                    }
                    else {
                        hazardous = "No";
                    }

                    $scope.info.push({ ID: id, DATE: closeApproachDate, DISTANCE: miss_distance, VELOCITY: velocity, HAZARDOUS: hazardous });
                    console.log($scope.info);
                    console.log(id);
                    console.log(closeApproachDate);
                    console.log(miss_distance);
                    console.log(velocity);
                    console.log(hazardous);

                }

            }

        });
    };

    var curr_day = formatDate(new Date());
    console.log(curr_day);
    neosFeed(curr_day);
});
