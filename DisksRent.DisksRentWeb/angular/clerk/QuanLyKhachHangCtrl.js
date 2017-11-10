/// <reference path="../service/manager/KhachHangService.js" />
/// <reference path="ClerkApp.js" />
ClerkApp.controller('QuanLyKhachHangCtrl', function ($scope, $timeout, KhachHangService) {
    
    //Danh sách khách hang lấy được từ cơ sở dữ liệu, phân trang được quyết định trong khachHangPagination
    $scope.listKhachHang = [
        {
            MaKhachHang: '121',
            Ten: 'Hồ Quốc Vửng saf',
            SoDienThoai: '01217432834',
            DiaChi: 'Phường 5, Quận Gò Vấp, Tp Hồ Chí Minh'
        }
    ];

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

    /*
        scope định nghĩa 1 đối tượng khách hàng mới, mặc định tất cả trường dữ liệu điều rỗng
        Ten: tên khách hàng,
        SoDienThoai: số điện thoại liên lạc
        DiaChi: địa chỉ của khách hàng
    */
    $scope.newKhachHang = {
        Ten: '',
        SoDienThoai: '',
        DiaChi: ''
    }


    /*
        Đối tượng chứa thông tin của khách hàng được click chọn
        Mặc định là rỗng khi khkai báo,  sẽ được gán lại là khách hàng đầu tiên trong listKhachHang
        Sau mỗi lần  click table khach hảng thỉ đối tượng này sẽ được chọn lại
    */
    $scope.khachHangSelected = {}

    //Biến tạm lưu KhachHang khi KhachHang tien hanh update

    //Biến tạm cờ lưu đã trạng thái update, khóa các filed
    $scope.updateFiled = true;
    $scope.updateFiledName = 'Sửa thông tin';

    //
    $scope.deleteMess = '';
    $scope.addMess = {
        style: '',
        mess: ''
    }

    /*
        Các luồng sự kiện $scope.khachHangSelected
    */
    //Luồng sữ kiện chính khi page load
    init();

    /*
        Sự kiện diễn ra khi người dùng click chọn khách hàng trên bảng danh sách.
        Khách hàng được chọn sẽ được gán vào đối tượng 
    */
    $scope.listKhachHangClicked = function (khachHang) {
        $scope.khachHangSelected = khachHang;
    }

    $scope.khachHangPageChange = function (){
        getListKhachHang();
    }

    /*
        Sự kiện diễn ra khi người dùng xác nhận xóa khách hàng đã chọn. Hàm gửi mã khách hàng lên Server
    */
    $scope.confirmXoaKhachHang = function () {
        KhachHangService.deleteKhachHang($scope.khachHangSelected.MaKhachHang).then(
            function (response) {
                console.log(response);
                if (response.data) {
                    $scope.deleteMess = 'Thành công';

                    $timeout(function () {
                        $('#delete-customer-modal').modal('hide');
                        $scope.deleteMess = '';
                        loadKhachHang();
                    }, 1000);
                } else {
                    $scope.deleteMess = 'Thất bại';
                }
            },
            function (err) {
                $scope.deleteMess = 'Thất bại';
                console.log(err)
            })
    }

    /*
        Sự kiện diễn ra khi người dùng không muốn thêm 1 khách hàng nửa và nhấn nút Đóng trên modal thêm khách hàng
        Hàm thực hiện reset lại các giá trị mặc định của đối tượng newKhachHang
    */
    $scope.confirmThemKhachHang = function () {
        //Kiễm tra dữ liệu hợp lệ
        if (checkKhachHang()) {
            //Gửi lên server
            KhachHangService.postKhachHang($scope.newKhachHang).then(
                function (response) {
                    console.log(response);
                    $scope.addMess.style = 'callout-success';
                    $scope.addMess.mess = 'Thành công';

                    $timeout(function () {
                        $scope.addMess.style = '';
                        $scope.addMess.mess = '';
                        $('#add-customer-modal').modal('hide');
                        loadKhachHang();
                    }, 1500);
                },
                function (err) {
                    console.log(err);
                    $scope.addMess.style = 'callout-danger';
                    $scope.addMess.mess = 'Thất bại';
                }
            )
        } else {
            //Thông báo lỗi
        }
    }

    /*
        Sự kiện diễn ra khi người dùng không muốn thêm 1 khách hàng nửa và nhấn nút Đóng trên modal thêm khách hàng
        Hàm thực hiện reset lại các giá trị mặc định của đối tượng newKhachHang
    */
    $scope.resetThemKhachHang = function () {
        $scope.newKhachHang = {
            Ten: '',
            SoDienThoai: '',
            DiaChi: ''
        }
    }


    $scope.updateClicked = function () {
        controlBtnUpdate();
    }

    $scope.cancelUpdate = function () {
        controlBtnUpdate();
    }

    
    /*
        Hàm xử lý logic, hỗ trợ
    */
    function init() {
        loadKhachHang();
    }

    function loadKhachHang() {
        //Load pagination
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
    }
    function getListKhachHang() {
        KhachHangService.getKhachHangByLimitAndOffset($scope.khachHangPagination.perPage, $scope.khachHangPagination.model).then(
            function (response) {
                console.log(response)
                $scope.listKhachHang = response.data;
                $scope.khachHangSelected = $scope.listKhachHang[0];
            },
            function (err) {
                console.log(err)
                $scope.listKhachHang = [];
                $scope.khachHangSelected = {};
            }
        )
    }

    //Tổng kiểm tra các điều kiện khách hàng
    function checkKhachHang(action) {
        let flash = true;
        if (!checkTenKhachHang(action)) {
            flash = false;
        }
        if (!checkSDTKhachHang(action)) {
            flash = false;
        }
        if (!checkDiaChiKhachHang(action)) {
            flash = false;
        }

        return flash;
    }

    function checkTenKhachHang(action) {
        if (action == 'new') {
            if ($scope.newKhachHang.Ten.lenght <= 0)
                return false;
        } else {
            if ($scope.khachHangSelected.Ten.lenght <= 0)
                return false;
        }
        return true;
    }

    function checkSDTKhachHang(action) {
        if (action == 'new') {
            if ($scope.newKhachHang.SoDienThoai.lenght <= 0)
                return false;
        } else {
            if ($scope.khachHangSelected.SoDienThoai.lenght <= 0)
                return false;
        }
        return true;
    }

    function checkDiaChiKhachHang(action) {
        if (action == 'new') {
            if ($scope.newKhachHang.DiaChi.lenght <= 0)
                return false;
        } else {
            if ($scope.khachHangSelected.DiaChi.lenght <= 0)
                return false;
        }
        return true;
    }

    function controlBtnUpdate() {
        if ($scope.updateFiled == true) {
            //update
            $scope.updateFiledName = 'Cập nhật thông tin';
        } else {
            $scope.updateFiledName = 'Sửa thông tin';
            comfirmUpdate();
        }

        $scope.updateFiled = !$scope.updateFiled;
    }

    function comfirmUpdate() {
        KhachHangService.putKhachHang($scope.khachHangSelected).then(
            function (response) {
                console.log(response)
            },
            function (err) {
                console.log(err);
                alert('Lỗi: ' +err.data)
            });
    }
});