/// <reference path="ManagerApp.js" />
ManagerApp.controller('QuanLyTieuDeVaDiaCtrl', ($scope, TieuDeService, DiaService, DanhMucService) => {
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

    $scope.soLuongDiaMoi = 0;

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

    $scope.confirmDeletaTitle = function(){
        TieuDeService.deleteTieuDe($scope.tieuDeSelected.MaTieuDe).then(
            function(response){
                console.log(response);
                configTieuDePagination($scope.dsTieuDePagination.total - 1, $scope.dsTieuDePagination.model);
                getTieuDe();

                $('#delete-title-modal').modal('hide');
            },
            function(err){
                console.log(err);
                alert('Lỗi');
            }
        )
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

    $scope.confirmDeleteDisk = function(){
        DiaService.deleteDia($scope.disSelected.MaDia).then(
            function(response){
                console.log(response);
                configDiaPagination($scope.dsDiaPagination.total - 1, $scope.dsDiaPagination.model);
                getDia();

                $('#delete-disk-modal').modal('hide');
            },
            function(err){
                alert('Lỗi')
                console.log(err)
            }
        )
    }

    $scope.addNewDiskToTitle = function(){
        DiaService.postDia($scope.tieuDeSelected.MaTieuDe, 1).then(
            function(response){
                $scope.newDia = response.data;
                getPaginationDia();
            },
            function(err){
                $scope.newDia['MaDia'] = 'Lỗi'.
                console.log(err)
            }
        )
    }


    $scope.addMultiNewDiskToTitle = async function(){
        for (let i=0; i<$scope.soLuongDiaMoi; i++){
            await addMultiNewDiskToTitle();
        }
        $('#add-multi-disk-for-title-modal').modal('hide');
        configDiaPagination($scope.dsDiaPagination.total + $scope.soLuongDiaMoi, $scope.dsDiaPagination.model);
        getDia();
    }

    function addMultiNewDiskToTitle(){
        return new Promise(
            function (resolve, reject){
                DiaService.postDia($scope.tieuDeSelected.MaTieuDe, 1).then(
                       function(response){
                           console.log(response)
                           resolve(response)
                       },
                       function(err){
                           console.log(err)
                           reject(err)
                       }
                   )
            }
        )
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
        console.log(dias)
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

    $scope.confirmLuuTieuDe = function(){
        TieuDeService.postTieuDe($scope.newTile).then(
            function(response){
                configTieuDePagination($scope.dsTieuDePagination.total + 1, $scope.dsTieuDePagination.model);
                getTieuDe();
                $('#add-title-modal').modal('hide');
            },
            function(err){
                alert('Thất bại');
                console.log(err)
            }
        )
    }

});