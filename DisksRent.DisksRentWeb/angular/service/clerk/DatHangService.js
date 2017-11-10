/// <reference path="../../manager/ManagerApp.js" />
ClerkApp.factory('DatHangService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function DatHangService() {
        let self = this;

        self.getCountDsDatHang = function () {
            let deferred = $q.defer();

            $http({
                method: 'get',
                url: API + 'datHang/get/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getDsDatHang = function (limit, model) {
            let deferred = $q.defer();

            $http({
                method: 'get',
                url: API + 'datHang/get/' + limit + '/' + ((--model)*limit)
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }


        self.getCountDsDatHangWithOption = function (maKhachHang, maTieuDe) {
            let deferred = $q.defer();
            maKhachHang = maKhachHang.length > 0 ? maKhachHang : '-1';
            maTieuDe = maTieuDe.length > 0 ? maTieuDe : '-1';
            
            $http({
                method: 'get',
                url: API + 'datHang/option/' + maKhachHang + '/' + maTieuDe + '/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getDsDatHangWithOption = function (maKhachHang, maTieuDe, limit, model) {
            let deferred = $q.defer();
            maKhachHang = maKhachHang.length > 0 ? maKhachHang : '-1';
            maTieuDe = maTieuDe.length > 0 ? maTieuDe : '-1';

            $http({
                method: 'get',
                url: API + 'datHang/option/' + maKhachHang + '/' + maTieuDe +'/' + limit + '/' + ((--model) * limit)
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.datHangTieuDeDangHetDia = function (maKh, maTieuDe) {
            let deferred = $q.defer();

            $http({
                method: 'post',
                url: API + 'dathang/dathang/' + maKh + '/' + maTieuDe
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.huyDatHang = function (maKh, maTieuDe, thuTu) {
            let deferred = $q.defer();

            $http({
                method: 'put',
                url: API + 'dathang/huy/' + maKh + '/' + maTieuDe + '/' + thuTu
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.chuyenTinhTragDiaDaXong = function (maKh, maTieuDe) {
            let deferred = $q.defer();

            $http({
                method: 'put',
                url: API + 'dia/' + maTieuDe + '/' + maKh
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new DatHangService();
});