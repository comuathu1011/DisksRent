using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Web_API.Models
{
    public class DsDatHang
    {
        [Key, Column(Order = 0)]
        public int MaKhachHang { get; set; }
        [Key, Column(Order = 1)]
        public int MaTieuDe { get; set; }
        public int ThuTu { get; set; }

        [ForeignKey("MaKhachHang")]
        public virtual KhachHang KhachHang { get; set; }
        [ForeignKey("MaTieuDe")]
        public virtual TieuDe TieuDe { get; set; }
    }
}