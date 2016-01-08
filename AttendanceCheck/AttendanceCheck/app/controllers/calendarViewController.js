var app = angular.module('attendanceApp')
    .controller('calendarViewController', ['$scope', '$filter',
        function ($scope, $filter) {

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
                players,
                today = new Date(),
                year = today.getFullYear();


            players = [
                { allDay: true, color: "#0080FF", start: moment("1/5/2016", "MM/DD/YYYY"),  title: "Michael Jordan - 8", teamId: 1 },
                { allDay: true, color: "#0080FF", start: moment("1/6/2016", "MM/DD/YYYY"),  title: "Michael Jordan - 8", teamId: 1 },
                { allDay: true, color: "#0080FF", start: moment("1/7/2016", "MM/DD/YYYY"),  title: "Michael Jordan - 8", teamId: 1},                
                { allDay: true, color: "#0080FF", start: moment("1/7/2016", "MM/DD/YYYY"),  title: "Dewanye Wade - 8", teamId: 3 },
                { allDay: true, color: "#0080FF", start: moment("1/7/2016", "MM/DD/YYYY"),  title: "Magic Johnson - 8", teamId: 2 },
                { allDay: true, color: "#0080FF", start: moment("1/7/2016", "MM/DD/YYYY"),  title: "Tim Duncan - 8", teamId: 4 },
                { allDay: true, color: "#0080FF", start: moment("1/11/2016", "MM/DD/YYYY"), title: "Tim Duncan - 8", teamId: 4 },
                { allDay: true, color: "#0080FF", start: moment("1/12/2016", "MM/DD/YYYY"), title: "Tim Duncan - 8", teamId: 4 },
                { allDay: true, color: "#0080FF", start: moment("1/7/2016", "MM/DD/YYYY"),  title: "Kobe Bryant - 8", teamId: 2 },
                { allDay: true, color: "#0080FF", start: moment("1/18/2016", "MM/DD/YYYY"), title: "Kobe Bryant - 8", teamId: 2 },
                { allDay: true, color: "#0080FF", start: moment("1/19/2016", "MM/DD/YYYY"), title: "Kobe Bryant - 8", teamId: 2 },
                { allDay: true, color: "#0080FF", start: moment("1/20/2016", "MM/DD/YYYY"), title: "Kobe Bryant - 8", teamId: 2 },
                { allDay: true, color: "#0080FF", start: moment("2/8/2016", "MM/DD/YYYY"),  title: "Kobe Bryant - 8", teamId: 2 },
                { allDay: true, color: "#0080FF", start: moment("2/9/2016", "MM/DD/YYYY"),  title: "Kobe Bryant - 8", teamId: 2 }

            ];

            function getCalenderEvents(teamId) {
                if (!teamId) {
                    teamId = 2;
                }                

                calEvents = players.filter(function (player) {
                    return player.teamId === teamId;
                });

                createCalendar();
            }

            function init() {
                getCalenderEvents();
            }

            init();

            $scope.update = function () {
                getCalenderEvents($scope.team.teamId);

            }

            function createCalendar() {
                $('#calendar').fullCalendar('destroy');
                $('#calendar').fullCalendar({
                    height: 750,
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: Date.now(),
                    editable: false,
                    eventLimit: true, // allow "more" link when too many events
                    events: calEvents,
                });
            }

            function setLabelColor(reasonAbsent) {
                if (reasonAbsent === 1) { // vacation
                    return '#0080FF'; // blue
                } else if (reasonAbsent === 2) { // personal sickness
                    return '#FF0000'; // red
                } else if (reasonAbsent === 3) { // company business
                    return '#088A29';  // green
                } else {
                    return '#000000'; // need to define a color for another absence reason?
                }
            }

            function mapEvents(event) {
                return {
                    start: moment(event.start, "MM/DD/YYYY"),
                    title: event.title,
                    allDay: true,
                    color: setLabelColor(event.ReasonAbsent)
                }
            }

            Array.prototype.filter = function (predicateFunction) {
                var results = [];
                this.forEach(function (itemInArray) {
                    if (predicateFunction(itemInArray)) {
                        results.push(itemInArray);
                    }
                });
                return results;
            };

        }]);


