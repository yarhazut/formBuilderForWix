angular.module('formsBuilder')
 .controller('formsListController', ['$scope', '$rootScope', '$location', '$http', '$routeParams', function ($scope, $rootScope, $location, $http, $routeParams) {
 
    let self = this;
    self.serverUrl = 'http://localhost:3000/';
    let forms= [];
   

    self.moveToBuild = function () {
         $location.path('/build')
    }

    self.moveToPageSubmit=function(id){
        $location.path('/submit/'+id)
    }
    self.moveToPageSubmissions=function(id){
        $location.path('/submissions/'+id)
    }

    self.getFormsForTable = function () {
        let newUrl= self.serverUrl+"/getFormsForMainTable"
        $http.get(newUrl, )
        .then(function (response) {
            if(response.status=='500')
            {
                window.alert("something went wrong...")
                return
            }
            else
            {
                self.forms= new Array();
                self.forms= response.data;
            }
                
        }, function (response) {
            window.alert("something went wrong.outererr..")
        });
   }

   self.getForms = function () {
    $http.get(self.serverUrl + "getFormsForMainTable")
        .then(function (response) {
            //self.forms= new Array();
            self.forms= response.data;

        }, function (response) {
        //    self.reg.content = response.data
            //Second function handles error
            // self.reg.content = "Something went wrong";
            window.alert("wrong")
        });
}








}]);