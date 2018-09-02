angular.module('formsBuilder')
 .controller('submissionPageController', ['$scope', '$rootScope', '$location', '$http', '$routeParams', function ($scope, $rootScope, $location, $http, $routeParams) {
 
    let self = this;
    self.serverUrl = 'http://localhost:3000/';
    self.fields= [];
    self.formID= $routeParams.name;
    self.formName="";

    self.getFullFields = function () {
        let d= self.serverUrl + 'getAllFullFormsByID/' + self.formID
        $http.get(d,)
        .then(function (response) {
            self.formName= response.data[0].formName;
            self.fields= response.data;

        }, function (response) {
            window.alert("Something went wrong");
        });
   }



}]);