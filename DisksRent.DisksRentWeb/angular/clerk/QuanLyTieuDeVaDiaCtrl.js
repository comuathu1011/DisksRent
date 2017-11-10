/// <reference path="ClerkApp.js" />
ClerkApp.controller('QuanLyTieuDeVaDiaCtrl', ($scope, TieuDeService, DiaService, DanhMucService) => {
    //------> New title config
    $scope.newTile = {
        MaDanhMuc: undefined,
        Ten: undefined,
    }

    //------> Tieu de config
    $scope.dsTieuDe = [];
    $scope.tieuDeSelected = {};
    $scope.dsTieuDePagination = {
        total: 0,
        model: 1,
        maxSize: 5,
        itemsPerPage: 10
    }

    //------> Danh sách dia config
    $scope.dsDia = [];
    $scope.disSelected = {};
    $scope.dsDiaPagination = {
        total: 0,
        model: 1,
        maxSize: 5,
        itemsPerPage: 10
    }


    //---------> Danh muc config
    $scope.dsDanhMuc;
    $scope.danhMucIdSelected;
    $scope.danhMucSelected;

    $scope.newDia = {};

    //Main flow
    loadDanhMuc();
    init();



    //Feature function
    async function init() {
        
        let total = await getPaginationTieuDe();
        configTieuDePagination(total, 1);
        getTieuDe();
    }

    //Event action
    //------------------------>Tieu de event
    $scope.tieuDePageChange = function () {
        getTieuDe();
    }

    $scope.tieuDeRowClick = function(tieuDe){
        $scope.tieuDeSelected = tieuDe;
        getPaginationDia();
    }

   
    async function getTieuDe() {
        TieuDeService.getTieuDeByLimitAndOffset($scope.dsTieuDePagination.itemsPerPage, $scope.dsTieuDePagination.model).then(
                    function (response) {
                        loadTieuDe(response.data);
                        getPaginationDia();
                      
                    },
                    function (err) {
                        loadTieuDe([]) 
                    }
                )
    }

    function loadTieuDe(tieuDes){
        $scope.dsTieuDe = tieuDes;
        if ($scope.dsTieuDe.length > 0){
            $scope.tieuDeSelected = $scope.dsTieuDe[0];
        }
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

    //Event action
    //------------------------>Dia event
    $scope.diaPageChange = async function () {
        getDia();
    }

    $scope.diaRowClick = function(dia){
        $scope.disSelected = dia;
    }




    function getDia() {
        DiaService.getDiaOfTieuDeBySizeOffset($scope.tieuDeSelected.MaTieuDe, $scope.dsDiaPagination.itemsPerPage, $scope.dsDiaPagination.model).then(
                    function (response) {
                        loadDia(response.data) 
                    },
                    function (err) {
                        loadDia([]) 
                    }
                )
    }

    function loadDia(dias){
        $scope.dsDia = dias;
        if ($scope.dsDia.length > 0){
            $scope.disSelected = $scope.dsDia[0];
        }
    }


    function getPaginationDia() {
        
        DiaService.getCountDiaOfTieuDe($scope.tieuDeSelected.MaTieuDe).then(
                    function (response) {
                        configDiaPagination(response.data, 1);
                        getDia();
                    },
                    function (err) {
                        configDiaPagination(0, 1) 
                    }
                )
    }

    function configDiaPagination(total, model) {
        $scope.dsDiaPagination = {
            total: total,
            model: model,
            maxSize: 5,
            itemsPerPage: 10
        }
    }


    //----------------------------> Danh mục model
    function loadDanhMuc(){
        DanhMucService.getAllDanhMuc().then(
            function(response){
                $scope.dsDanhMuc = response.data;
                if ($scope.dsDanhMuc.length > 0){
                    $scope.newTile.MaDanhMuc = $scope.dsDanhMuc[0].MaDanhMuc;
                    $scope.danhMucSelected = $scope.dsDanhMuc[0];
                }
            },
            function(err){
                $scope.dsDanhMuc;
            }
        )
    }

});