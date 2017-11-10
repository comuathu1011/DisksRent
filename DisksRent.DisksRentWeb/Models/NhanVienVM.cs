using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DisksRent.DisksRentWeb.Models
{
    public class NhanVienVM
    {
        public int MaNhanVien { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public bool LaQuanLy { get; set; }
    }
}