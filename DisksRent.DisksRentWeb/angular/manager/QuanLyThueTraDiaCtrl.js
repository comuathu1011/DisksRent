/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyThueTraDiaCtrl', ($scope, KhachHangService, ThueDiaService, PhiTreService) => {
    //Từ khóa tìm kiếm khách hàng
    $scope.maKhachHangKeyword = '';
    //khách hàng hiện tại tìm kiếm được
    $scope.khachHang = {};
    //Danh sách dĩa thuê của khách hàng
    $scope.dsDiaThue = [];
    //Danh sách phí trễ của khách hàng
    $scope.dsPhiTre = [];
    //Chi tiết 1 phí trễ của người thuê
    $scope.chiTietPhiTre = {};
    //Phân trang sánh đĩa thuê
    $scope.dsDiaThuePaginaion = {
        model: 1,
        maxSize: 10,
        total: 0,
        itemsPerPage: 10
    }

    //Phan tranh danh sách phí trễ
    $scope.dsPhiTrePaginaion = {
        model: 1,
        maxSize: 10,
        total: 0,
        itemsPerPage: 10
    }

    //Các luồng sự kiện chính
    //Sự kiện khi người dùng nhấn enter trong khi nhập mã khách hàng
    $scope.timKiemKhachHangKeycode = function (event) {
        if (event.keyCode == 13) {
            timKiemKhachHang();
        }
    }

    //Sự kiện khi người dùng nhấn nút tìm kiếm
    $scope.timKiemKhachHangBtn = function () {
        timKiemKhachHang();
    }

    //Hàm tìm kiếm khách hành từ server
    function timKiemKhachHang() {
        if ($scope.maKhachHangKeyword) {
            KhachHangService.getKhachHangDetails($scope.maKhachHangKeyword).then(
                    function (response) {
                        $scope.khachHang = response.data;
                        configDsDiaThue();
                        configDsPhiTre();
                    },
                    function (err) {
                        alert('Không tìm thấy khách hàng có mã số: ' + $scope.maKhachHangKeyword)
                    }
           )
        }
    }

    //-------------------------------------------------------> Đĩa thuê controller
    $scope.diaThuePageChange = function () {
        getDsDiaThue();
    }
    
    function configDsDiaThue() {
        ThueDiaService.getCountDiaThueByKhachHang($scope.khachHang.MaKhachHang).then(
            function (response) {
                if(response.data > 0){
                    configDiaThuePagination(response.data);
                    getDsDiaThue();
                }else{
                    configDiaThuePagination(0);
                    $scope.dsDiaThue = [];
                }
                
            },
            function (err) {
                configDiaThuePagination(0);
                $scope.dsDiaThue = [];
                console.log(err)
            }
        )
    }

    function getDsDiaThue() {
        if ($scope.dsDiaThuePaginaion.total > 0) {
            ThueDiaService.getDiaThueByKhachHang($scope.khachHang.MaKhachHang, $scope.dsDiaThuePaginaion.itemsPerPage, $scope.dsDiaThuePaginaion.model).then(
                function (response) {
                    if (response.data.length > 0) {
                        $scope.dsDiaThue = response.data;
                    } else {
                        $scope.dsDiaThue = [];
                    }
                    console.log(response.data)
                },
                function (err) {
                    $scope.dsDiaThue = [];
                    console.log(err)
                }
            )
        }
    }

    function configDiaThuePagination(total) {
        $scope.dsDiaThuePaginaion = {
            model: 1,
            maxSize: 10,
            total: total,
            itemsPerPage: 10
        }
    }

    //---------------------------------------------------> Phí trễ controller

    $scope.dsPhiTreSelected = function (dia) {
        $scope.chiTietPhiTre = dia;
    }

    $scope.phiTrePageChange = function () {
        getDsPhiTre();
    }

    function configDsPhiTre() {
        PhiTreService.getCountPhiTreByKhachHang($scope.khachHang.MaKhachHang).then(
            function (response) {
                if (response.data > 0) {
                    configPhiTrePagination(response.data);
                    getDsPhiTre();
                } else {
                    configPhiTrePagination(0);
                    $scope.dsPhiTre = [];
                }

            },
            function (err) {
                configPhiTrePagination(0);
                $scope.chiTietPhiTre = {};
                $scope.dsPhiTre = [];
                console.log(err)
            }
        )
    }

    function getDsPhiTre() {
        if ($scope.dsPhiTrePaginaion.total > 0) {
            PhiTreService.getPhiTreByKhachHang($scope.khachHang.MaKhachHang, $scope.dsPhiTrePaginaion.itemsPerPage, $scope.dsPhiTrePaginaion.model).then(
                function (response) {
                    if (response.data.length > 0) {
                        $scope.dsPhiTre = response.data;
                        $scope.chiTietPhiTre = $scope.dsPhiTre[0];
                    } else {
                        $scope.dsPhiTre = [];
                        $scope.chiTietPhiTre = {};
                    }
                    console.log(response.data)
                },
                function (err) {
                    $scope.dsPhiTre = [];
                    $scope.chiTietPhiTre = {};
                    console.log(err)
                }
            )
        }
    }

    function configPhiTrePagination(total) {
        $scope.dsPhiTrePaginaion = {
            model: 1,
            maxSize: 10,
            total: total,
            itemsPerPage: 10
        }
    }

});