/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyPhiTreCtrl', ($scope, PhiTreService) => {
    $scope.maKhachHangSearch = '';
    $scope.dsPhiTre = [];
    $scope.chiTietPhiTre = {};
    $scope.dsPhiTrePaginaion = {
        model: 1,
        total: 0,
        maxSize: 5,
        itemsPerPage: 10
    }
    let isSortByMaKhachHang = false;

    //Luồng sự kiện chính
    init()

    //Hàm sự kiện chính
    function init() {
        getConfigPhiTre();
    }

    //------> Phi tre ctrl
    $scope.phiTrePageChange = function(){
        getDsPhiTre();
    }

    $scope.searchPhiTreByKhachHang = function(event){
        if(event.keyCode == 13){
            if ($scope.maKhachHangSearch.length > 0){
                isSortByMaKhachHang =  true;
                getConfigPhiTre();
            }
        }
    }
    
    $scope.refreshSearchResult = function(){
        if (isSortByMaKhachHang){
            isSortByMaKhachHang = !isSortByMaKhachHang;
            $scope.maKhachHangSearch = '';
            getConfigPhiTre();
        }
    }

    $scope.dsPhiTreSelected = function(dia){
        $scope.chiTietPhiTre = dia;
    }

    //-------------------------------------------------> Hủy phí trễ
    $scope.confirmHuyPhiTre = async function () {
        let x = await huyPhiTre($scope.chiTietPhiTre);
        console.log(x)
        configPhiTrePagination($scope.dsPhiTrePaginaion.total - 1, $scope.dsPhiTrePaginaion.model == 1 ? 1 : ($scope.dsPhiTre.length == 1 ? $scope.dsPhiTrePaginaion.model - 1 : $scope.dsPhiTrePaginaion.model));
        getDsPhiTre();
        $('#delete-phi-tre-modal').modal('hide');
    }

    function huyPhiTre(entity){
        return new Promise(
            (resolve, reject) => {
                PhiTreService.postHuyPhiTre(entity).then(
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

    //-------------------------------------------------> Thanh toán phí trễ
    $scope.confirmThanhToanPhiTre = async function () {
        let x = await thanhToanPhiTre($scope.chiTietPhiTre);
        console.log(x)
        configPhiTrePagination($scope.dsPhiTrePaginaion.total - 1, $scope.dsPhiTrePaginaion.model == 1 ? 1 : ($scope.dsPhiTre.length == 1 ? $scope.dsPhiTrePaginaion.model - 1 : $scope.dsPhiTrePaginaion.model));
        getDsPhiTre();
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

    async function getConfigPhiTre() {
        let total = await getPhiTrePagination();
        configPhiTrePagination(total, 1);
        getDsPhiTre();
        //configDsPhiTre(phiTres);
    }

    function getPhiTrePagination() {
        return new Promise(
                function(resolve, reject){
                    if (isSortByMaKhachHang){
                        PhiTreService.getCountPhiTreByKhachHang($scope.maKhachHangSearch).then(
                            function (res) {
                                resolve(res.data)
                            },
                            function (err) {
                                console.log(err)
                                reject(0)
                            }
                        )
                    }else{
                        PhiTreService.getCountPhiTre().then(
                            function (res) {
                                resolve(res.data)
                            },
                            function (err) {
                                console.log(err)
                                reject(0)
                            }
                        )
                    }
                }
            )
        
    }

    function configPhiTrePagination(total, model) {
        $scope.dsPhiTrePaginaion.model = model; 
        $scope.dsPhiTrePaginaion.total = total;
    }

    function getDsPhiTre() {
        if (isSortByMaKhachHang){
            PhiTreService.getPhiTreByKhachHang($scope.maKhachHangSearch, $scope.dsPhiTrePaginaion.itemsPerPage, $scope.dsPhiTrePaginaion.model).then(
                    function(res){
                        configDsPhiTre(res.data);
                    },
                    function (err){
                        console.log(err)
                        configDsPhiTre([])
                    }    
            )

        }else{
            PhiTreService.getPhiTre($scope.dsPhiTrePaginaion.itemsPerPage, $scope.dsPhiTrePaginaion.model).then(
                    function(res){
                        configDsPhiTre(res.data);
                    },
                    function (err){
                        console.log(err)
                        configDsPhiTre([])
                    }    
            )
        }
    }

    function configDsPhiTre(phiTres){
        $scope.dsPhiTre = phiTres;
        if($scope.dsPhiTre.length > 0){
            $scope.chiTietPhiTre = $scope.dsPhiTre[0];
        }else{
            $scope.chiTietPhiTre = {};
        }
    }

});