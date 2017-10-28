/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('PhiTreService', function ($http, $q) {
    let API = 'http://http://localhost:49497/api/';
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
    }

    return new PhiTreService();
});