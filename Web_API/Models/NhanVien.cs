namespace Web_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NhanVien")]
    public partial class NhanVien
    {
        [Key]
        public int MaNhanVien { get; set; }

        [Required]
        public string TenDangNhap { get; set; }

        [Required]
        public string MatKhau { get; set; }

        public bool? LaQuanLy { get; set; }
    }
}
