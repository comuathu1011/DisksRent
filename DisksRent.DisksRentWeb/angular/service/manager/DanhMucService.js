/// <reference path="../../manager/ManagerApp.js" />
ManagerApp.factory('DanhMucService', function ($http, $q) {
    let API = 'http://localhost:49497/api/';
    function DanhMucService() {
        let self = this;

        self.getAllDanhMuc = function (maTieuDe) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'danhmuc'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        self.postDanhMuc = function (danhMuc) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: API + 'danhmuc',
                data: danhMuc
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

    return new DanhMucService();
});