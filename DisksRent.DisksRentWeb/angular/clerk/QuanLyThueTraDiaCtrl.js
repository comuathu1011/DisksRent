/// <reference path="ClerkApp.js" />
ManagerApp.controller('QuanLyThueTraDiaCtrl', ($scope, KhachHangService, ThueDiaService, PhiTreService, DiaService) => {
    //Từ khóa tìm kiếm khách hàng
    $scope.maKhachHangKeyword = '';
    //khách hàng hiện tại tìm kiếm được
    $scope.khachHang = undefined;
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

    $scope.tongPhiTre = 0;
    $scope.tinhTongPhiTre = function(action){
        $scope.tongPhiTre = 0;
        if (action === 1){
            for (let i=0; i<$scope.dsDiaThue.length; i++){
                if ($scope.dsDiaThue[i].isDelete){
                    $scope.tongPhiTre += $scope.dsDiaThue[i].PhiTre;
                }
            }
        }else{
            for (let i=0; i<$scope.dsPhiTre.length; i++){
                if ($scope.dsPhiTre[i].isDelete){
                    $scope.tongPhiTre += $scope.dsPhiTre[i].PhiTre;
                }
            }
        }
        
    }

    $scope.confirmTraDia = async function () {
        for (let dia in $scope.dsDiaThue) {
            if ($scope.dsDiaThue[dia].isDelete){
                let x = await traDia($scope.dsDiaThue[dia].MaDia);
            }
        }
        configDsDiaThue();
        configDsPhiTre();
        $('#delete-dia-thue-modal').modal('hide');
    }

    $scope.confirmTraDiaCoPhiTre = async function () {
        for (let dia in $scope.dsDiaThue) {
            if ($scope.dsDiaThue[dia].isDelete){
                let x = await traDia($scope.dsDiaThue[dia].MaDia);
            }
        }
        for (let dia in $scope.dsDiaThue) {
            if ($scope.dsDiaThue[dia].isDelete){
                let x = await thanhToanPhiTre($scope.dsDiaThue[dia]);
                console.log(x)
            }
        }
        configDsDiaThue();
        $('#delete-dia-thue-modal').modal('hide');
    }


    function traDia(MaDia){
        return new Promise(
            (resolve, reject) => {
                ThueDiaService.putTraDia(MaDia).then(
                    function (response) {
                        resolve(response);
                    },
                    function (err) {
                        reject(err);
                    }
                )
            }
        );
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
                        tinhPhiTre();
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

    function tinhPhiTre(){
        for (let i=0; i<$scope.dsDiaThue.length; i++){
            let NgayPhaiTra = new Date($scope.dsDiaThue[i].NgayPhaiTra);
            let currentDate = new Date();
            if (NgayPhaiTra.getTime() < currentDate.getTime()){
                $scope.dsDiaThue[i].PhiTre = 100000;
            }
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


    //-------------------------------------------------> Thanh toán phí trễ
    $scope.confirmThanhToanPhiTre = async function () {
        for (let dia in $scope.dsPhiTre) {
            if ($scope.dsPhiTre[dia].isDelete){
                let x = await thanhToanPhiTre($scope.dsPhiTre[dia]);
                console.log(x)
            }
        }
        configDsPhiTre();
        $('#pay-phi-tre-modal').modal('hide');
    }

    function thanhToanPhiTre(entity){
        return new Promise(
            (resolve, reject) => {
                PhiTreService.postThanhToanPhiTre(entity).then(
                    function (response) {
                        resolve(response);
                    },
                    function (err) {
                        reject(err);
                    }
                )
            }
        );
    }

    function configDsPhiTre() {
        PhiTreService.getCountPhiTreByKhachHang($scope.khachHang.MaKhachHang).then(
            function (response) {
                if (response.data > 0) {
                    configPhiTrePagination(response.data);
                    getDsPhiTre();
                } else {
                    configPhiTrePagination(0);
                    $scope.chiTietPhiTre = {};
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

    function reConfigPhiTre(){
        if ($scope.dsPhiTre.length == 1){
            $scope.dsPhiTrePaginaion.model --;
            $scope.dsPhiTrePaginaion.total --;
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

    //---------------------------------------------> Thue đĩa
    $scope.maDiaThue = undefined;
    $scope.diaFindResult = undefined;

    $scope.timDia = function(event){
        if (event.keyCode === 13){
            //Nhấn phím enter
            if ($scope.maDiaThue){
                DiaService.getDiaById($scope.maDiaThue).then(
                    function(response){
                        console.log(response)
                        $scope.diaFindResult = response.data;
                    },
                    function(err){
                        console.log(err);
                        $scope.diaFindResult = undefined;
                        alert('Không tìm thấy đĩa tương ứng')
                    }
                )
            }
        }
    }

    $scope.confirmThueDia = function(){
        ThueDiaService.thueDia($scope.khachHang.MaKhachHang, $scope.diaFindResult.MaDia).then(
            function(response){
                console.log(response);
                $('#thue-dia-modal').modal('hide');
                configDsDiaThue();
                configDsPhiTre();
            },
            function(err){
                console.log(err);
                alert('Lỗi: ' + err.data)
            }
        )
    }
});