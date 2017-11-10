/// <reference path="../../manager/ManagerApp.js" />
ClerkApp.factory('TieuDeService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function TieuDeService() {
        let self = this;

        self.getCountTieuDe = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'tieude/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getTieuDeByLimitAndOffset = function (limit, model) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'tieude/'+ limit +'/' + ((model - 1)*model)
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getChiTietTieuDe = function (id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'tieude/' +id
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postTieuDe = function (tieude) {
            let deferred = $q.defer();

            $http({
                method: 'POST',
                url: API + 'tieude',
                data: tieude
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.deleteTieuDe = function (id) {
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: API + 'tieude/' + id
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getTieuDeById = function (id) {
            let deferred = $q.defer();

            $http({
                method: 'get',
                url: API + 'tieude/' + id
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new TieuDeService();
});