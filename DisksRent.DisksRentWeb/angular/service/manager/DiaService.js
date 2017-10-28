/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('DiaService', function ($http, $q) {
    let API = 'http://http://localhost:49497/api/';
    function DiaService() {
        let self = this;

        self.getAllDia = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'dia'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postDia = function (maTieuDe, soLuong) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'dia/' +maTieuDe + '/' + soLuong
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }


        self.deleteDia = function (id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'dia/' + id
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new DiaService();
});