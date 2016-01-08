var app = angular.module('attendanceApp')
    .controller('overviewController', ['$scope', '$filter', 
        function ($scope, $filter) {
            $scope.absences;
            $scope.teams = [
                {
                    teamId: 1,
                    name: 'Bulls'
                },
                {
                    teamId: 2,
                    name: 'Lakers'
                },
                {
                    teamId: 3,
                    name: 'Heat'
                },
                {
                    teamId: 4,
                    name: 'Spurs'
                }
            ]

            $scope.team = $scope.teams[1];

            var calEvents,
                today = new Date();

            function getAbsences() {
                var absences = [
                    { AbsenceDate: "1/5/2016", FullName: "Michael Jordan", teamId: 1 },
                    { AbsenceDate: "1/6/2016", FullName: "Michael Jordan", teamId: 1 },
                    { AbsenceDate: "1/7/2016", FullName: "Michael Jordan", teamId: 1 },
                    { AbsenceDate: "1/7/2016", FullName: "Dewanye Wade", teamId: 3 },
                    { AbsenceDate: "1/7/2016", FullName: "Magic Johnson", teamId: 2 },
                    { AbsenceDate: "1/7/2016", FullName: "Tim Duncan", teamId: 4 },
                    { AbsenceDate: "1/11/2016", FullName: "Tim Duncan", teamId: 4 },
                    { AbsenceDate: "1/12/2016", FullName: "Tim Duncan", teamId: 4 },
                    { AbsenceDate: "1/7/2016", FullName: "Kobe Bryant", teamId: 2 },
                    { AbsenceDate: "1/18/2016", FullName: "Kobe Bryant", teamId: 2 },
                    { AbsenceDate: "1/19/2016", FullName: "Kobe Bryant", teamId: 2 },
                    { AbsenceDate: "1/20/2016", FullName: "Kobe Bryant", teamId: 2 },
                    { AbsenceDate: "2/8/2016", FullName: "Kobe Bryant", teamId: 2 },
                    { AbsenceDate: "2/9/2016", FullName: "Kobe Bryant", teamId: 2 }
                ],
                absencesByArea;


                absencesByArea = _.filter(absences, function (e) {
                    return e.teamId === $scope.team.teamId;
                });

                $scope.absences = _.groupBy(absencesByArea, 'FullName');

            }

            function init() {
                getAbsences();
            }

            init();

            $scope.update = function () {
                getAbsences();
            }

            function groupAbsencesByPerson(list) {
                _.chain(list)
                .groupBy('ClockNum')
                .map(function (value, key) {
                    return {
                        clockNum: key,
                        absences: _.pluck(value, 'AbsenceDate')
                    }
                }).value();
            }

        }]);


