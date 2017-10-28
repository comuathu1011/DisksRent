/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('ThueDiaService', function ($http, $q) {
    let API = 'http://http://localhost:49497/api/';
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

        self.traDia = function (maDia) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'muondia/' + maDia
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