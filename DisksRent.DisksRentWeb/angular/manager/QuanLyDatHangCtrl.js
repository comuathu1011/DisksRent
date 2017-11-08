/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyDatHangCtrl', ($scope) => {
    $scope.maKhachHangSort = '';
    $scope.maTieuDeSort = '';
    $scope.dsDatHang = [];
    $scope.chiTietDatHang = {};
    $scope.dsdatHangPagiantion = {
        model: 1,
        total: 0,
        itemsPerPage: 10,
        maxSize: 5
    }
    $scope.maKhachHangSearch = '';
    $scope.maTieuDeSearch = '';
    $scope.khachHangResult = {};
    $scope.tieuDeResult = {}
});