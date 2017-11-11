/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('KhachHangService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function KhachHangService() {
        let self = this;

        self.getCountKhachHang = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'khachhang/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

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

        self.getKhachHangByLimitAndOffset = function (limit, model) {
            let deferred = $q.defer();
            let offset = (model-1) * limit;

            $http({
                method: 'GET',
                url: API + 'khachhang/' + limit + '/' + offset
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }


        self.getCountKhachHangTraTre = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'khachhang/diatre/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getKhachHangTraTre = function (limit, model) {
            let deferred = $q.defer();
            let offset = (model - 1) * limit;
            $http({
                method: 'GET',
                url: API + 'khachhang/diatre/' + limit + '/' + model
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getCountKhachHangCoNo = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'khachhang/cono/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getKhachHangCoNo = function (limit, model) {
            let deferred = $q.defer();
            let offset = (model - 1) * limit;
            $http({
                method: 'GET',
                url: API + 'khachhang/cono/' + limit + '/' + model
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }


        self.getKhachHangDetails = function (maKhachHang) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'khachhang/'  + maKhachHang
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postKhachHang = function (kh) {
            let deferred = $q.defer();

            $http({
                method: 'POST',
                url: API + 'khachhang',
                data: kh
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

        self.deleteKhachHang = function (maKhachHang) {
            let deferred = $q.defer();
            $http.delete(API + 'KhachHangs/' + maKhachHang).then(
                function success(response) {
                    deferred.resolve(response);
                }, function error(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }
    }

    return new KhachHangService();
});