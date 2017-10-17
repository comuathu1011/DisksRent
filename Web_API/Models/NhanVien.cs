using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_API.Models
{
    public class NhanVien
    {
        [Key]
        public int MaNhanVien { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public bool LaQuanLy { get; set; }
    }
}