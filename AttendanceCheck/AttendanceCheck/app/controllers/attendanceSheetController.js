angular.module('attendanceApp')
    .controller('attendanceSheetController', ['$scope',
        function ($scope) {

            $scope.year = new Date().getFullYear();
                      
            $scope.ClockNum;
            $scope.hoursVacation = 0;
            $scope.hoursSick = 0;

            $scope.players = [
                { playerId: 1, FullName: "Magic Johnson" },
                { playerId: 2, FullName: "Kobe Bryant" },
                { playerId: 3, FullName: "Michael Jordan" },
                { playerId: 4, FullName: "Tim Duncan" },
                { playerId: 5, FullName: "Dewanye Wade" }
            ];

            var attenance = [
                { AbsenceDate: "1/5/2015", Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "5/5/2015", Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "10/5/2015", Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "1/5/2016",  Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "1/6/2016",  Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "1/7/2016", Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "10/7/2016", Reason: "Vacation", NumHours: 8, Id: 3, title: "Michael Jordan", teamId: 1 },
                { AbsenceDate: "1/7/2016",  Reason: "Vacation", NumHours: 8, Id: 5, title: "Dewanye Wade", teamId: 3 },
                { AbsenceDate: "1/7/2016",  Reason: "Vacation", NumHours: 8, Id: 1, title: "Magic Johnson", teamId: 2 },
                { AbsenceDate: "1/7/2016",  Reason: "Vacation", NumHours: 8, Id: 4, title: "Tim Duncan", teamId: 4 },
                { AbsenceDate: "1/11/2016", Reason: "Vacation", NumHours: 8, Id: 4, title: "Tim Duncan", teamId: 4 },
                { AbsenceDate: "1/12/2016", Reason: "Vacation", NumHours: 8, Id: 4, title: "Tim Duncan", teamId: 4 },
                { AbsenceDate: "1/7/2016",  Reason: "Vacation", NumHours: 8, Id: 2, title: "Kobe Bryant", teamId: 2 },
                { AbsenceDate: "1/18/2016", Reason: "Vacation", NumHours: 8, Id: 2, title: "Kobe Bryant", teamId: 2 },
                { AbsenceDate: "1/19/2016", Reason: "Vacation", NumHours: 8, Id: 2, title: "Kobe Bryant", teamId: 2 },
                { AbsenceDate: "1/20/2016", Reason: "Vacation", NumHours: 8, Id: 2, title: "Kobe Bryant", teamId: 2 },
                { AbsenceDate: "2/8/2016",  Reason: "Vacation", NumHours: 8, Id: 2, title: "Kobe Bryant", teamId: 2 },
                { AbsenceDate: "2/9/2016",  Reason: "Vacation", NumHours: 8, Id: 2, title: "Kobe Bryant", teamId: 2 }

            ];

            $scope.update = function () {
                getAttendance();
            }            

            function init(data) {
                $scope.selectedYear = generateYears(2015);
            }

            function getAttendance() {
                var playerId = 0,
                    selectedPlayer;

                if ($scope.playerId !== undefined) {
                    playerId = $scope.playerId.playerId;
                };

                selectedPlayer = attenance.filter(function (record) {
                    return record.Id === playerId && parseInt(record.AbsenceDate.substring(record.AbsenceDate.lastIndexOf("/") + 1, record.AbsenceDate.length), 10) === $scope.year;
                });

                CreateCalendar.createCalendar($scope.year, selectedPlayer);
            }

            init();

            function generateYears(startYear) {
                var years = [];
                var currentYear = new Date().getFullYear();
                startYear = startYear || 2015;

                while (startYear <= currentYear + 1) {
                    years.push(startYear++);
                }

                return years;
            }

            var CreateCalendar = (function () {

                //create the individual month
                var createMonth = function (selectedYear, selectedMonth) {
                    var monthStart = 1,
                        lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate(),
                        currentDay,
                        currentMonth = [];

                    for (monthStart; monthStart <= lastDay; monthStart++) {
                        currentDay = new Date(selectedYear, selectedMonth, monthStart).getDay();

                        currentMonth.push({
                            monthNum: selectedMonth,
                            lastDayOfMonth: new Date(selectedYear, selectedMonth + 1, 0),               // get rid of?
                            lastDay: lastDay,                                                           // get rid of?
                            dateVal: new Date(selectedYear, selectedMonth, monthStart),                 // get rid of?
                            dayNum: monthStart,
                            status: '',
                            dayOfWeek: new Date(selectedYear, selectedMonth, monthStart).getDay(),      // get rid of?
                            isWeekend: currentDay === 0 || currentDay === 6 ? true : false
                        });
                    }

                    return currentMonth;
                }

                //add each month to the calendar
                var createYear = function (selectedYear) {
                    var start = 0,
                        calendar = [];

                    for (start; start < 12; start++) {
                        calendar.push(createMonth(selectedYear, start));
                    }

                    return calendar;
                }

                //add the absences to the calendar
                var addAbsencesToCalendar = function (selectedYear, absencesToAdd) {
                    var daysAbsent = [],
                        individualDayAbsent = [],
                        absences,
                        numAbsences,
                        start = 0,
                        absenceMonth = 0,
                        absenceDay = 0,
                        absenceReason = '',

                        calendar = createYear(selectedYear);

                    $scope.hoursVacation = 0;
                    $scope.hoursSick = 0;

                    // loop through absences and add each day to array
                    for (var prop in absencesToAdd) {
                        individualDayAbsent = [];
                        individualDayAbsent.push(absencesToAdd[prop].AbsenceDate.substr(0, absencesToAdd[prop].AbsenceDate.indexOf('/')));
                        individualDayAbsent.push(absencesToAdd[prop].AbsenceDate.substring(absencesToAdd[prop].AbsenceDate.indexOf('/') + 1, absencesToAdd[prop].AbsenceDate.lastIndexOf('/')));

                        if (absencesToAdd[prop].NumHours === 4) {
                            individualDayAbsent.push(absencesToAdd[prop].Reason.substring(0, 1) + "/2");
                        } else {
                            individualDayAbsent.push(absencesToAdd[prop].Reason.substring(0, 1));
                        }

                        //total vacation hours taken/scheduled
                        if (absencesToAdd[prop].Reason === 'Vacation') {
                            $scope.hoursVacation += absencesToAdd[prop].NumHours;
                        } else if (absencesToAdd[prop].Reason === 'Sick') {
                            $scope.hoursSick += absencesToAdd[prop].NumHours;
                        }

                        daysAbsent.push(individualDayAbsent);
                    }

                    absences = daysAbsent;
                    numAbsences = absences.length;

                    for (start; start < numAbsences; start++) {
                        absenceMonth = absences[start][0];
                        absenceDay = absences[start][1];
                        absenceReason = absences[start][2];
                        calendar[absenceMonth - 1][absenceDay - 1].status = absenceReason;
                    }

                    return calendar;
                }

                var createCalendar = function createCalendar(selectedYear, absencesToAdd) {
                    var calendar = addAbsencesToCalendar(selectedYear, absencesToAdd),
                        numColumns = 12,  // months
                        numRows = 31,     // days
                        absenceStatus = '',
                        weekend = '',
                        cellStyle = '',
                        calendarView = $('#calendarView'),
                        calMonths = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                        calendarTable = '';


                    calendarView.html('');

                    calendarTable += '<table class="table-bordered attendanceTable">';

                    calendarTable += '<thead>'

                    calendarTable += '<th></th>';

                    for (m = 0; m < calMonths.length; m++) {
                        calendarTable += '<th>' + calMonths[m] + '</th>';
                    }

                    calendarTable += '</thead>';

                    for (x = 0; x < numRows; x++) {
                        calendarTable += '<tr>';

                        //first column
                        calendarTable += '<td>' + (x + 1) + '</td>';

                        for (y = 0; y < numColumns; y++) {

                            if (calendar[y][x]) {
                                absenceStatus = calendar[y][x].status;
                                if (calendar[y][x].isWeekend) {
                                    cellStyle = 'style = "background-color: lightgrey"';
                                } else {
                                    cellStyle = '';
                                }
                            }
                            else {
                                absenceStatus = '';
                                cellStyle = 'style = "background-color: black"';
                            }

                            calendarTable += '<td ' + cellStyle + '>' + absenceStatus + '</td>';

                        }
                        calendarTable += '</tr>';
                    }

                    calendarTable += '</table>';

                    calendarView.append(calendarTable);
                }

                var publicAPI = {
                    createCalendar: createCalendar
                }

                return publicAPI;
            })();

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


