﻿/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyXuatBaoCaoCtrl', ($scope, DiaService, KhachHangService, ThueDiaService, PhiTreService, TieuDeService) => {
    $scope.sortKhachHang = 'all';
    $scope.listKhachHang = [];
    /*
        Đối tượng chứa thông tin của khách hàng được click chọn
        Mặc định là rỗng khi khkai báo,  sẽ được gán lại là khách hàng đầu tiên trong listKhachHang
        Sau mỗi lần  click table khach hảng thỉ đối tượng này sẽ được chọn lại
    */
    $scope.khachHangSelected;
    /*
       Cấu hình phân trang danh sách khách hàng
       model: vị trí hiện tại của trang chứa danh sách khách hàng
       maxPage: tổng số lượng lớn nhất các phân trang bảng được hiển thị\
       perPage: tổng item xuất hiện trên 1 page
       totalItem: tổng số lượng item có thể có khi thực hiện các sevice
   */
    $scope.khachHangPagination = {
        model: 1,
        maxPage: 5,
        perPage: 10,
        totalItem: $scope.listKhachHang.lenght
    };
    $scope.soLuongDiaDaThue;
    $scope.dsDiaThue;
    $scope.dsDiaThuePaginaion = {
        model: 1,
        maxSize: 10,
        total: 0,
        itemsPerPage: 10
    }
    $scope.dsPhiTre;

    $scope.dsPhiTrePaginaion = {
        model: 1,
        maxSize: 10,
        total: 0,
        itemsPerPage: 10
    }

    //Luồng sự kiện
    init();

    $scope.listKhachHangClicked = function (khachHang) {
        $scope.khachHangSelected = khachHang;
        configDsDiaThue();
        configDsPhiTre();
    }

    $scope.khachHangPageChange = function () {
        getListKhachHang();
    }

    //-- > hàm thực hiện khi chức năng sort thay đổi
    $scope.sortKhachHangChange = function () {
        console.log($scope.sortKhachHang)
        loadKhachHang();
    }

    $scope.diaThuePageChange = function () {
        getDsDiaThue();
    }

    $scope.phiTrePageChange = function () {
        getDsPhiTre();
    }

    //hàm chức năng
    function init() {
        loadKhachHang();
        configTieuDe();
    }

    function loadKhachHang() {
        //Load pagination
        switch ($scope.sortKhachHang) {
            case 'all': {
                KhachHangService.getCountKhachHang().then(
                function (response) {
                    console.log(response);
                    $scope.khachHangPagination.totalItem = response.data;
                    getListKhachHang();
                },
                function (err) {
                    console.log(err);
                }
            )
                break;
            }
            case 'tratre': {
                KhachHangService.getCountKhachHangTraTre().then(
                function (response) {
                    console.log(response);
                    $scope.khachHangPagination.totalItem = response.data;
                    getListKhachHang();
                },
                function (err) {
                    console.log(err);
                })
                break;
            }
            case 'phino': {
                KhachHangService.getCountKhachHangCoNo().then(
                function (response) {
                    console.log(response);
                    $scope.khachHangPagination.totalItem = response.data;
                    getListKhachHang();
                },
                function (err) {
                    console.log(err);
                })
                break;
            }
        }
        
    }

    function getListKhachHang() {
        switch ($scope.sortKhachHang) {
            case 'all': {
                KhachHangService.getKhachHangByLimitAndOffset($scope.khachHangPagination.perPage, $scope.khachHangPagination.model).then(
                    function (response) {
                        console.log(response)
                        $scope.listKhachHang = response.data;
                        $scope.khachHangSelected = $scope.listKhachHang[0];
                        $scope.listKhachHangClicked($scope.khachHangSelected);
                    },
                    function (err) {
                        console.log(err)
                        $scope.listKhachHang = [];
                        $scope.khachHangSelected = {};
                    }
                )
                break;
            }
            case 'tratre': {
                KhachHangService.getKhachHangTraTre($scope.khachHangPagination.perPage, $scope.khachHangPagination.model).then(
                    function (response) {
                        console.log(response)
                        $scope.listKhachHang = response.data;
                        $scope.khachHangSelected = $scope.listKhachHang[0];
                        $scope.listKhachHangClicked($scope.khachHangSelected);
                    },
                    function (err) {
                        console.log(err)
                        $scope.listKhachHang = [];
                        $scope.khachHangSelected = {};
                    }
                )
                break;
            }
            case 'phino': {
                KhachHangService.getKhachHangCoNo($scope.khachHangPagination.perPage, $scope.khachHangPagination.model).then(
                    function (response) {
                        console.log(response)
                        $scope.listKhachHang = response.data;
                        $scope.khachHangSelected = $scope.listKhachHang[0];
                        $scope.listKhachHangClicked($scope.khachHangSelected);
                    },
                    function (err) {
                        console.log(err)
                        $scope.listKhachHang = [];
                        $scope.khachHangSelected = {};
                    }
                )
                break;
            }
        }
        
    }

    function configDsDiaThue() {
        ThueDiaService.getCountDiaThueByKhachHang($scope.khachHangSelected.MaKhachHang).then(
            function (response) {
                getTongDiaDaThue(response.data);
                if (response.data > 0) {
                    configDiaThuePagination(response.data);
                    getDsDiaThue();
                } else {

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

    function configDiaThuePagination(total) {
        $scope.dsDiaThuePaginaion = {
            model: 1,
            maxSize: 10,
            total: total,
            itemsPerPage: 10
        }
    }

    function getDsDiaThue() {
        if ($scope.dsDiaThuePaginaion.total > 0) {
            ThueDiaService.getDiaThueByKhachHang($scope.khachHangSelected.MaKhachHang, $scope.dsDiaThuePaginaion.itemsPerPage, $scope.dsDiaThuePaginaion.model).then(
                function (response) {
                    if (response.data.length > 0) {
                        $scope.dsDiaThue = response.data;
                        console.log($scope.dsDiaThue)
                    } else {
                        $scope.dsDiaThue = [];
                    }
                },
                function (err) {
                    $scope.dsDiaThue = [];
                }
            )
        }
    }

    function configDsPhiTre() {
        PhiTreService.getCountPhiTreByKhachHang($scope.khachHangSelected.MaKhachHang).then(
            function (response) {
                console.log(response)
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
            PhiTreService.getPhiTreByKhachHang($scope.khachHangSelected.MaKhachHang, $scope.dsPhiTrePaginaion.itemsPerPage, $scope.dsPhiTrePaginaion.model).then(
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

    function getTongDiaDaThue(total) {
        $scope.soLuongDiaDaThue = total;
    }


    //Tiêu đề module
    $scope.dsTieuDe = [];
    $scope.tieuDeSelected = {};
    $scope.dsTieuDePagination = {
        total: 0,
        itemsPerPage: 10,
        maxSize: 5,
        model: 1
    }
    $scope.thongTinTieuDe = {
        tongSoDia: 0,
        soDiaDuocThue: 0,
        soDiaDangCho: 0,
        soDiaConLai: 0
    }

    $scope.tieuDePageChange = function(){
        getTieuDe();
    }

    $scope.tieuDeRowClick = function(tieuDe){
        $scope.tieuDeSelected = tieuDe;
        getThongTinTieuDe();
    }

    async function configTieuDe(){
        let total = await getPaginationTieuDe();
        configTieuDePagination(total, 1);
        getTieuDe();
    }

    function getTieuDe() {
        console.log("Load tiêu đề")
        TieuDeService.getTieuDeByLimitAndOffset($scope.dsTieuDePagination.itemsPerPage, $scope.dsTieuDePagination.model).then(
                    function (response) {
                        loadTieuDe(response.data);      
                    },
                    function (err) {
                        loadTieuDe([]) ;
                    }
                )
    }

    function loadTieuDe(tieuDes){
        $scope.dsTieuDe = tieuDes;
        if ($scope.dsTieuDe.length > 0){
            $scope.tieuDeSelected = $scope.dsTieuDe[0];
        }else{
            $scope.tieuDeSelected = {};
        }
        getThongTinTieuDe();
        console.log($scope.tieuDeSelected )
    }
    
   
    function getPaginationTieuDe() {
        return new Promise(
            (resolve, reject) => {
                TieuDeService.getCountTieuDe().then(
                    function (response) {
                        resolve(response.data) 
                    },
                    function (err) {
                        reject(0)
                    }
                )
            }
        )
    }
    
    function configTieuDePagination(total, model) {
        $scope.dsTieuDePagination = {
            total: total,
            model: model,
            maxSize: 5,
            itemsPerPage: 10
        }
    }

    function getThongTinTieuDe(){
        DiaService.getCountDiaOfTieuDe($scope.tieuDeSelected.MaTieuDe).then(
            function(res){
                $scope.thongTinTieuDe.tongSoDia  = res.data;
                getSecondaryThongTinTieuDe();
            },
            function(err){
                scope.thongTinTieuDe.tongSoDia  = 0;
                getSecondaryThongTinTieuDe();
            }
        )
    }

    function getSecondaryThongTinTieuDe(){
        TieuDeService.getCountDiaTieuDeDaThue($scope.tieuDeSelected.MaTieuDe).then(
            function(res){
                $scope.thongTinTieuDe.soDiaDuocThue  = res.data;

                TieuDeService.getCountDiaTieuDeDangChoKhach($scope.tieuDeSelected.MaTieuDe).then(
                    function(res){
                        $scope.thongTinTieuDe.soDiaDangCho  = res.data;
                        $scope.thongTinTieuDe.soDiaConLai = $scope.thongTinTieuDe.tongSoDia - $scope.thongTinTieuDe.soDiaDuocThue - $scope.thongTinTieuDe.soDiaDangCho;
                    },
                    function (err){
                        $scope.thongTinTieuDe.soDiaDangCho  = 0
                        $scope.thongTinTieuDe.soDiaConLai = $scope.thongTinTieuDe.tongSoDia - $scope.thongTinTieuDe.soDiaDuocThue - $scope.thongTinTieuDe.soDiaDangCho;
                    }
                )
            },
            function (err){
                $scope.thongTinTieuDe.soDiaDuocThue  = 0
                $scope.thongTinTieuDe.soDiaConLai = $scope.thongTinTieuDe.tongSoDia - $scope.thongTinTieuDe.soDiaDuocThue - $scope.thongTinTieuDe.soDiaDangCho;
            }
        )

        

        
    }
});