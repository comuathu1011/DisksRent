/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('ThueDiaService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function ThueDiaService() {
        let self = this;

        self.thueDia = function (maKhachHang, maDia) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'muondia/' + maKhachHang + '/' + maDia 
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.putTraDia = function (maDia) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                url: API + 'muondia',
                data: {
                    maDia: maDia
                }
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getCountDiaThueByKhachHang = function (maKhachHang) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'thue/' +maKhachHang +'/count'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.getDiaThueByKhachHang = function (maKhachHang, limit, model) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'thue/' +maKhachHang +'/' +limit +'/' + ((model-1)*limit)
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new ThueDiaService();
});