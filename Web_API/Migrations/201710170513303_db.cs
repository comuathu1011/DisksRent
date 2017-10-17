namespace Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class db : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DanhMucs",
                c => new
                    {
                        MaDanhMuc = c.Int(nullable: false, identity: true),
                        TenDanhMuc = c.String(),
                        GiaThue = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.MaDanhMuc);
            
            CreateTable(
                "dbo.Dias",
                c => new
                    {
                        MaDia = c.Int(nullable: false, identity: true),
                        TinhTrangThue = c.Int(nullable: false),
                        MaTieuDe = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MaDia)
                .ForeignKey("dbo.TieuDes", t => t.MaTieuDe, cascadeDelete: true)
                .Index(t => t.MaTieuDe);
            
            CreateTable(
                "dbo.TieuDes",
                c => new
                    {
                        MaTieuDe = c.Int(nullable: false, identity: true),
                        Ten = c.String(),
                        MaDanhMuc = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MaTieuDe)
                .ForeignKey("dbo.DanhMucs", t => t.MaDanhMuc, cascadeDelete: true)
                .Index(t => t.MaDanhMuc);
            
            CreateTable(
                "dbo.DsChoThues",
                c => new
                    {
                        MaDia = c.Int(nullable: false),
                        MaKhachHang = c.Int(nullable: false),
                        NgayThue = c.DateTime(nullable: false),
                        NgayTra = c.DateTime(nullable: false),
                        PhiTre = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DaThanhToanPhiTre = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.MaDia, t.MaKhachHang })
                .ForeignKey("dbo.Dias", t => t.MaDia, cascadeDelete: true)
                .ForeignKey("dbo.KhachHangs", t => t.MaKhachHang, cascadeDelete: true)
                .Index(t => t.MaDia)
                .Index(t => t.MaKhachHang);
            
            CreateTable(
                "dbo.KhachHangs",
                c => new
                    {
                        MaKhachHang = c.Int(nullable: false, identity: true),
                        Ten = c.String(),
                        SoDienThoai = c.String(),
                        DiaChi = c.String(),
                    })
                .PrimaryKey(t => t.MaKhachHang);
            
            CreateTable(
                "dbo.DsDatHangs",
                c => new
                    {
                        MaKhachHang = c.Int(nullable: false),
                        MaTieuDe = c.Int(nullable: false),
                        ThuTu = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.MaKhachHang, t.MaTieuDe })
                .ForeignKey("dbo.KhachHangs", t => t.MaKhachHang, cascadeDelete: true)
                .ForeignKey("dbo.TieuDes", t => t.MaTieuDe, cascadeDelete: true)
                .Index(t => t.MaKhachHang)
                .Index(t => t.MaTieuDe);
            
            CreateTable(
                "dbo.NhanViens",
                c => new
                    {
                        MaNhanVien = c.Int(nullable: false, identity: true),
                        TenDangNhap = c.String(),
                        MatKhau = c.String(),
                        LaQuanLy = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.MaNhanVien);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DsDatHangs", "MaTieuDe", "dbo.TieuDes");
            DropForeignKey("dbo.DsDatHangs", "MaKhachHang", "dbo.KhachHangs");
            DropForeignKey("dbo.DsChoThues", "MaKhachHang", "dbo.KhachHangs");
            DropForeignKey("dbo.DsChoThues", "MaDia", "dbo.Dias");
            DropForeignKey("dbo.Dias", "MaTieuDe", "dbo.TieuDes");
            DropForeignKey("dbo.TieuDes", "MaDanhMuc", "dbo.DanhMucs");
            DropIndex("dbo.DsDatHangs", new[] { "MaTieuDe" });
            DropIndex("dbo.DsDatHangs", new[] { "MaKhachHang" });
            DropIndex("dbo.DsChoThues", new[] { "MaKhachHang" });
            DropIndex("dbo.DsChoThues", new[] { "MaDia" });
            DropIndex("dbo.TieuDes", new[] { "MaDanhMuc" });
            DropIndex("dbo.Dias", new[] { "MaTieuDe" });
            DropTable("dbo.NhanViens");
            DropTable("dbo.DsDatHangs");
            DropTable("dbo.KhachHangs");
            DropTable("dbo.DsChoThues");
            DropTable("dbo.TieuDes");
            DropTable("dbo.Dias");
            DropTable("dbo.DanhMucs");
        }
    }
}
