using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Web_API.Models
{
    public class VideoRentalDb :DbContext
    {
        public DbSet<KhachHang> KhachHangs { get; set; }
        public DbSet<NhanVien> NhanViens { get; set; }
        public DbSet<DanhMuc> DanhMucs { get; set; }
        public DbSet<TieuDe> TieuDes { get; set; }
        public DbSet<Dia> Dias { get; set; }
        public DbSet<DsChoThue> DsChoThue { get; set; }
        public DbSet<DsDatHang> DsDatHang { get; set; }
    }
}