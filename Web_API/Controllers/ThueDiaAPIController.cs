using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class ThueDiaAPIController : ApiController
    {
        VideoRentalDb db;
        PhiTreAPIController phiTreController;
        DatHangController datHangController;
        int soNgayChoThueMoiDia = 7; //số ngày cho thuê của mỗi đĩa
        
        public ThueDiaAPIController()
        {
            db = new VideoRentalDb();
            phiTreController = new PhiTreAPIController();
            datHangController = new DatHangController();
        }

        //cho thue
        [Route("api/muondia/{maKhachHang}/{maDia}")]
        public IHttpActionResult PostThueDia(int maKhachHang, int maDia)
        {
            if (maDia < 0 || maKhachHang < 0) return NotFound();
            var model = new DsChoThue
            {
                MaKhachHang = maKhachHang,
                MaDia = maDia,
                NgayThue = DateTime.Now,
                NgayPhaiTra = DateTime.Now.AddDays(soNgayChoThueMoiDia)
            };
            db.DsChoThue.Add(model);
            db.SaveChanges();
            return Ok();
        }
        //tra dia
        [Route("api/muondia/{maDia}")]
        public IHttpActionResult PutThueDia(int maDia)
        {
            if (maDia < 0) return NotFound();
            var model = db.DsChoThue.Where(x => x.MaDia == maDia).OrderByDescending(x=>x.NgayThue).FirstOrDefault();
            model.NgayThucTra = DateTime.Now;
            phiTreController.ThemPhiTre(model);
            db.Entry(model).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            datHangController.ChuyenTinhTrangDiaDangGiu(model.MaDia);//nếu đĩa đang được đặt hàng => thay đổi trạng thái đĩa
            return Ok();
        }

    }
}
