using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Web_API.Models
{
    public class DsChoThue
    {
        [Key, Column(Order = 0)]
        public int MaDia { get; set; }
        [Key, Column(Order = 1)]
        public int MaKhachHang { get; set; }
        public DateTime NgayThue { get; set; }
        public DateTime NgayPhaiTra { get; set; }
        public DateTime NgayThucTra { get; set; }
        public decimal PhiTre { get; set; }
        public bool DaThanhToanPhiTre { get; set; }

        [ForeignKey("MaDia")]
        public virtual Dia Dia { get; set; }
        [ForeignKey("MaKhachHang")]
        public virtual KhachHang KhachHang { get; set; }

    }
}