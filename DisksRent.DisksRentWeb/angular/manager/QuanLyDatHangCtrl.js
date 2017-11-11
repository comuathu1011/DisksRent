/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyDatHangCtrl', ($scope, DatHangService, TieuDeService, KhachHangService) => {
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
    $scope.maKhachHangSearch = undefined;
    $scope.maTieuDeSearch = undefined;
    $scope.khachHangResult = undefined;
    $scope.tieuDeResult = undefined;

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
                console.log(res)
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


    /// -----> function đặt hàng
    //Hàm tìm kiếm khách hành từ server
   
    // --> tìm kiếm khách hàng
    $scope.timKhachHangDatHang = function (event) {
        if (event.keyCode == 13) {
            timKiemKhachHang();
        }
    }

    function timKiemKhachHang() {
        if ($scope.maKhachHangSearch) {
            KhachHangService.getKhachHangDetails($scope.maKhachHangSearch).then(
                    function (response) {
                        console.log(response)
                        $scope.khachHangResult = response.data;
                    },
                    function (err) {
                        alert('Không tìm thấy khách hàng có mã số: ' + $scope.maKhachHangSearch)
                    }
           )
        }
    }

    $scope.timTieuDeDatHang = function (event) {
        if (event.keyCode == 13) {
            timTieuDe();
        }
    }

    function timTieuDe() {
        if ($scope.maTieuDeSearch) {
            TieuDeService.getTieuDeById($scope.maTieuDeSearch).then(
                function (res) {
                    console.log(res)
                    $scope.tieuDeResult = res.data;
                },
                function (err) {
                    alert('Không tìm thấy tiêu đề có mã số: ' + $scope.maTieuDeSearch);
                }
            )
        }
    }

    // --> Dat hang
    $scope.confirmDatHang = function () {
        DatHangService.datHangTieuDeDangHetDia($scope.khachHangResult.MaKhachHang, $scope.tieuDeResult.MaTieuDe).then(
            function (res) {
                console.log(res);
                if (isSortByMaTieuDe && isSortByMaKhachHang) {
                    getPaginationDatHangWithOption();
                } else {
                    getPaginationDatHang();
                }
                $('#add-booking-disk-modal').modal('hide');
            },
            function (err) {
                console.log(err);
                alert('Đặt hàng thất bại!');
            }
        )
    }
});