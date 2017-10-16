namespace Web_API.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VideoRentalDb : DbContext
    {
        public VideoRentalDb()
            : base("name=VideoRentalDb")
        {
        }

        public virtual DbSet<DanhMuc> DanhMucs { get; set; }
        public virtual DbSet<Dia> Dias { get; set; }
        public virtual DbSet<KhachHang> KhachHangs { get; set; }
        public virtual DbSet<NhanVien> NhanViens { get; set; }
        public virtual DbSet<TieuDe> TieuDes { get; set; }
        public virtual DbSet<DatHang> DatHangs { get; set; }
        public virtual DbSet<ThueDia> ThueDias { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DanhMuc>()
                .Property(e => e.GiaThue)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Dia>()
                .HasMany(e => e.ThueDias)
                .WithRequired(e => e.Dia)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<KhachHang>()
                .HasMany(e => e.ThueDias)
                .WithRequired(e => e.KhachHang)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<KhachHang>()
                .HasMany(e => e.DatHangs)
                .WithRequired(e => e.KhachHang)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<TieuDe>()
                .HasMany(e => e.DatHangs)
                .WithRequired(e => e.TieuDe)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ThueDia>()
                .Property(e => e.PhiTre)
                .HasPrecision(18, 0);
        }
    }
}
