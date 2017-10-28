/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('KhachHangService', function ($http, $q) {
    let API = 'http://http://localhost:49497/api/';
    function KhachHangService() {
        let self = this;

        self.getAllKhachHang = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'khachhang'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postKhachHang = function (khachHang) {
            let deferred = $q.defer();

            $http({
                method: 'POST',
                url: API + 'khachhang',
                data: khachHang
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

       
        self.putKhachHang = function (khachHang) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                url: API + 'khachhang',
                data: khachHang
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.deleteKhachHang = function (maSoKhachHang) {
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: API + 'khachhang/' + maSoKhachHang,
                data: khachHang
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new KhachHangService();
});