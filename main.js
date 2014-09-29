var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($scope, $interval) {
    $scope.myData = getInitialData();
    $scope.gridOptions = { data: 'myData', multiSelect: false };

    var moveRowDownTimer, moveRowUpTimer;
    $scope.moveRowDownStart = function(event) {

        moveRowDownTimer = $interval(function() {        
        	var selectedItem = $scope.gridOptions.$gridScope.selectedItems[0];
            var data = deepCopy($scope.myData);
            var index = $scope.myData.indexOf(selectedItem);

            var newIndex = index + 1;
            if(newIndex >= $scope.myData.length)
                return;

            var temp = data[newIndex];
            data[newIndex] = selectedItem;
            data[index] = temp; 
            $scope.myData = data; 
            $scope.scrollTo(index - 3 < 0 ? 0 : (index - 3));
        }, 300);
    }

    $scope.moveRowDownStop = function(event) {
        $interval.cancel(moveRowDownTimer);
    }

    $scope.moveRowUpStart = function(event) {
        moveRowUpTimer = $interval(function() {        
            var selectedItem = $scope.gridOptions.$gridScope.selectedItems[0];
            var data = deepCopy($scope.myData);
            var index = $scope.myData.indexOf(selectedItem);

            var newIndex = index - 1;
            if(newIndex < 0)
                return;

            var temp = data[newIndex];
            data[newIndex] = selectedItem;
            data[index] = temp; 
            $scope.myData = data;
            $scope.scrollTo(index - 3 < 0 ? 0 : (index - 3));
        }, 300);
    }

    $scope.resetSortOrder = function(event) {
        $scope.myData = getInitialData();
    }

    $scope.moveRowUpStop = function(event) {
        $interval.cancel(moveRowUpTimer);
    }

    $scope.scrollTo = function(index) {
        var grid = $scope.gridOptions.ngGrid;
        grid.$viewport.scrollTop(grid.rowMap[index] * grid.config.rowHeight);
    };

    function deepCopy(obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            var out = [], i = 0, len = obj.length;
            for ( ; i < len; i++ ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        if (typeof obj === 'object') {
            var out = {}, i;
            for ( i in obj ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        return obj;
    }

    function getInitialData() {
        return  [
                    {name: "Moroni", age: 50},
                    {name: "Tiancum", age: 43},
                    {name: "Jacob", age: 27},
                    {name: "Nephi", age: 29},
                    {name: "Enos", age: 34},
                    {name: "Enos1", age: 35},
                    {name: "Enos2", age: 36},
                    {name: "Enos3", age: 37},
                    {name: "Enos4", age: 38},
                    {name: "Enos5", age: 39},
                    {name: "Moroni", age: 50},
                    {name: "Tiancum", age: 43},
                    {name: "Jacob", age: 27},
                    {name: "Nephi", age: 29},
                    {name: "Enos", age: 34},
                    {name: "Enos1", age: 35},
                    {name: "Enos2", age: 36},
                    {name: "Enos3", age: 37},
                    {name: "Enos4", age: 38},
                    {name: "Enos5", age: 39}
                ];       
    }
});