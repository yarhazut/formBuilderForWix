let app = angular.module('formsBuilder', ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl: 'components/formsList/formsList.html',
        controller : 'formsListController as formsListCtrl'
    })
        .when('/build', {
            templateUrl: 'components/formBuilder/formBuilder.html',
            controller : 'formBuilderController as formBuilderCtrl'
        })
        .when('/submit/:id?', {
            templateUrl: 'components/submit/submitPage.html',
            controller : 'submitPageController as submitPageCtrl'
        })
        .when('/submissions/:name?', {
            templateUrl: 'components/submission/submissionPage.html',
            controller : 'submissionPageController as submissionPageCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);

