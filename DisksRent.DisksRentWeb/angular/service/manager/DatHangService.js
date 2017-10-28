/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('DatHangService', function ($http, $q) {
    let API = 'http://http://localhost:49497/api/';
    function DatHangService() {
        let self = this;

        self.datHangTieuDeDangHetDia = function (maKh, maTieuDe) {
            let deferred = $q.defer();

            $http({
                method: 'post',
                url: API + 'dathang/' +maKh + '/' +maTieuDe 
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.huyDatHang = function (maKh, maTieuDe) {
            let deferred = $q.defer();

            $http({
                method: 'put',
                url: API + 'dathang/' + maKh + '/' + maTieuDe
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