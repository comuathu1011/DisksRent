/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyDatHangCtrl', ($scope, DatHangService) => {
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

    let isSortByMaKhachHang = false;
    let isSortByMaTieuDe = false;


    //Luồng sự kiện chính và các event phát sinh
    // --> Luồng chính
    init();


    //-----> ! item trong ds dat hàng được chọn
    $scope.dsDatHangClick = function (datHang) {
        $scope.chiTietDatHang = datHang;
    }

    // -- > khi 1 page bị thay đổi
    $scope.dsDatHangPageChange = function () {
        if (isSortByMaKhachHang || isSortByMaTieuDe) {
            getDsDatHangWithOption();
        } else {
            getDsDatHang();
        }
        
    }

    //-- > khi người dùng chọn lọc theo mã người dùng
    $scope.sortByMaKhachHang = function (event) {
        if (event.keyCode == 13) {
            isSortByMaKhachHang = true;
            getPaginationDatHangWithOption();
        }
    }

    //-- > khi người dùng chọn lọc theo mã tiêu đề
    $scope.sortByMaTieuDe = function (event) {
        if (event.keyCode == 13) {
            isSortByMaKhachHang = true;
            getPaginationDatHangWithOption();
        }
    }

    //-- > khi người dùng bỏ lọc theo mã khách hàng
    $scope.refreshSortByMaKhachHang = function (event) {
        if (isSortByMaKhachHang) {
            isSortByMaKhachHang = !isSortByMaKhachHang;
            $scope.maKhachHangSort = '';
            if (isSortByMaTieuDe) {
                getPaginationDatHangWithOption();
            } else {
                getPaginationDatHang();
            }
        }
    }

    //-- > khi người dùng bỏ lọc theo mã tiêu đề
    $scope.refreshSortByMaKhachHang = function (event) {
        if (isSortByMaTieuDe) {
            isSortByMaTieuDe = !isSortByMaTieuDe;
            $scope.maTieuDeSort = '';
            if (isSortByMaKhachHang) {
                getPaginationDatHangWithOption();
            } else {
                getPaginationDatHang();
            }
        }
    }

    // --> khi người dùng hủy đặt hàng
    $scope.confirmHuyDatHang = function () {
        DatHangService.huyDatHang($scope.chiTietDatHang.MaKhachHang, $scope.chiTietDatHang.MaTieuDe, $scope.chiTietDatHang.ThuTu).then(
            function (res) {
                configDatHangPagination($scope.dsdatHangPagiantion.total - 1, $scope.dsdatHangPagiantion.model == 1 ? $scope.dsdatHangPagiantion.model : ($scope.dsDatHang.length > 1 ? $scope.dsdatHangPagiantion.model - 1 : $scope.dsdatHangPagiantion.model));
                if (isSortByMaKhachHang || isSortByMaTieuDe) {
                    getDsDatHangWithOption();
                } else {
                    getDsDatHang();
                }
                $('#cancel-booking-disk-modal').modal('hide');
            },
            function (err) {
                console.log(err)
            }
        )
    }


    //Hàm chức năng
    function init() {
        getPaginationDatHang();
    }

    function getPaginationDatHang() {
        DatHangService.getCountDsDatHang().then(
            function (res) {
                configDatHangPagination(res.data, 1);
                getDsDatHang();
            },
            function (err) {
                console.log(err)
            }
        )
    }

    function getDsDatHang() {
        if ($scope.dsdatHangPagiantion.total > 0) {
            DatHangService.getDsDatHang($scope.dsdatHangPagiantion.itemsPerPage, $scope.dsdatHangPagiantion.model).then(
                function (res) {
                    console.log(res)
                    configDsDatHang(res.data);
                },
                function (err) {
                    console.log(err)
                    configDsDatHang([]);
                }
            )
        }
    }

    function getPaginationDatHangWithOption() {
        DatHangService.getCountDsDatHangWithOption($scope.maKhachHangSort, $scope.maTieuDeSort).then(
            function (res) {
                configDatHangPagination(res.data, 1);
                getDsDatHangWithOption();
            },
            function (err) {
                console.log(err)
                configDatHangPagination(0, 1);
            }
        )
    }

    function getDsDatHangWithOption() {
        if ($scope.dsdatHangPagiantion.total > 0) {
            DatHangService.getDsDatHangWithOption($scope.maKhachHangSort, $scope.maTieuDeSort, $scope.dsdatHangPagiantion.itemsPerPage, $scope.dsdatHangPagiantion.model).then(
                function (res) {
                    console.log(res)
                    configDsDatHang(res.data);
                },
                function (err) {
                    console.log(err)
                    configDsDatHang([]);
                }
            )
        }
    }

    function configDsDatHang(datHangs){
        $scope.dsDatHang = datHangs;
        if (datHangs.length > 0) {
            $scope.chiTietDatHang = datHangs[0];
        } else {
            $scope.chiTietDatHang = {};
        }

    }

    function configDatHangPagination(total, model) {
        $scope.dsdatHangPagiantion = {
            model: model,
            total: total,
            itemsPerPage: 10,
            maxSize: 5
        }
    }
});