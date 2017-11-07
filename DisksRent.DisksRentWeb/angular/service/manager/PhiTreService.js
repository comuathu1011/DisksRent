/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('PhiTreService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function PhiTreService() {
        let self = this;

        self.getAllPhiTre = function () {
            let deferred = $q.defer();

            $http({
                method: 'get',
                url: API + 'phitre/'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getPhiTreKhachHang = function (maKh) {
            let deferred = $q.defer();

            $http({
                method: 'get',
                url: API + 'phitre/' +maKh
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getCountPhiTreByKhachHang = function (maKhachHang) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'phitre/' + maKhachHang + '/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getPhiTreByKhachHang = function (maKhachHang, limit, model) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'phitre/' + maKhachHang + '/' + limit + '/' + ((model - 1) * limit)
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postThanhToanPhiTre = function (entity) {
            let deferred = $q.defer();

            $http({
                method: 'post',
                url: API + 'phitre/thanhtoan',
                data: entity
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postHuyPhiTre = function (entity) {
            let deferred = $q.defer();

            $http({
                method: 'post',
                url: API + 'phitre/huy',
                data: entity
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new PhiTreService();
});