/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('DiaService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function DiaService() {
        let self = this;

        self.getCountDiaOfTieuDe = function (maTieuDe) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'dia/tieude/' + maTieuDe +'/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getDiaOfTieuDeBySizeOffset = function (maTieuDe,limit, model) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'dia/tieude/' + maTieuDe + '/' + limit + '/' +((model - 1)*limit)
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getDiaById = function (maDia) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'dia/' +maDia
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
                method: 'POST',
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
                method: 'DELETE',
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