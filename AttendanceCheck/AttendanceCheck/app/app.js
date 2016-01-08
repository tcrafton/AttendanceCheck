var calTestApp = angular.module('attendanceApp', ['ngRoute']);

calTestApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/calendarView', {
        controller: 'calendarViewController',        
        templateUrl: '/app/views/calendarView.html',                           
    })
    $routeProvider.when('/attendanceSheet', {
        controller: 'attendanceSheetController',        
        templateUrl: '/app/views/attendanceSheet.html',                      
    })
    $routeProvider.when('/overview', {
        controller: 'overviewController',        
        templateUrl: '/app/views/overview.html',                            
    })
    .otherwise({ redirectTo: '/calendarView' });
}]);
