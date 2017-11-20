using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class PhiTreAPIController : ApiController
    {
        VideoRentalDb db;
        decimal giaPhiTre = 10000;
        public PhiTreAPIController()
        {
            db = new VideoRentalDb();
        }
        //get danh sach phi tre
        [Route("api/phitre")]
        public IHttpActionResult GetAll()
        {
            var lst = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.DaThanhToanPhiTre == false).OrderByDescending(x=>x.NgayThue).ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Json(lst);
        }
        //get danh sach phi tre theo ma kh
        [Route("api/phitre/{maKh}")]
        public IHttpActionResult GetOne(int maKh)
        {
            if (maKh < 0 ) return NotFound();
            var lst = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.DaThanhToanPhiTre == false 
                                                    && x.MaKhachHang == maKh).OrderByDescending(x => x.NgayThue).ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }

        public void ThemPhiTre(DsChoThue model)
        {
            if(model.NgayPhaiTra < model.NgayThucTra)
            {
                model.PhiTre = giaPhiTre;
                model.DaThanhToanPhiTre = false;
            }
        }

        [Route("api/phitre/{limit}/{offset}")]
        public IHttpActionResult GetPhitres(int limit, int offset)
        {
            var result = db.DsChoThue.Where(x => x.NgayPhaiTra.CompareTo(x.NgayThucTra) < 0 ? true: false).OrderByDescending(x=>x.NgayThue)
                                .Skip(offset).Take(limit).ToList();
            if (result.Count == 0)
            {
                return NotFound();
            }
            return Json(result);
        }

        [Route("api/phitre/count")]
        public IHttpActionResult GetCount()
        {
            var result = db.DsChoThue.Where(x => x.NgayPhaiTra.CompareTo(x.NgayThucTra) < 0 ? true : false).ToList().Count;
            return Json(result);
        }

        [Route("api/phitre/{maKh}/{limit}/{offset}")]
        public IHttpActionResult GetPhitresByMaKH(int maKh,int limit, int offset)
        {
            string err = null;
            var model = db.KhachHangs.Find(maKh);
            if(model == null)
            {
                err = "Không tìm thấy khách hàng cần tìm";
                return Json(err);
            }
            var result = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.MaKhachHang == maKh && x.DaThanhToanPhiTre == false).OrderByDescending(x => x.NgayThue)
                                .Skip(offset).Take(limit).ToList();
            if (result.Count == 0)
            {
                return NotFound();
            }
            return Json(result);
        }

        [Route("api/phitre/{maKhachHang}/count")]
        public IHttpActionResult GetCountByMaKh(int maKhachHang)
        {
            string err = null;
            var model = db.KhachHangs.Find(maKhachHang);
            if (model == null)
            {
                err = "Không tìm thấy khách hàng cần tìm";
                return Json(err);
            }
            var result = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.MaKhachHang == maKhachHang && x.DaThanhToanPhiTre == false).Count();
            return Json(result);
        }

        [Route("api/phitre/thanhtoan")]
        public IHttpActionResult PostThanhToan(DsChoThue entity)
        {
            string err = null;
            if (entity == null)
            {
                err = "Không tìm thấy dữ liệu";
                return Json(err);
            }
            var model = db.DsChoThue.Where(x => x.MaKhachHang == entity.MaKhachHang && x.MaDia == x.MaDia 
                                    && x.NgayThue.CompareTo(entity.NgayThue) == 0).FirstOrDefault();
            model.DaThanhToanPhiTre = true;
            db.Entry(model).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }


        [Route("api/phitre/huy")]
        public IHttpActionResult PostHuy(DsChoThue entity)
        {
            string err = null;
            if (entity == null)
            {
                err = "Không tìm thấy dữ liệu";
                return Json(err);
            }
            var model = db.DsChoThue.Where(x => x.MaKhachHang == entity.MaKhachHang && x.MaDia == x.MaDia
                                    && x.NgayThue == entity.NgayThue).FirstOrDefault();
            if(model != null)
            {
                db.DsChoThue.Remove(model);
                db.SaveChanges();
            }
            else
            {
                err = "Không xóa được";
                return Json(err);
            }
            return Ok();
        }
    }
}
